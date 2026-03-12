import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 마이페이지',
  description: '구매 내역과 해몽 결과를 확인하세요.',
};

const MyPage = () => {
  // TODO: 마이페이지 (사용자 정보, 캘린더, 주문내역 리스트) UI 구현
  // FIX: [API 연동] GET /api/users/me 및 GET /api/orders 연동
  
  return (
    <main className="min-h-screen">
      <h1>회원 마이페이지</h1>
    </main>
  );
};

export default MyPage;
