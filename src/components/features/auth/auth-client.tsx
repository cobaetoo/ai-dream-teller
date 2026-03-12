"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, Brain, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AuthClient = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (provider: "google" | "kakao") => {
    // TODO: Supabase Auth 연동 예정
    // 현재는 로그인 성공 상황을 가정하여 리다이렉트만 구현
    console.log(`${provider} login started...`);
    
    // 개발 환경 vs 프로덕션 환경 도메인 처리 로직
    // 실제 Supabase 연동 시 redirectTo 파라미터로 사용될 값
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const redirectPath = "/dream-teller";
    const targetUrl = `${baseUrl}${redirectPath}`;

    console.log(`Redirecting to: ${targetUrl}`);
    
    // 시뮬레이션을 위해 즉시 이동
    router.push(redirectPath);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#faf9f6]">
      {/* 배경 장식 */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative">
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-white flex flex-col items-center text-center">
          {/* 로고 및 인사말 */}
          <div className="mb-8 space-y-4">
            <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-200 mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                다시 만나서 반가워요!
              </h1>
              <p className="text-slate-500 font-medium">
                로그인하고 나만의 무의식 기록을<br/>계속해서 채워보세요.
              </p>
            </div>
          </div>

          <div className="w-full space-y-4">
            {/* 카카오 로그인 버튼 - 공식 버튼 디자인 가이드 준수 */}
            <button
              onClick={() => handleLogin("kakao")}
              className="w-full h-14 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] rounded-2xl flex items-center justify-center gap-3 font-bold transition-all active:scale-[0.98] shadow-sm cursor-pointer"
            >
              <div className="relative w-6 h-6">
                <Image
                  src="https://developers.kakao.com/assets/img/lib/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                  alt="Kakao"
                  width={24}
                  height={24}
                />
              </div>
              카카오로 시작하기
            </button>

            {/* 구글 로그인 버튼 - 공식 G logo 사용 */}
            <button
              onClick={() => handleLogin("google")}
              className="w-full h-14 bg-white hover:bg-slate-50 text-[#1f1f1f] rounded-2xl flex items-center justify-center gap-3 font-bold border border-slate-200 transition-all active:scale-[0.98] shadow-sm cursor-pointer"
            >
              <div className="relative w-6 h-6">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              Google 계정으로 로그인
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 w-full">
            <Link 
              href="/"
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              메인 페이지로 돌아가기
            </Link>
          </div>
        </div>

        {/* 하단 푸터성 문구 */}
        <p className="text-center text-xs text-slate-400 font-medium">
          로그인 시 <b>서비스 이용약관</b> 및 <b>개인정보 처리방침</b>에<br/>동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
};

export default AuthClient;
