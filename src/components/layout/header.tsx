'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // 뷰포트 변경 시 드로어가 열려있다면 자동으로 닫음 (md 중단점 768px 기준)
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // 초기 사용자 정보 가져오기
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // 인증 상태 변경 리스너 등록
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const isLoggedIn = !!user;

  const NavLinks = () => (
    <>
      {!isLoggedIn ? (
        <>
          {/* 비회원 */}
          <Link href="/guest-login" className="cursor-pointer">
            <Button variant="ghost" className="w-full justify-start md:w-auto md:justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              비회원 주문조회
            </Button>
          </Link>
          <Link href="/auth" className="cursor-pointer">
            <Button className="w-full md:w-auto bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20 transition-all cursor-pointer">
              로그인
            </Button>
          </Link>
        </>
      ) : (
        <>
          {/* 회원 */}
          <Link href="/my-page" className="w-full md:w-auto flex mt-2 md:mt-0 items-center gap-2">
            <Avatar className="h-9 w-9 border-2 border-purple-500/50 hover:border-purple-400 cursor-pointer transition-colors">
              <AvatarImage src={user?.user_metadata?.avatar_url} referrerPolicy="no-referrer" alt="user avatar" />
              <AvatarFallback className="bg-purple-900 text-purple-200">
                {user?.user_metadata?.full_name?.[0] || 'ME'}
              </AvatarFallback>
            </Avatar>
            <span className="md:hidden font-medium text-purple-900">마이페이지</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 공통: 홈 로고 */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 via-fuchsia-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] cursor-pointer" />
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 cursor-pointer">
            AI Dream Teller
          </span>
        </Link>

        {/* 데스크탑 네비게이션 액션 */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLinks />
        </nav>

        {/* 모바일 햄버거 메뉴 (Sheet) */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-zinc-800 hover:bg-black/5 cursor-pointer" />}>
              <Menu className="h-6 w-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="top" className="bg-white/95 border-b border-black/10 backdrop-blur-xl w-full rounded-b-2xl">
              <SheetTitle className="sr-only">모바일 메뉴</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
