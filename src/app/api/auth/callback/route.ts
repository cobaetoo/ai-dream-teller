import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * 소셜 로그인 완료 후 인증 코드를 받아 세션을 확정하는 콜백 엔드포인트입니다.
 */
export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // 로그인 성공 후 최종 이동할 페이지 (PRD: /dream-teller)
  const next = searchParams.get("next") ?? "/dream-teller";

  if (code) {
    const supabase = await createClient();
    
    // 인증 코드를 세션으로 교환
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // 세션 교환 성공 시 지정된 페이지로 리다이렉트
      return NextResponse.redirect(`${origin}${next}`);
    }
    
    console.error("Auth callback error:", error.message);
  }

  // 실패 시 로그인 페이지로 에러와 함께 리다이렉트
  return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`);
};
