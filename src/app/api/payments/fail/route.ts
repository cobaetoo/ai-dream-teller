import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { sendTelegramMessage } from "@/utils/telegram";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // 회원 권한 확인 (비회원인 경우도 처리할 수 있게끔 세션 체크는 유연히 하되 여기서는 기본 검증)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { orderId, message, code } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // 주문 조회
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, user_id, payment_status")
      .eq("order_number", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Invalid Order ID" },
        { status: 404 }
      );
    }

    // 권한 검증: 본인의 결제가 실패한 건지
    if (user && order.user_id !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized access to order" },
        { status: 403 }
      );
    }

    // 이미 paid 혹은 다른 상태면 실패 처리를 할 수 없음
    if (order.payment_status === "paid" || order.payment_status === "canceled") {
      return NextResponse.json(
        {
          message: "Order has already been processed and cannot be marked as failed.",
        },
        { status: 400 }
      );
    }

    // 결제 실패 상태 로깅 및 업데이트
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: "failed",
        error_message: `[${code || "UNKNOWN"}] ${message || "User aborted or payment failed"}`,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    if (updateError) {
      console.error("Failed to mark order as failed:", updateError);
      return NextResponse.json(
        { error: "Failed to update db" },
        { status: 500 }
      );
    }

    // 텔레그램 결제창 이탈/실패 알림
    const failMsg = `🚨 <b>결제창 진행 실패</b>\n\n- 주문번호: ${orderId}\n- 유저아이디: ${order.user_id || '비회원'}\n- 에러 코드: ${code || "UNKNOWN"}\n- 실패 사유: ${message || "User aborted or payment failed"}`;
    await sendTelegramMessage(failMsg);

    return NextResponse.json(
      { success: true, message: "Order marked as failed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment Fail API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
