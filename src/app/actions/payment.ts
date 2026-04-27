"use server";

import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { sendTelegramMessage } from "@/utils/telegram";
import { maskUserId } from "@/utils/masking";

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

    // 1. Supabase에서 주문서 조회 (RLS 우회를 위해 serviceSupabase 사용)
    const { data: order, error: orderError } = await serviceSupabase
      .from("orders")
      .select("id, user_id, payment_status, total_amount, dream_content, expert_field, includes_image")
      .eq("order_number", orderId)
      .single();

    if (orderError || !order) {
      return { success: false, error: "주문을 찾을 수 없거나 권한이 없습니다.", status: 404 };
    }

    let isGuestOrder = false;
    let isAdmin = false;
    let userIdForNotice = order.user_id || "비회원";

    // 권한 확인:
    // - 회원 주문인 경우: 로그인한 유저와 주문의 user_id가 일치해야 함
    // - 비회원 주문인 경우: 별도의 세션 체크가 어렵지만 결제 성공 key가 있으므로 진행 (추후 고도화 가능)
    if (order.user_id) {
       // 주문 소유자의 role 확인
       const { data: orderOwner } = await serviceSupabase
         .from("users")
         .select("id, role")
         .eq("id", order.user_id)
         .single();

       if (orderOwner?.role === 'guest') {
         isGuestOrder = true;
         userIdForNotice = `비회원(${maskUserId(orderOwner.id)})`;
       }

       if (orderOwner?.role === 'admin') {
         isAdmin = true;
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

      // 텔레그램 결제 승인 실패 알림
      const failMsg = `🚨 <b>결제 승인 실패</b>\n\n- 주문번호: ${orderId}\n- 유저아이디: ${userIdForNotice}\n- 시도금액: ${amount.toLocaleString()}원\n- 실패 사유: ${tossData.message || "알 수 없음"}`;
      await sendTelegramMessage(failMsg);

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

    // 결제 성공 텔레그램 알림 발송
    const optionName = order.includes_image ? "텍스트 + AI 이미지" : "텍스트 전용";
    const shortDreamContent = order.dream_content.length > 20 ? order.dream_content.substring(0, 20) + "..." : order.dream_content;
    const successMsg = `🎉 <b>결제 성공 알림</b>\n\n- 상품옵션: ${optionName}\n- 유저아이디: ${userIdForNotice}\n- 결제금액: ${amount.toLocaleString()}원\n- 해몽 전문: ${order.expert_field}\n- 꿈내용 일부: <i>"${shortDreamContent}"</i>`;
    await sendTelegramMessage(successMsg);

    // 5. [강의용 데모] admin이 아닌 경우 AI 해몽 로직 호출 생략
    // admin인 경우 실제 AI 해석이 진행됩니다.

    return {
      success: true,
      data: tossData,
      isGuest: isGuestOrder,
      orderId: order.id,
      isAdmin,
    };
  } catch (error) {
    console.error("Payment Confirmation Critical Error:", error);
    return { success: false, error: "Internal Server Error", status: 500 };
  }
}
