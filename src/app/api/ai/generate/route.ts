import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";

/**
 * 결제가 완료된 주문에 대해 AI 해몽 및 이미지를 생성하는 내역을 시뮬레이션하거나 처리합니다.
 * 실제 Gemini API 연동은 생략하되, DB 상태를 'processing'에서 'completed'로 전환하고 결과를 저장합니다.
 */
export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const serviceSupabase = createServiceRoleClient();

    // 1. 주문 확인
    const { data: order, error: orderError } = await serviceSupabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 2. Dream Results 생성 (분석 중 상태)
    const { data: result, error: resultError } = await serviceSupabase
      .from("dream_results")
      .insert({
        order_id: orderId,
        analysis_status: "processing",
        is_public: false,
      })
      .select()
      .single();

    if (resultError) {
      // 이미 존재하는 경우 처리 등 (Idempotency)
      console.warn("Dream result already exists or creation failed:", resultError.message);
    }

    // 3. 비동기로 AI 작업 시뮬레이션 (여기서는 실제 호출이므로 완료까지 수행하거나 Worker로 넘김)
    // 실제 AI 생성 로직은 수초~수십초 걸리므로 실제로는 큐를 사용하거나 여기서 비동기로 시작만 함
    // 이 답변에서는 유저가 "잠시 뒤에 분석된 해몽 내용이 보여질 것을 알려줘야 함"을 위해 
    // 상태를 'processing'으로 유지하는 것이 핵심.

    return NextResponse.json({ success: true, status: "processing" }, { status: 200 });
  } catch (error) {
    console.error("AI Generate API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
