'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Menu, ShoppingCart, Users, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const NAV_ITEMS = [
  {
    title: '매출 조회',
    href: '/admin-demo',
    icon: LayoutDashboard,
  },
  {
    title: '주문 내역 리스트',
    href: '/admin-demo/order-list',
    icon: ShoppingCart,
  },
  {
    title: '유저 리스트',
    href: '/admin-demo/user-list',
    icon: Users,
  },
];

const DemoAdminMenu = ({ pathname }: { pathname: string }) => {
  return (
    <nav className="flex-1 px-4 space-y-2 pb-4">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-purple-50 text-purple-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className={cn("w-5 h-5", isActive ? "text-purple-600" : "text-gray-400")} />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

const DemoAdminSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white w-full sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-pink-500">
            Admin Demo
          </h2>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" />}>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
            <SheetTitle className="sr-only">어드민 데모 모바일 메뉴</SheetTitle>
            <SheetDescription className="sr-only">어드민 데모 모바일 메뉴입니다.</SheetDescription>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-pink-500">
                  Admin Demo
                </h2>
              </div>
              <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block mt-1 border border-amber-200">
                강의용 데모
              </p>
            </div>
            <DemoAdminMenu pathname={pathname} />
            <div className="p-4 border-t text-xs text-gray-400 text-center">
              Powered by AI Dream Teller
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r bg-white flex-col min-h-screen sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-pink-500">
              Admin Demo
            </h2>
          </div>
          <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block mt-1 border border-amber-200">
            강의용 데모
          </p>
        </div>

        <DemoAdminMenu pathname={pathname} />

        <div className="mt-auto p-4 border-t text-xs text-gray-400 text-center">
          Powered by AI Dream Teller
        </div>
      </aside>
    </>
  );
};

export default DemoAdminSidebar;
