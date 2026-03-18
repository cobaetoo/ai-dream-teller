"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  History, 
  ShoppingBag, 
  ChevronRight, 
  Sparkles, 
  Search,
  ArrowLeft,
  Smartphone,
  Calendar as CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Order = {
  id: string;
  order_number: string;
  created_at: string;
  dream_content: string;
  total_amount: number;
  dream_results?: {
    id: string;
    analysis_status: string;
    analysis_text: string | null;
    image_url: string | null;
  }[];
};

interface GuestCheckClientProps {
  phoneNumber: string;
  orders: Order[];
}

export const GuestCheckClient = ({ phoneNumber, orders }: GuestCheckClientProps) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const maskPhoneNumber = (phone: string) => {
    if (!phone) return "";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length >= 10) {
      const parts = [
        cleanPhone.slice(0, 3),
        cleanPhone.slice(3, cleanPhone.length - 4),
        cleanPhone.slice(-4)
      ];
      return `${parts[0]}-****-${parts[2]}`;
    }
    return phone;
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]/60 selection:bg-purple-200 py-12 px-4 relative overflow-hidden">
      {/* 배경 오로라 효과 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Link 
              href="/guest-login" 
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-purple-600 transition-colors mb-2 text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              조회 화면으로 돌아가기
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Search className="w-8 h-8 text-indigo-500" />
              비회원 주문 내역
            </h1>
          </div>
          <div className="px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-slate-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Registered Phone</span>
              <span className="text-sm font-bold text-slate-700">{maskPhoneNumber(phoneNumber)}</span>
            </div>
          </div>
        </div>

        {/* 내역 리스트 */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" />
              총 {orders.length}건의 주문 내역
            </h3>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, visibleCount).map((item) => {
                const dreamResultsData = item.dream_results;
                const dreamResult = Array.isArray(dreamResultsData) 
                  ? dreamResultsData[0] 
                  : dreamResultsData;
                const title = "꿈 해몽 결과";
                const summary = dreamResult?.analysis_text || item.dream_content;
                const thumbnail = dreamResult?.image_url;
                const date = new Date(item.created_at);

                return (
                <Link
                  key={item.id}
                  href={`/dream-result/${item.id}`}
                  className="block group"
                >
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 transition-all duration-300 flex items-center gap-6">
                    {/* 썸네일 영역 */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md bg-linear-to-br from-indigo-50 to-fuchsia-50 flex items-center justify-center border border-purple-100/50">
                      {thumbnail ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </>
                      ) : (
                        <div className="relative flex items-center justify-center w-full h-full">
                          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5" />
                          <Sparkles className="w-8 h-8 text-indigo-200 relative z-10 group-hover:scale-110 group-hover:text-indigo-400 transition-all duration-500" />
                        </div>
                      )}
                    </div>

                    {/* 텍스트 정보 */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-500">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{format(date, "yyyy. MM. dd", { locale: ko })}</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-300">#{item.order_number.split('-')[1] || item.id.substring(0, 8)}</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                        {title}
                      </h4>
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                        {summary}
                      </p>
                    </div>

                    {/* 이동 아이콘 */}
                    <div className="shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              )})}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-900 font-bold">주문 내역을 찾을 수 없습니다.</p>
                <p className="text-slate-400 text-sm">입력하신 정보로 결제된 내역이 있는지 확인해 주세요.</p>
              </div>
            </div>
          )}

          {visibleCount < orders.length && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="rounded-full px-8 py-6 border-2 border-slate-100 text-slate-500 hover:border-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-bold cursor-pointer"
              >
                내역 더보기
              </Button>
            </div>
          )}
        </div>

        {/* 하단 배너 (회원가입 유도) */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-200/50 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold">회원이 되시면 더 많은 혜택이 있어요!</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                모든 해몽 내역을 캘린더로 관리하고, <br />
                나만의 무의식 지도를 만들어 보세요.
              </p>
            </div>
            <Link href="/auth" className="inline-block">
              <Button className="bg-white text-indigo-600 hover:bg-slate-50 rounded-full px-6 font-bold shadow-lg transition-all active:scale-95 cursor-pointer">
                3초 만에 회원가입 하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
