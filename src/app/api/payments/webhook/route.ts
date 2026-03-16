import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";

/**
 * 토스페이먼츠 웹훅 수신 핸들러
 * 외부 서버에서 호출하므로 사용자 세션이 없음 → Service Role 클라이언트 사용 (RLS 우회)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 토스페이먼츠 V1 웹훅 구조: { "createdAt": "...", "secret": "...", "data": { ... } }
    const payload = body.data || body;

    const { paymentKey, orderId, status } = payload;
    const incomingSecret = body.secret;

    // 웹훅 시크릿 검증 (설정된 경우에만)
    const expectedSecret = process.env.TOSS_WEBHOOK_SECRET;
    if (expectedSecret && incomingSecret !== expectedSecret) {
      console.error("Webhook secret mismatch");
      return NextResponse.json(
        { error: "Unauthorized webhook request" },
        { status: 401 }
      );
    }

    if (!paymentKey || !orderId || !status) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    // RLS를 우회하기 위해 Service Role 클라이언트 사용
    const supabase = createServiceRoleClient();

    // 토스 상태 → 내부 DB 상태 매핑
    const statusMap: Record<string, string> = {
      DONE: "paid",
      CANCELED: "canceled",
      PARTIAL_CANCELED: "canceled",
      ABORTED: "failed",
      FAILED: "failed",
      WAITING_FOR_DEPOSIT: "pending", // 가상계좌 입금 대기는 pending으로 유지
    };

    const paymentStatus = statusMap[status] || "pending";

    // DB 주문 상태 업데이트
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: paymentStatus,
        payment_key: paymentKey,
        updated_at: new Date().toISOString(),
      })
      .eq("order_number", orderId);

    if (updateError) {
      console.error("Webhook DB update failed:", updateError);
      return NextResponse.json(
        { error: "Failed to sync order status" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Webhook processed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Toss Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
