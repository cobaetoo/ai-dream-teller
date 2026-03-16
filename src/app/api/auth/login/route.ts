import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

/**
 * 소셜 로그인(Google, Kakao) 인증을 시작하는 엔드포인트입니다.
 * Supabase Auth를 통해 제공업체의 승인 페이지로 리다이렉트합니다.
 */
export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const provider = formData.get("provider") as string;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // PRD 8.2.1: 지원하지 않는 provider 혹은 빈 값인 경우 400 반환
  if (!provider || (provider !== "google" && provider !== "kakao")) {
    return new Response(JSON.stringify({ error: "Unsupported or missing provider" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
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
