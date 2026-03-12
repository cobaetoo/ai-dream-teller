import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 다른 사람들의 꿈',
  description: '다른 이들의 흥미로운 꿈 해몽을 둘러보세요.',
};

const FeedsPage = () => {
  // TODO: 이전 유저들의 해몽 결과 리스트 피드 UI 및 무한스크롤 페이징 구현
  // FIX: [API 연동] GET /api/feeds 연동
  
  return (
    <main className="min-h-screen">
      <h1>해몽 리스트 피드</h1>
    </main>
  );
};

export default FeedsPage;
