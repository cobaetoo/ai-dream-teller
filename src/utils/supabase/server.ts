import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버 사이드에서 사용할 Supabase 클라이언트를 생성합니다.
 * 쿠키를 통해 세션을 관리하며, Server Actions와 API Routes에서 사용됩니다.
 */
export const createClient = async () => {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
      console.warn("Supabase env variables are missing during build/SSR.");
    }
    // 빌드 타임 혹은 환경변수 누락 시 null 반환 처리는 라이브러리 구조상 어려우므로 
    // 최소한의 에러 메시지 방지를 위해 빈 문자열 혹은 더미값으로 처리하거나 호출부에서 제어해야 함.
    // 여기서는 라이브러리가 에러를 던지지 않도록 체크 후 실행함.
  }

  return createServerClient(
    supabaseUrl || "",
    supabaseAnonKey || "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서 호출될 경우 set이 실패할 수 있습니다.
            // 이 경우 미들웨어에서 처리를 위임합니다.
          }
        },
      },
    }
  );
};
