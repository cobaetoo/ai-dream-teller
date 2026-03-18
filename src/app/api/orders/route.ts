import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { guestSchema } from "@/lib/validations/auth";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const serviceSupabase = createServiceRoleClient(); // RLS 우회를 위해 사용
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await req.json();
    const { dream_content, expert_field, includes_image, total_amount, phone_number, guest_password } = body;

    // 파라미터 유효성 검증
    if (!dream_content || !expert_field || total_amount === undefined) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 금액 검증 로직을 DB 접근 전(초반)으로 이동 (PRD 6.3 - 금액 위변조 조기 차단)
    const baseAmount = 1500;
    const additionalAmount = includes_image ? 500 : 0;
    const calculatedAmount = baseAmount + additionalAmount;

    if (calculatedAmount !== total_amount) {
      return NextResponse.json(
        { error: "금액 정보가 일치하지 않습니다. (위조 가능성)" },
        { status: 400 }
      );
    }

    let targetUserId: string;

    if (user) {
      // 1. 회원 주문 처리
      targetUserId = user.id;
    } else {
      // 비회원 입력값 검증 (Zod 활용)
      const validation = guestSchema.safeParse({ phone_number, guest_password });
      
      if (!validation.success) {
        return NextResponse.json(
          { 
            error: "비회원 정보가 올바르지 않습니다.", 
            details: validation.error.issues.map(e => e.message).join(", ") 
          },
          { status: 400 }
        );
      }

      // 기존 게스트 사용자 확인
      const { data: existingGuest, error: guestError } = await serviceSupabase
        .from("users")
        .select("id, guest_password_hash")
        .eq("phone_number", phone_number)
        .eq("role", "guest")
        .single();

      if (existingGuest) {
        // 비밀번호 확인 (간단하게 문자열 비교, 실서비스에서는 해시 비교 권장)
        if (existingGuest.guest_password_hash !== guest_password) {
          return NextResponse.json(
            { error: "이미 등록된 연락처입니다. 비밀번호가 일치하지 않습니다." },
            { status: 403 }
          );
        }
        targetUserId = existingGuest.id;
      } else {
        // 신규 게스트 사용자 생성 (고유 UUID 직접 할당 방어 등은 스키마에 따라 유연하게)
        const { data: newGuest, error: createGuestError } = await serviceSupabase
          .from("users")
          .insert({
            id: crypto.randomUUID(),
            role: "guest",
            provider: "guest",
            phone_number: phone_number,
            guest_password_hash: guest_password,
            nickname: `손님_${phone_number.slice(-4)}`,
          })
          .select()
          .single();

        if (createGuestError || !newGuest) {
          console.error("Guest creation failed:", createGuestError);
          return NextResponse.json(
            { error: "비회원 정보 생성에 실패했습니다." },
            { status: 500 }
          );
        }
        targetUserId = newGuest.id;
      }
    }

    // 고유 주문 번호 생성
    const order_number = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase()}`;

    // 주문서 (Pending 상태) 생성
    // 비회원 주문의 경우 RLS를 우회하기 위해 serviceSupabase 사용
    const { data: order, error: insertError } = await serviceSupabase
      .from("orders")
      .insert({
        order_number,
        user_id: targetUserId,
        total_amount: calculatedAmount,
        payment_status: "pending",
        dream_content,
        expert_field,
        includes_image,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Order insertion failed:", insertError);
      return NextResponse.json(
        { error: "주문 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    // 생성된 주문 데이터를 클라이언트에 반환
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // 회원 전용 사용자 권한 확인
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 본인의 전체 주문 목록 조회, 최신순 정렬 (해몽 결과 상태 포함)
    console.log("Fetching orders for user:", user.id);
    const { data: orders, error: fetchError } = await supabase
      .from("orders")
      .select("*, dream_results:dream_results_order_id_fkey(analysis_status, id, image_url)")
      .eq("user_id", user.id)
      .eq("payment_status", "paid") // 결제 완료된 것만 보여줌
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Fetch orders DB full error:", JSON.stringify(fetchError, null, 2));
      return NextResponse.json(
        { 
          error: "Failed to fetch orders from database", 
          details: `Error: ${fetchError.message} (Code: ${fetchError.code}, Hint: ${fetchError.hint})` 
        },
        { status: 500 }
      );
    }

    console.log(`Fetched ${orders?.length || 0} paid orders for user ${user.id}`);
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Get Orders API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
