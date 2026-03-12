import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 해석 결과',
  description: 'AI가 분석한 꿈 해몽 결과를 확인하세요.',
};

interface DreamResultPageProps {
  params: Promise<{ 'order-id': string }>;
}

const DreamResultPage = async ({ params }: DreamResultPageProps) => {
  const { 'order-id': orderId } = await params;
  
  // TODO: 해석 결과, AI 이미지, 원본 꿈 내용 UI 구현 및 소셜 공유 버튼 추가
  // FIX: [API 연동] GET /api/orders/[id] 연동 조회
  
  return (
    <main className="min-h-screen">
      <h1>해석 확인 페이지 - {orderId}</h1>
    </main>
  );
};

export default DreamResultPage;
