import { createBrowserClient } from "@supabase/ssr";

/**
 * 브라우저(클라이언트)에서 사용할 Supabase 클라이언트를 생성합니다.
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
