import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 로그인',
  description: '구글, 카카오로 간편하게 로그인하세요.',
};

const AuthPage = () => {
  // TODO: 구글 및 카카오 소셜 로그인 버튼 구현
  // FIX: 로그인 완료 후 /dream-teller 리다이렉트
  
  return (
    <main className="min-h-screen">
      <h1>회원 로그인 페이지</h1>
    </main>
  );
};

export default AuthPage;
