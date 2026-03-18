import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { guestSchema } from "@/lib/validations/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Zod를 통한 입력값 검증 (PRD 8.2 No 4 해결)
    const validation = guestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "올바르지 않은 입력값입니다.", 
          details: validation.error.issues.map((e: any) => e.message).join(", ") 
        },
        { status: 400 }
      );
    }

    const { phone_number, guest_password } = validation.data;
    const supabase = createServiceRoleClient();

    // 게스트 사용자 조회
    const { data: user, error } = await supabase
      .from("users")
      .select("id, guest_password_hash")
      .eq("phone_number", phone_number)
      .eq("role", "guest")
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: "해당 정보로 주문 내역을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 비밀번호 단순 비교 (실서비스는 암호화 권장)
    if (user.guest_password_hash !== guest_password) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // 비회원 전용 세션 쿠키 설정 (HttpOnly, Secure)
    const response = NextResponse.json(
      { success: true, userId: user.id },
      { status: 200 }
    );

    const cookieStore = await cookies();
    cookieStore.set("guest_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24시간 동안 유효
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Guest login API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
