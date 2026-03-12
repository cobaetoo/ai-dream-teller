"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  User,
  LogOut,
  Mail,
  Calendar as CalendarIcon,
  ShoppingBag,
  ChevronRight,
  Edit2,
  Check,
  History,
  Brain,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 더미 유저 데이터
const MOCK_USER = {
  nickname: "꿈꾸는 여행자",
  email: "dreamer@example.com",
  provider: "kakao", // 'kakao' | 'google'
};

// 더미 구매 내역 데이터
const MOCK_HISTORY = [
  {
    id: "ord_1",
    date: new Date("2026-03-12"),
    title: "빛의 미로가 된 거대한 도서관",
    summary: "새로운 지식이나 경험에 대한 열망이 폭발적으로 분출되고 있음을 상징...",
    thumbnail: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "ord_2",
    date: new Date("2026-03-10"),
    title: "끝없는 바다 위를 나는 고래",
    summary: "억압된 감정의 해방과 자유로운 자아로의 회귀를 의미하는 매우 긍정적인 꿈...",
    thumbnail: "https://images.unsplash.com/photo-1518173946687-a4c8a983378a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "ord_text_only",
    date: new Date("2026-03-05"),
    title: "아무런 소리도 들리지 않는 하얀 방",
    summary: "외부의 자극으로부터 자신을 격리시키고 휴식을 취하고 싶은 심리적 상태를 반영하는 정적인 꿈입니다. 이미지 분석 없이 텍스트 심층 해몽만 진행된 케이스입니다.",
    thumbnail: null, // 이미지 없음 예시
  },
  {
    id: "ord_3",
    date: new Date("2026-02-25"),
    title: "구름 위로 솟은 번쩍이는 금색 성",
    summary: "당신이 현재 추구하고 있는 목표가 비현실적일 수 있음을 경고함과 동시에...",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "ord_4",
    date: new Date("2026-02-20"),
    title: "끝을 알 수 없는 지하 계단",
    summary: "자신의 무의식 깊은 곳을 탐구하고자 하는 욕구와 미지의 영역에 대한 두려움이 공존하는 상태입니다.",
    thumbnail: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=200&auto=format&fit=crop",
  },
];

const MyPageClient = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(MOCK_USER.nickname);
  const [tempNickname, setTempNickname] = useState(MOCK_USER.nickname);
  const [visibleCount, setVisibleCount] = useState(3);

  // 해몽 기록이 있는 날짜들
  const historyDates = MOCK_HISTORY.map((h) => h.date);

  const handleUpdateNickname = () => {
    setNickname(tempNickname);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // 실제 로그아웃 로직 처리 후 메인으로 리다이렉트
    alert("로그아웃 되었습니다.");
    router.push("/");
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

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
                  <User className="w-12 h-12 text-slate-300" />
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="space-y-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tempNickname}
                        onChange={(e) => setTempNickname(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-purple-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 transition-all font-bold text-center"
                        autoFocus
                      />
                      <button
                        onClick={handleUpdateNickname}
                        className="p-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
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
                    <span>{MOCK_USER.email}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-center">
                  <div className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-2">
                    {MOCK_USER.provider === "kakao" ? (
                      <div className="w-5 h-5 bg-[#FEE500] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 4C7.58172 4 4 6.83502 4 10.332C4 12.5938 5.48532 14.562 7.74902 15.6881L6.80005 19.1666C6.73273 19.4124 7.02891 19.6097 7.23725 19.4719L11.3327 16.762C11.5518 16.7767 11.7744 16.7842 12 16.7842C16.4183 16.7842 20 13.9492 20 10.4522C20 6.95519 16.4183 4.12012 12 4.12012V4Z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 border border-slate-200 rounded-full flex items-center justify-center bg-white">
                        <svg viewBox="0 0 48 48" className="w-3 h-3">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.13-.45-4.63H24v9.06h12.94c-.58 2.84-2.2 5.23-4.62 6.84l7.4 5.74c4.32-3.99 6.26-9.92 6.26-17.01z"/>
                        </svg>
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {MOCK_USER.provider} Login
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
              <p className="text-3xl font-black">{MOCK_HISTORY.length}</p>
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
                {MOCK_HISTORY.slice(0, visibleCount).map((item) => (
                  <Link
                    key={item.id}
                    href={`/dream-result/${item.id}`}
                    className="block group"
                  >
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-purple-200 transition-all duration-300 flex items-center gap-6">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md bg-linear-to-br from-indigo-50 to-fuchsia-50 flex items-center justify-center border border-purple-100/50">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
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
                          <span>{format(item.date, "yyyy. MM. dd", { locale: ko })}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-sm truncate">
                          {item.summary}
                        </p>
                      </div>
                      <div className="shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {visibleCount < MOCK_HISTORY.length && (
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
