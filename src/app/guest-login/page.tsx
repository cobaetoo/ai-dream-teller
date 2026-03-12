import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 비회원 조회 로그인',
  description: '전화번호로 비회원 주문 내역을 조회하세요.',
};

const GuestLoginPage = () => {
  // TODO: 전화번호 및 비밀번호 입력 폼 구현
  // FIX: [API 연동] POST /api/auth/guest 연동
  
  return (
    <main className="min-h-screen">
      <h1>비회원 로그인 페이지</h1>
    </main>
  );
};

export default GuestLoginPage;
