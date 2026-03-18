"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Phone, 
  Lock, 
  ArrowLeft, 
  Sparkles,
  Info
} from "lucide-react";
import Link from "next/link";

export const GuestLoginClient = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 전화번호 자동 하이픈 포맷팅
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    let formattedValue = value;
    
    if (value.length > 3 && value.length <= 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
    
    setPhone(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      alert("전화번호와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone, guest_password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "조회에 실패했습니다.");
      }

      // 성공 시 서버에서 쿠키를 설정함
      router.push("/guest-check");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-purple-200">
      {/* 배경 오로라 애니메이션 */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-200/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-100/10 rounded-full blur-[150px]" />

      <div className="w-full max-w-md relative z-10">
        <Link 
          href="/auth" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-600 transition-colors mb-8 group"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">로그인으로 돌아가기</span>
        </Link>

        {/* 메인 케이스 (Glassmorphism) */}
        <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-purple-900/5 border border-white/50 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-500 rounded-3xl shadow-lg shadow-purple-200 mb-2 rotate-3 hover:rotate-0 transition-transform duration-500">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              비회원 주문 조회
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[240px] mx-auto font-medium">
              주문 시 입력했던 전화번호와 <br />
              비밀번호로 내역을 확인할 수 있습니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">전화번호</Label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={13}
                    className="pl-11 h-14 bg-white/50 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">비밀번호</Label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호 4자리"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={4}
                    className="pl-11 h-14 bg-white/50 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all font-medium tracking-[0.3em]"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:scale-100 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>조회 중...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  주문 확인하기
                  <Sparkles className="w-5 h-5 fill-white/20" />
                </span>
              )}
            </Button>
          </form>

          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[12px] text-slate-500 leading-relaxed">
                비회원 주문 비밀번호를 잊어버리신 경우, <br />
                <span className="font-bold underline cursor-pointer hover:text-purple-600 transition-colors">고객센터</span>로 문의해 주세요.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              계정이 있으신가요? {" "}
              <Link href="/auth" className="text-purple-600 font-bold hover:underline">
                로그인하기
              </Link>
            </p>
          </div>
        </div>

        {/* 푸터 문구 */}
        <p className="mt-8 text-center text-[10px] text-slate-300 font-medium uppercase tracking-[0.2em]">
          AI Dream Teller © 2026 Crafted with Soul
        </p>
      </div>
    </div>
  );
};
