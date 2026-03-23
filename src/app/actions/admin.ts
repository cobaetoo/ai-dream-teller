'use server';

import { createServiceRoleClient } from "@/utils/supabase/service";
import { createClient as createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * 어드민 권한 확인용 헬퍼
 */
async function checkAdminAuth() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized: Login required" };

  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!userData || userData.role !== "admin") {
    return { success: false, error: "Forbidden: Admin access only" };
  }

  return { success: true, userId: user.id };
}

/**
 * 주문 상세 정보 조회 (어드민용)
 */
export async function getAdminOrderDetail(orderId: string) {
  try {
    const auth = await checkAdminAuth();
    if (!auth.success) return auth;

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        users ( nickname, email, phone_number, role, provider ),
        dream_results ( analysis_text, image_url, analysis_status, created_at )
      `)
      .eq("id", orderId)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Order not found");

    return { success: true, data };
  } catch (error: any) {
    console.error("Admin Action Error [getAdminOrderDetail]:", error);
    return { success: false, error: error.message || "Failed to fetch order detail via Action" };
  }
}

/**
 * 주문 리스트 조회 (어드민용)
 */
export async function getAdminOrders(search = '', limit = 10, offset = 0) {
  try {
    const auth = await checkAdminAuth();
    if (!auth.success) return auth;

    const supabase = createServiceRoleClient();
    let query = supabase
      .from("orders")
      .select(`
        *,
        users ( nickname, role ),
        dream_results ( analysis_status )
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.ilike("order_number", `%${search}%`);
    }

    const { data, count, error } = await query;
    if (error) throw error;
    
    return { success: true, data, count: count || 0 };
  } catch (error: any) {
    console.error("Admin Action Error [getAdminOrders]:", error);
    return { success: false, error: error.message || "Failed to fetch orders via Action" };
  }
}

/**
 * 유저 리스트 조회 (어드민용)
 */
export async function getAdminUsers(search = '', roleFilter = 'all', limit = 10, offset = 0) {
  try {
    const auth = await checkAdminAuth();
    if (!auth.success) return auth;

    const supabase = createServiceRoleClient();
    let query = supabase
      .from("users")
      .select("*, orders(id, payment_status)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (roleFilter === "member") {
      query = query.eq("role", "member");
    } else if (roleFilter === "guest") {
      query = query.eq("role", "guest");
    }

    if (search) {
      query = query.or(`nickname.ilike.%${search}%,email.ilike.%${search}%,phone_number.ilike.%${search}%`);
    }

    const { data: users, count, error } = await query;
    if (error) throw error;

    const formattedUsers = users?.map((user) => {
      const paidOrdersCount = user.orders?.filter((o: any) => o.payment_status === "paid").length || 0;
      return {
        ...user,
        total_orders: user.orders?.length || 0,
        paid_orders: paidOrdersCount,
      };
    });

    return { success: true, data: formattedUsers, count: count || 0 };
  } catch (error: any) {
    console.error("Admin Action Error [getAdminUsers]:", error);
    return { success: false, error: error.message || "Failed to fetch users via Action" };
  }
}

/**
 * AI 해몽 결과 재생성 트리거 (Server Action)
 */
export async function regenerateAdminOrderResult(orderId: string, origin: string) {
  try {
    const auth = await checkAdminAuth();
    if (!auth.success) return auth;

    const supabase = createServiceRoleClient();

    // 1. 주문 확인
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return { success: false, error: "Order not found" };
    }

    // 2. 기존 dream_results 초기화 (processing 상태로 변경)
    const { error: updateError } = await supabase
      .from("dream_results")
      .update({
        analysis_status: "processing", 
        analysis_text: null,
      })
      .eq("order_id", orderId);
    
    if (updateError) throw updateError;

    // 3. 내부 AI Generation API 호출 
    const aiApiUrl = new URL("/api/ai/generate", origin);

    const aiRes = await fetch(aiApiUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      throw new Error(`AI API Call failed: ${errText}`);
    }

    revalidatePath(`/admin/order-list/${orderId}`);
    return { success: true, message: "AI Regeneration completed successfully." };

  } catch (error: any) {
    console.error("Admin Order Regenerate Action Error:", error);
    return { success: false, error: error.message || "Failed to regenerate AI result" };
  }
}
