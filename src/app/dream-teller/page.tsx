import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 꿈 해몽 시작하기',
  description: '전문 분야를 선택하고 꿈 해몽을 받아보세요.',
};

const DreamTellerPage = () => {
  // TODO: 프로덕트 상세 (분야 선택, 꿈 입력, 구매 옵션) UI 구현
  // FIX: [API 연동] POST /api/orders 연동
  
  return (
    <main className="min-h-screen">
      <h1>프로덕트 상세 페이지</h1>
    </main>
  );
};

export default DreamTellerPage;
