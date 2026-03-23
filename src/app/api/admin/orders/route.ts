import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const search = searchParams.get("search") || "";

    const supabase = createServiceRoleClient();

    // Query builder
    let query = supabase
      .from("orders")
      .select(
        `*,
        users ( nickname, role ),
        dream_results ( analysis_status )`,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // 검색어 필터: order_number 나 users 테이블의 닉네임 검색이 필요하나,
    // Supabase의 외래키 연관 테이블에서의 텍스트 검색(ilike)은 직접적인 inner 조인 쿼리문으로만 가능합니다.
    // 일단 order_number 기반 검색만 지원하도록 작성하고, 
    // nickname은 클라이언트나 별도의 RPC를 이용해 처리할 수 있음.
    if (search) {
      query = query.ilike("order_number", `%${search}%`);
    }

    const { data: orders, count, error } = await query;

    if (error) {
      console.error(error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: orders,
      count: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Admin Orders Data Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to load orders data", details: error },
      { status: 500 }
    );
  }
}
