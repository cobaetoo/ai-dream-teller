import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 메인',
  description: 'AI가 분석하는 당신의 꿈, AI Dream Teller',
};

const HomePage = () => {
  // TODO: 메인 랜딩페이지 UI (서비스 한줄 소개, 후킹 버튼, 기능 소개, 이전 유저 프리뷰) 구현
  // FIX: [API 연동] GET /api/feeds 연동하여 더미데이터 대체
  
  return (
    <main className="min-h-screen">
      <h1>메인 랜딩페이지</h1>
    </main>
  );
};

export default HomePage;
