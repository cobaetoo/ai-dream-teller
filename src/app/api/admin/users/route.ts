import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "all"; // all, member, guest

    const supabase = createServiceRoleClient();

    let query = supabase
      .from("users")
      .select("*, orders(id, payment_status)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (filter === "member") {
      // member 역할만 필터링 (가입 경로가 google, kakao 등)
      // PRD 기준 role이 'member' 일 수 있음
      query = query.eq("role", "member");
    } else if (filter === "guest") {
      query = query.eq("role", "guest");
    }

    if (search) {
      // 닉네임, 이메일, 전화번호 부분 일치
      query = query.or(`nickname.ilike.%${search}%,email.ilike.%${search}%,phone_number.ilike.%${search}%`);
    }

    const { data: users, count, error } = await query;

    if (error) {
      console.error(error);
      throw error;
    }

    // 통계를 위해 가공 (누적 주문 건수 등)
    const formattedUsers = users?.map((user) => {
      // payment_status === 'paid' 여부로 결제 완료 건을 찾을 수 있으나 
      // 간단히 조회된 모든 order 수로 표기 (또는 paid 기준)
      const paidOrdersCount = user.orders?.filter((o: any) => o.payment_status === "paid").length || 0;
      return {
        ...user,
        total_orders: user.orders?.length || 0,
        paid_orders: paidOrdersCount,
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedUsers,
      count: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Admin Users Data Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to load users data", details: error },
      { status: 500 }
    );
  }
}
