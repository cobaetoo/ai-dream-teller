import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { feedQuerySchema } from "@/lib/validations/feed";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // 1. Zod를 통한 쿼리 파라미터 검증 (PRD 8.2 No 10 준수)
    const validation = feedQuerySchema.safeParse(queryParams);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "올바르지 않은 쿼리 파라미터입니다.", 
          details: validation.error.issues.map(i => i.message).join(", ") 
        },
        { status: 400 }
      );
    }

    const { limit, page } = validation.data;

    // 2. Supabase 데이터 조회 (공개된 해몽 결과만)
    const supabase = createServiceRoleClient();
    const from = page * limit;
    const to = from + limit - 1;

    const { data: feeds, error, count } = await supabase
      .from('dream_results')
      .select('id, analysis_text, image_url, created_at, orders!inner(dream_content, expert_field, created_at)', { count: 'exact' })
      .eq('is_public', true)
      .eq('analysis_status', 'completed')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Fetch feeds error:", error);
      return NextResponse.json({ error: "Failed to fetch feeds" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: feeds,
      pagination: {
        page,
        limit,
        total: count,
        hasMore: count !== null ? (from + (feeds?.length || 0)) < count : false
      }
    });

  } catch (err: any) {
    console.error("Feeds API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
