import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 미들웨어를 통해 Supabase 세션을 갱신하고 보호된 라우트 접근을 제어합니다.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 현재 사용자 정보 확인 (세션 갱신 포함)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 1. 관리자 전용 경로 보호 (API 및 UI)
  if (pathname.startsWith("/api/admin/") || pathname.startsWith("/admin")) {
    if (!user) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized: Login required" }, { status: 401 });
      }
      const url = request.nextUrl.clone();
      url.pathname = "/auth";
      url.searchParams.set("error", "admin_required");
      return NextResponse.redirect(url);
    }

    // Role 확인 (public.users 테이블 쿼리)
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userError || !userData || userData.role !== "admin") {
      console.warn(`Unauthorized Admin access attempt by ${user.email} (UID: ${user.id}, Role: ${userData?.role || 'none'})`);
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden: Admin access only" }, { status: 403 });
      }
      const url = request.nextUrl.clone();
      url.pathname = "/"; // 권한 없으면 메인으로
      return NextResponse.redirect(url);
    }
  }

  // 2. 일반 보호된 라우트 접근 제어 (PRD: /my-page)
  if (pathname.startsWith("/my-page") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * 아래 경로를 제외한 모든 요청에 대해 미들웨어 실행:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - public 폴더 하위 이미지 등
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
