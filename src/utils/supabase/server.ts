import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버 사이드에서 사용할 Supabase 클라이언트를 생성합니다.
 * 쿠키를 통해 세션을 관리하며, Server Actions와 API Routes에서 사용됩니다.
 */
export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
