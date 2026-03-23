import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

/**
 * 소셜 로그인(Google, Kakao) 인증을 시작하는 엔드포인트입니다.
 * Supabase Auth를 통해 제공업체의 승인 페이지로 리다이렉트합니다.
 */
export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const provider = formData.get("provider") as string;
  
  // 배포 환경과 로컬 환경을 모두 지원하기 위해 동적으로 호스트 감지
  // Vercel 환경에서는 x-forwarded-host나 host 헤더가 실제 도메인을 포함합니다.
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  
  // 만약 환경변수 NEXT_PUBLIC_SITE_URL이 설정되어 있고 localhost가 아니라면 사용, 
  // 그렇지 않으면 현재 요청의 origin을 사용합니다.
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = (envUrl && !envUrl.includes("localhost")) 
    ? envUrl 
    : `${protocol}://${host}`;

  console.log(`[Auth Login] Detected Site URL: ${siteUrl}`);

  // PRD 8.2.1: 지원하지 않는 provider 혹은 빈 값인 경우 400 반환
  if (!provider || (provider !== "google" && provider !== "kakao")) {
    return NextResponse.json({ error: "Unsupported or missing provider" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as "google" | "kakao",
    options: {
      // 인증 성공 후 돌아올 콜백 URL
      redirectTo: `${siteUrl}/api/auth/callback`,
    },
  });

  if (error) {
    console.error("Login attempt failed:", error.message);
    return redirect("/auth?error=login_failed");
  }

  if (data.url) {
    // 제공업체의 인증 페이지로 리다이렉트
    return redirect(data.url);
  }

  return redirect("/auth?error=no_url");
};
