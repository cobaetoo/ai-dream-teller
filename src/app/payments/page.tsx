import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 결제',
  description: '결제를 진행하고 꿈 해몽을 받아보세요.',
};

const PaymentsPage = () => {
  // TODO: 토스페이먼츠 결제 위젯 UI 및 영수증 디자인 구현
  // FIX: [API 연동] POST /api/payments/confirm 연동
  
  return (
    <main className="min-h-screen">
      <h1>결제 페이지</h1>
    </main>
  );
};

export default PaymentsPage;
