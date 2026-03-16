import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * 활성화된 세션을 종료하고 로그아웃 처리하는 엔드포인트입니다.
 */
export const POST = async () => {
  const supabase = await createClient();

  // 현재 사용자 로그아웃 처리
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
  }

  // 로그아웃 후 메인 페이지로 이동
  return redirect("/");
};
