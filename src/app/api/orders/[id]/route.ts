import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // 회원 전용 권한 확인
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ID가 UUID 형식이면 id로, 아니면 order_number로 검색 시도
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    const query = supabase.from("orders").select("*");
    
    if (isUuid) {
      query.eq("id", id);
    } else {
      query.eq("order_number", id);
    }

    const { data: order, error: fetchError } = await query
      .eq("user_id", user.id) // 본인 권한 검증 필수
      .single();

    if (fetchError || !order) {
      return NextResponse.json(
        { error: "Order not found or no access permission." },
        { status: 404 }
      );
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Order Detail GET API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

