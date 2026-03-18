import { Metadata } from "next";
import { GuestCheckClient } from "@/components/features/guest/guest-check-client";
import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "비회원 주문 내역 | AI Dream Teller",
  description: "비회원 주문 내역을 조회하고 꿈 해석 결과를 확인하세요.",
};

const GuestCheckPage = async () => {
  const cookieStore = await cookies();
  const guestSession = cookieStore.get("guest_session")?.value;

  if (!guestSession) {
    redirect("/guest-login");
  }

  const supabase = createServiceRoleClient();

  // 게스트 사용자 정보 조회
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("phone_number")
    .eq("id", guestSession)
    .single();

  if (userError || !user) {
    redirect("/guest-login");
  }

  // 주문 내역 조회
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, order_number, created_at, dream_content, total_amount, dream_results:dream_results_order_id_fkey(id, analysis_status, analysis_text, image_url)")
    .eq("user_id", guestSession)
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false });

  if (ordersError) {
    console.error("Failed to fetch guest orders:", ordersError);
  }

  return <GuestCheckClient phoneNumber={user.phone_number} orders={orders || []} />;
};

export default GuestCheckPage;
