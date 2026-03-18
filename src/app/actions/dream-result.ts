"use server";

import { createClient } from "@/utils/supabase/server";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/**
 * 꿈 해몽 결과의 공개 여부를 토글하는 Server Action입니다.
 * @param resultId - dream_results 테이블의 ID
 * @param isPublic - 설정하고자 하는 공개 여부 값
 */
export async function toggleDreamPublicAction(resultId: string, isPublic: boolean) {
  try {
    const supabase = await createClient();
    const serviceClient = createServiceRoleClient();
    const cookieStore = await cookies();
    
    // 현재 세션 유저 정보 가져오기
    const { data: { user } } = await supabase.auth.getUser();
    const guestSession = cookieStore.get("guest_session")?.value;
    
    const userId = user?.id || guestSession;
    
    if (!userId) {
      return { success: false, error: "인증되지 않은 사용자입니다." };
    }

    // dream_results 소유자 검증
    const { data: resultData, error: fetchError } = await serviceClient
      .from("dream_results")
      .select("order_id, orders(user_id)")
      .eq("id", resultId)
      .single();

    if (fetchError || !resultData || !resultData.orders || Array.isArray(resultData.orders) || (resultData.orders as any).user_id !== userId) {
      return { success: false, error: "권한이 없거나 결과를 찾을 수 없습니다." };
    }

    // dream_results 업데이트 시도 (서비스 클라이언트 사용)
    const { data, error } = await serviceClient
      .from("dream_results")
      .update({ 
        is_public: isPublic,
        updated_at: new Date().toISOString()
      })
      .eq("id", resultId)
      .select()
      .single();

    if (error) {
      console.error("Toggle public action failed:", error);
      return { success: false, error: "공개 설정을 변경하는 중 오류가 발생했습니다." };
    }

    // 변경된 상태 반영을 위해 관련 경로 캐시 무효화
    revalidatePath("/my-page");
    revalidatePath("/feeds");
    revalidatePath(`/dream-result/[order-id]`, "page");

    return { success: true, isPublic: data.is_public };
  } catch (error) {
    console.error("Toggle dream public error:", error);
    return { success: false, error: "서버 오류가 발생했습니다." };
  }
}
