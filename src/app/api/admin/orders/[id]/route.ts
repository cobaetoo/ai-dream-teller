import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // URL에서 id 파라미터를 가져온다. (Next.js 15 이상 버전 대응 위해 비동기로 호출 권장되지만, 여기선 동기적 접근)
    // 참고사항: Next 15부터는 Route handler의 params는 Promise로 래핑될수도 있음. 여긴 프로젝트환경이 Next 16 이므로 `await params` 사용
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Order ID" }, { status: 400 });
    }

    const supabase = createServiceRoleClient();

    // 주문 및 연결된 사용자, 드림 결과 데이터 단건 조회
    const { data: order, error } = await supabase
      .from("orders")
      .select(
        `*,
        users ( nickname, email, phone_number, role, provider ),
        dream_results ( id, analysis_text, image_url, analysis_status, is_public )`
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: "Order not found or database error" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.error("Admin Order Detail Fetch Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
