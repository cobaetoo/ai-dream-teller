import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 비회원 주문 조회',
  description: '비회원 주문 및 해몽 내역을 조회합니다.',
};

const GuestCheckPage = () => {
  // TODO: 비회원 주문 내역 리스트 표출 UI
  // FIX: [API 연동] GET /api/orders/guest 연동
  
  return (
    <main className="min-h-screen">
      <h1>비회원 주문 조회 페이지</h1>
    </main>
  );
};

export default GuestCheckPage;
