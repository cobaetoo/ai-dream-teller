import type { Metadata } from 'next';
import DemoAdminSidebar from '@/components/layout/demo-admin-sidebar';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 어드민 데모',
};

interface DemoAdminLayoutProps {
  children: React.ReactNode;
}

const DemoAdminLayout = ({ children }: DemoAdminLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      <DemoAdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DemoAdminLayout;
