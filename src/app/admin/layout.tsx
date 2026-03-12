import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 관리자',
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  // TODO: 관리자 페이지 좌측 네비게이션 패널 (매출 조회, 주문 내역 리스트 등) 구현
  
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r">
        {/* 네비게이션 디자인 추가 */}
        <span>관리자 네비게이션 패널</span>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
