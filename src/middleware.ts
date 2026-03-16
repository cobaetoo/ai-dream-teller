import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호된 라우트 목록
  const protectedRoutes = ['/my-page'];

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // TODO: 실제 서비스에서는 supabase 세션이나 쿠키 등을 확인
    // 현재는 E2E 가이드에 따라 리다이렉트 기능 동작을 증명하기 위해 
    // 임시로 'auth-token' 쿠키가 없으면 로그인 페이지로 이동시킴
    const authToken = request.cookies.get('sb-access-token'); // Supabase 기본 쿠키 예시

    if (!authToken) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-page/:path*'],
};
