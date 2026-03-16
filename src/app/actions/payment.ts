"use server";

import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/service";

export async function confirmPaymentAction({
  paymentKey,
  orderId,
  amount,
}: {
  paymentKey: string;
  orderId: string;
  amount: number;
}) {
  try {
    const supabase = await createClient();
    const serviceSupabase = createServiceRoleClient();
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 1. Supabase에서 주문서 조회 (RLS 우회를 위해 serviceSupabase 사용 가능 혹은 session 사용)
    // 비회원 주문도 조회해야 하므로 serviceSupabase 사용 권장
    const { data: order, error: orderError } = await serviceSupabase
      .from("orders")
      .select("*")
      .eq("order_number", orderId)
      .single();

    if (orderError || !order) {
      return { success: false, error: "주문을 찾을 수 없거나 권한이 없습니다.", status: 404 };
    }

    let isGuestOrder = false;
    
    // 권한 확인: 
    // - 회원 주문인 경우: 로그인한 유저와 주문의 user_id가 일치해야 함
    // - 비회원 주문인 경우: 별도의 세션 체크가 어렵지만 결제 성공 key가 있으므로 진행 (추후 고도화 가능)
    if (order.user_id) {
       // 주문 소유자의 role 확인
       const { data: orderOwner } = await serviceSupabase
         .from("users")
         .select("role")
         .eq("id", order.user_id)
         .single();
       
       if (orderOwner?.role === 'guest') {
         isGuestOrder = true;
       }

       if (orderOwner?.role === 'member' && (!user || user.id !== order.user_id)) {
         return { success: false, error: "Unauthorized", status: 401 };
       }
    }

    if (order.payment_status === "paid") {
      return { success: false, error: "Order is already paid", status: 400 };
    }

    if (order.total_amount !== amount) {
      return { success: false, error: "Amount mismatch detected. Possible tampering.", status: 400 };
    }

    // 2. 토스페이먼츠 연동 API 시크릿 키
    const tossSecretKey = process.env.TOSS_SECRET_KEY;
    if (!tossSecretKey) {
      console.error("Missing Toss Payments Secret Key Configuration");
      return { success: false, error: "Internal Server Configuration Error", status: 500 };
    }

    const credential = Buffer.from(tossSecretKey + ":").toString("base64");

    // 3. 토스페이먼츠 결제 승인 API 호출
    const tossRes = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credential}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      }
    );

    const tossData = await tossRes.json();

    if (!tossRes.ok) {
      console.error("Toss Payments Approval Failed:", tossData);
      
      await serviceSupabase
        .from("orders")
        .update({ payment_status: "failed", error_message: tossData.message })
        .eq("id", order.id);

      return { 
        success: false, 
        error: tossData.message || "Payment approval failed", 
        code: tossData.code,
        status: 400 
      };
    }

    // 4. 결제 성공 -> DB 주문서 상태 'paid'로 변경
    const { error: updateError } = await serviceSupabase
      .from("orders")
      .update({
        payment_status: "paid",
        payment_key: paymentKey,
        approved_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    if (updateError) {
      console.error("Failed to update order status post-payment:", updateError);
      return { success: false, error: "Database sync failed after successful payment", status: 500 };
    }

    // 5. [비동기] AI 해몽 로직 호출 (생성 요청만 던짐)
    // 실제 운영 환경에서는 Vercel Function (Trigger) 혹은 외부 큐 연동 권장
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    
    // 이 호출은 AI 분석을 시작하라는 신호만 보냅니다. (Fire & Forget 가능하도록)
    fetch(`${baseUrl}/api/ai/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id }),
    }).catch(err => console.error("AI Generation trigger failed:", err));

    return { 
      success: true, 
      data: tossData,
      isGuest: isGuestOrder
    };
  } catch (error) {
    console.error("Payment Confirmation Critical Error:", error);
    return { success: false, error: "Internal Server Error", status: 500 };
  }
}
