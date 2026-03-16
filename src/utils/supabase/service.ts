import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * RLS를 우회하는 Service Role 클라이언트
 * 웹훅, 서버 간 통신 등 사용자 세션이 없는 컨텍스트에서 사용
 * 주의: 절대 클라이언트 측에 노출되어서는 안 됨
 */
export const createServiceRoleClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL environment variable"
    );
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
