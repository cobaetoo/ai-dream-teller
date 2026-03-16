"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  User as UserIcon,
  LogOut,
  Mail,
  Calendar as CalendarIcon,
  ShoppingBag,
  ChevronRight,
  Edit2,
  Check,
  History,
  Brain,
  Sparkles,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

// 더미 구매 내역 데이터 (실제 데이터 연동 전까지 유지)
// 인터페이스 정의
interface OrderWithResult {
  id: string;
  order_number: string;
  created_at: string;
  dream_content: string;
  total_amount: number;
  dream_results: {
    analysis_status: 'processing' | 'completed' | 'failed';
    id: string;
  }[];
}

const MyPageClient = () => {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [tempNickname, setTempNickname] = useState("");
  const [orders, setOrders] = useState<OrderWithResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isUpdating, setIsUpdating] = useState(false);

  // 유저 정보 및 주문 내역 가져오기
  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const name = user.user_metadata?.full_name || user.user_metadata?.nickname || "사용자";
        setNickname(name);
        setTempNickname(name);
        
        // 주문 내역 API 호출
        try {
          const res = await fetch("/api/orders");
          const data = await res.json();
          if (data.orders) {
            setOrders(data.orders);
          }
        } catch (err) {
          console.error("Orders fetch failed:", err);
        }
      } else {
        router.push("/auth");
      }
      setIsLoading(false);
    };
    initPage();
  }, [supabase.auth, router]);

  // 해몽 기록이 있는 날짜들
  const historyDates = orders.map((o) => new Date(o.created_at));

  const handleUpdateNickname = async () => {
    if (!tempNickname.trim() || tempNickname === nickname) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      // 1. Auth Metadata 업데이트
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: tempNickname, nickname: tempNickname }
      });

      if (authError) throw authError;

      // 2. Public.users 테이블 업데이트
      const { error: dbError } = await supabase
        .from('users')
        .update({ nickname: tempNickname })
        .eq('id', user?.id);

      if (dbError) throw dbError;

      setNickname(tempNickname);
      setIsEditing(false);
      alert("닉네임이 성공적으로 수정되었습니다.");
    } catch (error: any) {
      console.error("Nickname update failed:", error);
      alert("닉네임 수정 중 오류가 발생했습니다: " + error.message);
      setTempNickname(nickname);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm("로그아웃 하시겠습니까?")) return;

    try {
      // 서버 사이드 세션 정리를 위해 API 호출
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      
      // 클라이언트 사이드 로그아웃 및 상태 초기화
      await supabase.auth.signOut();
      
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6]/50 selection:bg-purple-200 py-12 px-4 relative overflow-hidden">
      {/* 배경 오로라 효과 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-500" />
          마이페이지
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* 유저 프로필 섹션 */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center">
              <div className="relative group mb-6">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-inner">
                  {user.user_metadata?.avatar_url ? (
                    <Image 
                      src={user.user_metadata.avatar_url} 
                      alt="profile" 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <UserIcon className="w-12 h-12 text-slate-300" />
                  )}
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="space-y-1">
                  {isEditing ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempNickname}
                          onChange={(e) => setTempNickname(e.target.value)}
                          maxLength={10}
                          className="w-full px-3 py-1.5 bg-slate-50 border border-purple-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 transition-all font-bold text-center"
                          autoFocus
                          disabled={isUpdating}
                          placeholder="닉네임 입력 (최대 10자)"
                        />
                        <button
                          onClick={handleUpdateNickname}
                          disabled={!tempNickname.trim() || isUpdating}
                          className="p-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                        >
                          {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400">최대 10자까지 입력 가능</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">
                        {nickname}
                      </h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 text-slate-400 hover:text-purple-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-1 text-sm text-slate-400 font-medium">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[180px]">{user.email}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-center">
                  <div className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-2">
                    {user.app_metadata?.provider === "kakao" ? (
                      <div className="w-5 h-5 bg-[#FEE500] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 4C7.58172 4 4 6.83502 4 10.332C4 12.5938 5.48532 14.562 7.74902 15.6881L6.80005 19.1666C6.73273 19.4124 7.02891 19.6097 7.23725 19.4719L11.3327 16.762C11.5518 16.7767 11.7744 16.7842 12 16.7842C16.4183 16.7842 20 13.9492 20 10.4522C20 6.95519 16.4183 4.12012 12 4.12012V4Z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden">
                        <svg viewBox="0 0 48 48" className="w-4 h-4">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.13-.45-4.63H24v9.06h12.94c-.58 2.84-2.2 5.23-4.62 6.84l7.4 5.74c4.32-3.99 6.26-9.92 6.26-17.01z"/>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.4-5.74c-2.28 1.52-5.18 2.42-8.49 2.42-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {user.app_metadata?.provider} Login
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </Button>
                </div>
              </div>
            </div>

            {/* 해몽 캘린더 요약 미니 보드 */}
            <div className="bg-linear-to-br from-purple-600 to-pink-500 p-8 rounded-[2.5rem] shadow-xl shadow-purple-200/50 text-white space-y-2">
              <Brain className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-3xl font-black">{orders.length}</p>
              <p className="text-sm font-medium opacity-80">지금까지 분석한 나의 꿈</p>
            </div>
          </div>

          {/* 캘린더 및 구매 내역 섹션 */}
          <div className="md:col-span-8 space-y-8">
            {/* 캘린더 섹션 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>DREAM ARCHIVE</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">무의식 캘린더</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  보라색으로 강조된 일자는 실제 해몽을 진행한 날입니다.<br className="hidden md:block"/>해당 일자를 선택하면 당시의 해몽 결과를 확인할 수 있습니다.
                </p>
              </div>
              <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-50">
                <Calendar
                  mode="multiple"
                  selected={historyDates}
                  locale={ko}
                  className="bg-transparent"
                  modifiers={{
                    hasDream: historyDates,
                  }}
                  modifiersStyles={{
                    hasDream: {
                      fontWeight: 'bold',
                      backgroundColor: 'rgb(243 232 255)', // purple-100
                      color: 'rgb(126 34 206)', // purple-700
                      border: '1px solid rgb(216 180 254)', // purple-300
                    }
                  }}
                />
              </div>
            </div>

            {/* 구매 내역 리스트 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-6 h-6 text-slate-400" />
                  해몽 분석 내역
                </h3>
              </div>
              <div className="space-y-4">
                {orders.length === 0 && !isLoading && (
                  <div className="bg-white p-12 rounded-[2rem] border border-slate-100 text-center space-y-4">
                    <History className="w-12 h-12 text-slate-200 mx-auto" />
                    <p className="text-slate-400 font-bold">아직 해몽 분석 내역이 없습니다.</p>
                    <Button onClick={() => router.push("/")} variant="outline" className="rounded-full">첫 해몽 시작하기</Button>
                  </div>
                )}
                
                {orders.slice(0, visibleCount).map((item) => {
                  const result = item.dream_results?.[0];
                  const isProcessing = result?.analysis_status === 'processing';
                  
                  return (
                    <Link
                      key={item.id}
                      href={isProcessing ? "#" : `/dream-result/${item.id}`}
                      className={`block group ${isProcessing ? "cursor-default" : ""}`}
                      onClick={(e) => isProcessing && e.preventDefault()}
                    >
                      <div className={`bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-300 flex items-center gap-6 ${isProcessing ? "opacity-90" : "hover:shadow-xl hover:shadow-slate-200/50 hover:border-purple-200"}`}>
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md bg-linear-to-br from-indigo-50 to-fuchsia-50 flex items-center justify-center border border-purple-100/50">
                          {isProcessing ? (
                            <div className="flex flex-col items-center justify-center w-full h-full bg-purple-50/50">
                              <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                            </div>
                          ) : (
                            <div className="relative flex items-center justify-center w-full h-full">
                              <div className="absolute inset-x-0 inset-y-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 animate-pulse" />
                              <Sparkles className="w-8 h-8 text-purple-300 relative z-10 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-purple-600/70">
                            <ShoppingBag className="w-3 h-3" />
                            <span>{format(new Date(item.created_at), "yyyy. MM. dd", { locale: ko })}</span>
                            {isProcessing && (
                                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md text-[10px] animate-pulse">분석 중</span>
                            )}
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 truncate">
                            {item.dream_content.slice(0, 20)}...
                          </h4>
                          <p className={`text-sm truncate font-medium ${isProcessing ? "text-amber-500" : "text-slate-500"}`}>
                            {isProcessing ? "LLM이 심층 해몽 분석을 진행하고 있습니다. 잠시만 기다려 주세요." : item.dream_content}
                          </p>
                        </div>
                        <div className={`shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center transition-all ${isProcessing ? "" : "group-hover:bg-purple-600 group-hover:text-white"}`}>
                          {isProcessing ? <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" /> : <ChevronRight className="w-5 h-5" />}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

               {visibleCount < orders.length && (
                <div className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    className="rounded-full px-8 py-6 border-2 border-slate-100 text-slate-500 hover:border-purple-100 hover:text-purple-600 hover:bg-purple-50 transition-all font-bold cursor-pointer"
                  >
                    내역 더보기
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageClient;
