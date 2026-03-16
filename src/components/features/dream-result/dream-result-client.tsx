"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Sparkles,
  Link as LinkIcon,
  Share2,
  CalendarDays,
  Quote,
  CheckCircle2,
  Brain,
  MessageCircleQuestion,
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";

// 카카오 SDK 타입 정의
declare global {
  interface Window {
    Kakao: any;
  }
}

// 더미 데이터 객체
const MOCK_RESULT = {
  inputDream:
    "제가 어젯밤 거대한 도서관에서 책을 읽고 있었어요. 그런데 갑자기 모든 책에서 빛이 나더니 책장들이 스스로 움직이면서 미로처럼 변했어요. 무섭진 않았고 오히려 흥미진진한 탐험을 하는 느낌이었습니다.",
  title: "빛의 미로가 된 거대한 도서관",
  analysis: `이 꿈은 당신의 무의식 속에서 **새로운 지식이나 경험에 대한 열망이 폭발적으로 분출**되고 있음을 보여줍니다. \n\n도서관이라는 공간은 칼 융(Carl Jung)의 분석심리학적 관점에서 인류의 집단 무의식 또는 당신이 쌓아온 개인의 지적 자산을 상징합니다. 책에서 빛이 나고 미로처럼 변하는 것은 너무 많은 기회나 선택지가 주어졌을 때 발생하는 혼란을 의미하지만, 두려움보다는 흥미를 느꼈다는 점에서 \n당신은 현재의 혼란스러운 상황을 '도전적이고 긍정적인 성장의 기회'로 받아들이고 있습니다.\n\n즉, 현재 직면한 복잡한 문제들을 두려워하지 말고 호기심을 갖고 탐색해 나가라는 내면의 강력한 지지 메시지로 해몽할 수 있습니다.`,
  expertLabel: "칼 융 분석",
  date: new Date("2026-03-12"),
  imageUrl:
    "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop",
};
export const DreamResultClient = ({ orderId }: { orderId: string }) => {
  const router = useRouter();
  // 실제 서비스라면 세션에서 확인하겠지만, 기획 확인을 위해 토글 버튼으로 제공
  const [isMember, setIsMember] = useState(true);
  const [copied, setCopied] = useState(false);

  // 시뮬레이션: orderId가 'invalid'로 시작하면 결과 없음 처리
  const isNotFound = orderId.startsWith("invalid");

  // 회원이 기록한 해몽 내역 날짜 (더미)
  const pastDates = [
    new Date("2026-03-12"),
    new Date("2026-03-10"),
    new Date("2026-02-25"),
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleKakaoShare = () => {
    if (window.Kakao) {
      const { Kakao } = window;
      
      // 이미 초기화되어 있는지 확인 후 초기화
      if (!Kakao.isInitialized()) {
        const apiKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || "YOUR_KAKAO_JS_KEY";
        Kakao.init(apiKey);
      }

      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `[AI Dream Teller] ${MOCK_RESULT.title}`,
          description: MOCK_RESULT.inputDream.slice(0, 100) + "...",
          imageUrl: MOCK_RESULT.imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '해몽 결과 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  if (isNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#faf9f6]">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
            <MessageCircleQuestion className="w-10 h-10 text-slate-300" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">해몽 결과를 찾을 수 없습니다</h1>
            <p className="text-slate-500 leading-relaxed">
              요청하신 주문 번호({orderId})와 일치하는 <br/> 데이터가 없거나 접근 권한이 없습니다.
            </p>
          </div>
          <Button 
            className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
            onClick={() => router.push('/')}
          >
            메인 페이지로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] selection:bg-purple-200 w-full relative">
      {/* 카카오 SDK 스크립트 - lazyOnload 제거 (버튼 클릭 전 안정적 로딩 보장) */}
      <Script
        id="kakao-sdk"
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
        onError={(e) => {
          console.error("Kakao SDK script failed to load. Please check your network or adblocker.", e);
        }}
        onLoad={() => {
          if (window.Kakao && !window.Kakao.isInitialized()) {
            const apiKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
            if (apiKey) window.Kakao.init(apiKey);
          }
        }}
      />
      {/* 테스트용 토글 버튼 */}
      <div className="fixed top-[80px] right-4 z-40 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-2">
        <span className="text-xs font-bold text-purple-600 text-center uppercase tracking-wider">
          Dev Tools
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMember(!isMember)}
          className="text-xs h-8 cursor-pointer border-purple-200 hover:bg-purple-50 hover:text-purple-700"
        >
          {isMember ? "회원 모드 (캘린더 노출)" : "비회원 (캘린더 숨김)"}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* 상단 타이틀 */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-2 shadow-sm border border-purple-200/50">
            <Brain className="w-4 h-4" />
            <span>{MOCK_RESULT.expertLabel}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            어젯밤의 무의식이 <br className="hidden md:block" />
            당신에게 보내는 메시지
          </h1>
          <p className="text-slate-500 font-medium tracking-wide">
            {format(MOCK_RESULT.date, "yyyy년 MM월 dd일", { locale: ko })} 분석 완료
          </p>
        </div>

        {/* 유저가 입력한 꿈 내용 섹션 */}
        <div className="relative p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 mt-8 group">
          <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <MessageCircleQuestion className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 mt-2">
            당신이 기억하는 꿈
          </h3>
          <div className="relative">
            <Quote className="absolute -top-2 -left-3 w-10 h-10 text-slate-100 rotate-180" />
            <p className="relative z-10 text-slate-700 text-lg leading-relaxed whitespace-pre-wrap pl-6 italic">
              "{MOCK_RESULT.inputDream}"
            </p>
            <Quote className="absolute -bottom-4 right-0 w-10 h-10 text-slate-100" />
          </div>
        </div>

        {/* AI 생성 이미지 섹션 */}
        {MOCK_RESULT.imageUrl && (
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 mix-blend-overlay z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MOCK_RESULT.imageUrl}
              alt="AI가 그려낸 꿈의 한 장면"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-white text-xs font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI가 그려낸 꿈의 한 장면
              </p>
            </div>
          </div>
        )}

        {/* 심층 해석 결과 섹션 */}
        <div className="relative p-8 md:p-10 rounded-3xl bg-linear-to-b from-purple-50/50 to-white shadow-xl shadow-slate-200/50 border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            심층 해몽 리포트
          </h2>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-pink-400 pl-4 py-1.5">
              {MOCK_RESULT.title}
            </h3>
            <p className="text-slate-700 text-lg leading-[1.8] whitespace-pre-wrap font-medium">
              {MOCK_RESULT.analysis}
            </p>
          </div>
        </div>

        {/* 공유하기 버튼 섹션 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8 border-t border-slate-200">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 h-14 text-base font-bold shadow-sm cursor-pointer"
            onClick={handleCopyLink}
          >
            {copied ? (
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
            ) : (
              <LinkIcon className="w-5 h-5 mr-2" />
            )}
            {copied ? "링크 복사 완료!" : "결과 링크 복사하기"}
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8 h-14 text-base font-bold shadow-md cursor-pointer"
            onClick={handleKakaoShare}
          >
            <Share2 className="w-5 h-5 mr-2" />
            카카오톡 공유하기
          </Button>
        </div>

        {/* 회원 전용: 꿈 아카이브 캘린더 (회원일 경우만 렌더링) */}
        {isMember && (
          <div className="mt-16 bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-fuchsia-500" />나의 무의식 캘린더
              </h3>
              <p className="text-slate-500 leading-relaxed">
                회원님은 꾸준히 자신의 꿈을 마주하고 계시네요.<br/>보라색으로 빛나는 날짜를 선택하면 과거의 해몽 결과를 다시 열어볼 수 있습니다.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
              <Calendar
                mode="multiple"
                selected={pastDates}
                locale={ko}
                className="rounded-lg bg-transparent"
                modifiers={{
                  hasDream: pastDates,
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
        )}
      </div>
    </div>
  );
};
