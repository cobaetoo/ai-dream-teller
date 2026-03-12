import { DreamResultClient } from "@/components/features/dream-result/dream-result-client";
import { Metadata } from "next";

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

  return <DreamResultClient orderId={orderId} />;
};

export default DreamResultPage;
