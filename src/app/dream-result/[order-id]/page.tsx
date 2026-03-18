import { DreamResultClient } from "@/components/features/dream-result/dream-result-client";
import { Metadata } from "next";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "꿈 해몽 결과 | AI Dream Teller",
  description: "당신의 꿈에 대한 심층적인 AI 해몽 결과입니다.",
};

interface DreamResultPageProps {
  params: Promise<{
    "order-id": string;
  }>;
}

const DreamResultPage = async ({ params }: DreamResultPageProps) => {
  const resolvedParams = await params;
  const orderId = resolvedParams["order-id"];

  const supabase = await createClient();
  const serviceClient = createServiceRoleClient();
  const cookieStore = await cookies();

  // 1. Get Authentication
  const { data: { user } } = await supabase.auth.getUser();
  const isMember = !!user;
  const guestSession = cookieStore.get("guest_session")?.value;

  const currentUserId = user?.id || guestSession;

  // 2. Fetch Order Data Bypassing RLS
  const { data: orderData, error: orderError } = await serviceClient
    .from("orders")
    .select("*, dream_results(*)")
    .eq("id", orderId)
    .single();

  if (orderError || !orderData) {
    // Or we could pass a 404 state to the client
    return <DreamResultClient orderId={orderId} initialData={null} isOwner={false} pastDates={[]} isMember={isMember} />;
  }

  // 3. Process Result
  const res = Array.isArray(orderData.dream_results)
    ? orderData.dream_results[0]
    : orderData.dream_results;

  const isOwner = currentUserId === orderData.user_id;
  const isPublic = res?.is_public || false;

  // 4. Check Access Rights
  if (!isOwner && !isPublic) {
    // If not public and not the owner, they cannot view this
    return <DreamResultClient orderId={orderId} initialData={null} isOwner={false} pastDates={[]} isMember={isMember} />;
  }

  let resultData = null;
  if (res) {
    resultData = {
      id: res.id,
      inputDream: orderData.dream_content,
      title: "꿈 해몽 결과",
      analysis: res.analysis_text,
      expertLabel: orderData.expert_field,
      date: new Date(res.created_at || orderData.created_at),
      imageUrl: res.image_url,
      isPublic: res.is_public,
    };
  }

  // 5. Fetch Past Dates for Calendar (Only for Members)
  let pastDates: Date[] = [];
  if (user && isOwner) {
    const { data: ordersData } = await serviceClient
      .from("orders")
      .select("created_at")
      .eq("user_id", user.id)
      .eq("payment_status", "paid");

    if (ordersData) {
      pastDates = ordersData.map((o) => new Date(o.created_at));
    }
  }

  return (
    <DreamResultClient 
      orderId={orderId} 
      initialData={resultData}
      isOwner={isOwner}
      pastDates={pastDates}
      isMember={isMember}
    />
  );
};

export default DreamResultPage;
