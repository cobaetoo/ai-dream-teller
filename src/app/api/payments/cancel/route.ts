import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // 회원 권한 확인 (사용자 본인이나 관리자만 취소를 요청하도록)
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId, cancelReason } = await req.json();

    if (!orderId || !cancelReason) {
      return NextResponse.json(
        { error: "Order ID and Cancel Reason are required" },
        { status: 400 }
      );
    }

    // 1. 주문서 찾기
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, user_id, payment_key, payment_status")
      .eq("order_number", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    if (order.payment_status !== "paid" || !order.payment_key) {
      return NextResponse.json(
        { error: "Only paid orders can be canceled" },
        { status: 400 }
      );
    }

    // 2. 토스페이먼츠 취소 API 연동
    const tossSecretKey = process.env.TOSS_SECRET_KEY;
    if (!tossSecretKey) {
      return NextResponse.json({ error: "System configured without TOSS_SECRET_KEY" }, { status: 500 });
    }

    const credential = Buffer.from(tossSecretKey + ":").toString("base64");

    const tossRes = await fetch(
      `https://api.tosspayments.com/v1/payments/${order.payment_key}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credential}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cancelReason,
        }),
      }
    );

    const tossData = await tossRes.json();

    if (!tossRes.ok) {
      console.error("Toss cancellation failed:", tossData);
      return NextResponse.json(
        { error: tossData.message, code: tossData.code },
        { status: 400 }
      );
    }

    // 3. DB 상태 취소 처리 업데이트
    await supabase
      .from("orders")
      .update({
        payment_status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    return NextResponse.json(
      { success: true, message: "Payment canceled successfully", data: tossData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment Cancel API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
