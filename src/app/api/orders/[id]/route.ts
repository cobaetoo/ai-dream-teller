import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    // RLS 우회를 통해 먼저 주문 확인
    const serviceSupabase = createServiceRoleClient();

    // ID가 UUID 형식이면 id로, 아니면 order_number로 검색 시도
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    const query = serviceSupabase.from("orders").select("*");
    
    if (isUuid) {
      query.eq("id", id);
    } else {
      query.eq("order_number", id);
    }

    const { data: order, error: fetchError } = await query.single();

    if (fetchError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // pending 상태라면 바로 리턴 (토스페이먼츠 결제창에 금액/물품 정보를 넘겨주기 위함)
    if (order.payment_status === "pending") {
      return NextResponse.json({ order }, { status: 200 });
    }

    // pending이 아니면(paid 등) 본인 인증 검사
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 비회원일 경우 guest_session 쿠키가 있는지 확인
    const cookieStore = await cookies();
    const guestSession = cookieStore.get("guest_session")?.value;

    const authorizedUserId = user?.id || guestSession;

    // 인증된 ID가 없거나, 주문의 user_id와 일치하지 않으면 401
    if (!authorizedUserId || order.user_id !== authorizedUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
