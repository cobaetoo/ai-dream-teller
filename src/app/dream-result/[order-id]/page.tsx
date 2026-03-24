import { DreamResultClient } from "@/components/features/dream-result/dream-result-client";
import { Metadata } from "next";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// SEO Metadata dynamically generated based on dream content
export async function generateMetadata({ params }: DreamResultPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const orderId = resolvedParams["order-id"];
  const serviceClient = createServiceRoleClient();

  // Fetch only necessary columns for metadata
  const { data: orderData } = await serviceClient
    .from("orders")
    .select("dream_content, expert_field, dream_results(image_url)")
    .eq("id", orderId)
    .single();

  if (!orderData) {
    return { title: "결과를 찾을 수 없음 | AI Dream Teller" };
  }

  const dreamSnippet = orderData.dream_content.length > 30 
    ? orderData.dream_content.substring(0, 30) + "..." 
    : orderData.dream_content;
  
  const expertMap: Record<string, string> = {
    freud: "프로이트",
    jung: "칼 융",
    neuroscience: "신경과학",
    gestalt: "게슈탈트"
  };
  const expertName = expertMap[orderData.expert_field] || "AI";
  const imageUrl = Array.isArray(orderData.dream_results) 
    ? orderData.dream_results[0]?.image_url 
    : (orderData.dream_results as any)?.image_url;

  return {
    title: `[${expertName} 분석] ${dreamSnippet} | AI Dream Teller`,
    description: `'${dreamSnippet}' 꿈의 심층 해석 리포트입니다.`,
    openGraph: {
      title: `${expertName}의 관점으로 분석한 당신의 무의식`,
      description: orderData.dream_content.substring(0, 100),
      images: imageUrl ? [imageUrl] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${expertName}의 꿈 해몽 결과`,
      description: dreamSnippet,
      images: imageUrl ? [imageUrl] : [],
    }
  };
}

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
    .select(`
      id, user_id, dream_content, expert_field, created_at, payment_status,
      dream_results ( id, analysis_text, image_url, is_public, created_at, analysis_status )
    `)
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
    <div className="w-full">
      <DreamResultClient 
        orderId={orderId} 
        initialData={resultData}
        isOwner={isOwner}
        pastDates={pastDates}
        isMember={isMember}
      />
    </div>
  );
};

export default DreamResultPage;
