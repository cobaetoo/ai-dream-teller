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
    console.log(`${provider} login started...`);
    const redirectPath = "/dream-teller";
    router.push(redirectPath);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#faf9f6] relative overflow-hidden font-sans">
      {/* 몽환적인 오로라 배경 요소 */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-300/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-pink-300/20 rounded-full blur-[100px] pointer-events-none animate-pulse [animation-delay:1.5s]" />
      <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[50%] bg-sky-200/20 rounded-full blur-[130px] pointer-events-none animate-pulse [animation-delay:3s]" />

      <div className="max-w-md w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="bg-white/40 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/60 flex flex-col items-center text-center">
          {/* 상단 아이콘 */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40 animate-pulse" />
            <div className="relative w-20 h-20 bg-linear-to-br from-purple-600 to-pink-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-200/50 transform hover:rotate-6 transition-transform duration-500">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* 텍스트 섹션 */}
          <div className="space-y-3 mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              당신의 무의식을<br/>만나는 시간
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              기억 저편에 숨겨진 꿈의 조각들을<br/>
              AI Dream Teller와 함께 발견해 보세요.
            </p>
          </div>

          {/* 버튼 섹션 */}
          <div className="w-full space-y-3">
            {/* 카카오 로그인 버튼 - 인라인 SVG로 로고 깨짐 방지 */}
            <button
              onClick={() => handleLogin("kakao")}
              className="w-full h-15 bg-[#FEE500] hover:bg-[#FDD800] active:scale-[0.97] text-[#191919] rounded-2xl flex items-center justify-center gap-3 font-bold transition-all shadow-md shadow-yellow-200/50 cursor-pointer group"
            >
              <svg 
                className="w-6 h-6 group-hover:scale-110 transition-transform" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M12 4C7.58172 4 4 6.83502 4 10.332C4 12.5938 5.48532 14.562 7.74902 15.6881L6.80005 19.1666C6.73273 19.4124 7.02891 19.6097 7.23725 19.4719L11.3327 16.762C11.5518 16.7767 11.7744 16.7842 12 16.7842C16.4183 16.7842 20 13.9492 20 10.4522C20 6.95519 16.4183 4.12012 12 4.12012V4Z" 
                  fill="#191919"
                />
              </svg>
              카카오로 시작하기
            </button>

            {/* 구글 로그인 버튼 */}
            <button
              onClick={() => handleLogin("google")}
              className="w-full h-15 bg-white hover:bg-slate-50 active:scale-[0.97] text-slate-700 rounded-2xl flex items-center justify-center gap-3 font-bold border border-slate-200 transition-all shadow-sm cursor-pointer group"
            >
              <svg 
                className="w-6 h-6 group-hover:scale-110 transition-transform" 
                viewBox="0 0 48 48"
              >
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.13-.45-4.63H24v9.06h12.94c-.58 2.84-2.2 5.23-4.62 6.84l7.4 5.74c4.32-3.99 6.26-9.92 6.26-17.01z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.4-5.74c-2.28 1.52-5.18 2.42-8.49 2.42-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Google 계정으로 로그인
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 w-full flex flex-col items-center gap-4">
            <Link 
              href="/"
              className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              메인 페이지로 돌아가기
            </Link>
          </div>
        </div>

        {/* 푸터 영역 */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            로그인 시 <span className="underline underline-offset-2 cursor-pointer hover:text-slate-600 transition-colors">서비스 이용약관</span> 및 <span className="underline underline-offset-2 cursor-pointer hover:text-slate-600 transition-colors">개인정보 처리방침</span>에<br/>동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthClient;
