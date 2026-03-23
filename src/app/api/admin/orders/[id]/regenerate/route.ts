import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";

// AI 재생성은 시간이 조금 걸릴 수 있음
export const maxDuration = 60;

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Order ID" }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    // 1. 주문 확인
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    // 2. 기존 dream_results 초기화 (processing 상태로 변경하여 /api/ai/generate가 재생성하도록 허용)
    const { error: updateError } = await supabase
      .from("dream_results")
      .update({
        analysis_status: "processing", 
        analysis_text: null,
        // image_url: null, // 기존 이미지 유지할 수도 있으나 PRD상 전체 재생성
      })
      .eq("order_id", id);
    
    if (updateError) {
      throw updateError;
    }

    // 3. 내부 AI Generation API 호출 
    // Vercel 등 배포된 환경과 로컬 환경을 모두 지원하기 위해 nextUrl origin 활용
    const aiApiUrl = new URL("/api/ai/generate", req.nextUrl.origin);

    const aiRes = await fetch(aiApiUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: id }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      throw new Error(`AI API Call failed: ${errText}`);
    }

    return NextResponse.json({
      success: true,
      message: "AI Regeneration completed successfully.",
    });

  } catch (error: any) {
    console.error("Admin Order Regenerate Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to regenerate AI result" },
      { status: 500 }
    );
  }
}
