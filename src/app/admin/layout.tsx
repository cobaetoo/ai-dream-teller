import type { Metadata } from 'next';
import AdminSidebar from '@/components/layout/admin-sidebar';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 관리자',
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
