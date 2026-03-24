"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Switch } from "@/components/ui/switch";
import { toggleDreamPublicAction } from "@/app/actions/dream-result";
import { useTransition } from "react";
import Image from "next/image";

// 카카오 SDK 타입 정의
declare global {
  interface Window {
    Kakao: any;
  }
}

export const DreamResultClient = ({ 
  orderId,
  initialData,
  isOwner: initialIsOwner,
  pastDates: initialPastDates,
  isMember: initialIsMember
}: { 
  orderId: string;
  initialData: any;
  isOwner: boolean;
  pastDates: Date[];
  isMember: boolean;
}) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  
  const [resultData, setResultData] = useState<any>(initialData);
  const isMember = initialIsMember;
  const isOwner = initialIsOwner;
  const pastDates = initialPastDates;
  
  // 공개/비공개 토글 관련 상태
  const [isPending, startTransition] = useTransition();

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
      if (!Kakao.isInitialized()) {
        const apiKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || "YOUR_KAKAO_JS_KEY";
        Kakao.init(apiKey);
      }

      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `[AI Dream Teller] ${resultData?.title || '나의 꿈 해몽'}`,
          description: (resultData?.inputDream || "").slice(0, 100) + "...",
          imageUrl: resultData?.imageUrl || "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800",
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

  const handleTogglePublic = () => {
    if (!resultData?.id || isPending) return;

    startTransition(async () => {
      const response = await toggleDreamPublicAction(resultData.id, !resultData.isPublic);
      if (response.success) {
        setResultData((prev: any) => ({ ...prev, isPublic: response.isPublic }));
      } else {
        alert(response.error || "상태 변경에 실패했습니다.");
      }
    });
  };

  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#faf9f6]">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
            <MessageCircleQuestion className="w-10 h-10 text-slate-300" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">해몽 결과를 찾을 수 없습니다</h1>
            <p className="text-slate-500 leading-relaxed">
              요청하신 주문 번호와 일치하는 <br/> 데이터가 없거나 접근 권한이 없습니다.
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

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-2 shadow-sm border border-purple-200/50">
            <Brain className="w-4 h-4" />
            <span>{resultData.expertLabel}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            어젯밤의 무의식이 <br className="hidden md:block" />
            당신에게 보내는 메시지
          </h1>
          <p className="text-slate-500 font-medium tracking-wide">
            {format(resultData.date, "yyyy년 MM월 dd일", { locale: ko })} 분석 완료
          </p>
        </div>

        {isOwner && (
          <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-purple-100 shadow-sm mt-6">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800">대중에게 공개하기</h3>
              <p className="text-sm text-slate-500">
                내 꿈을 메인 페이지 피드에 공유하여 다른 사람들과 나눕니다.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold transition-colors ${resultData.isPublic ? "text-slate-400" : "text-slate-700"}`}>비공개</span>
              <Switch 
                checked={resultData.isPublic} 
                onCheckedChange={handleTogglePublic}
                disabled={isPending}
                className="data-[state=checked]:bg-purple-600"
              />
              <span className={`text-sm font-semibold transition-colors ${resultData.isPublic ? "text-purple-600" : "text-slate-400"}`}>공개</span>
            </div>
          </div>
        )}

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
              "{resultData.inputDream}"
            </p>
            <Quote className="absolute -bottom-4 right-0 w-10 h-10 text-slate-100" />
          </div>
        </div>

        {resultData.imageUrl && (
          <div className="relative w-full aspect-21/9 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 mix-blend-overlay z-10" />
            <Image
              src={resultData.imageUrl}
              alt="AI가 그려낸 꿈의 한 장면"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-white text-xs font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI가 그려낸 꿈의 한 장면
              </p>
            </div>
          </div>
        )}

        <div className="relative p-8 md:p-10 rounded-3xl bg-linear-to-b from-purple-50/50 to-white shadow-xl shadow-slate-200/50 border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            심층 해몽 리포트
          </h2>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-pink-400 pl-4 py-1.5">
              {resultData.title}
            </h3>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({...props}) => <h1 className="text-2xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
                  h2: ({...props}) => <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3" {...props} />,
                  h3: ({...props}) => <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2" {...props} />,
                  p: ({...props}) => <p className="mb-4 leading-[1.8]" {...props} />,
                  ul: ({...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                  li: ({...props}) => <li className="pl-1" {...props} />,
                  blockquote: ({...props}) => (
                    <blockquote className="border-l-4 border-purple-200 pl-4 italic text-slate-600 my-4" {...props} />
                  ),
                  strong: ({...props}) => <strong className="font-black text-purple-700" {...props} />,
                }}
              >
                {resultData.analysis}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Disclaimer (Compliance) */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-400 bg-slate-50/50 p-4 rounded-xl">
            <AlertCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>• 본 해설 및 이미지는 AI 모델에 기반한 보조적 지표이며, 의학적/전문적 진단을 대체하지 않습니다.</p>
              <p>• 생성된 산출물은 사용자의 개인적 참고용이며, 비상업적 목적(SNS 공유 등)에 한해 자유롭게 활용하실 수 있습니다.</p>
              <p>• 결과 내용에 따른 최종 판단과 행동의 책임은 사용자 본인에게 있음을 알려드립니다.</p>
            </div>
          </div>
        </div>

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

        {isMember && pastDates.length > 0 && (
          <div className="mt-16 bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-fuchsia-500" />나의 무의식 캘린더
              </h3>
              <p className="text-slate-500 leading-relaxed">
                회원님은 꾸준히 자신의 꿈을 마주하고 계시네요.<br/>보라색으로 빛나는 날짜를 확인해 보세요.
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
                    backgroundColor: 'rgb(243 232 255)',
                    color: 'rgb(126 34 206)',
                    border: '1px solid rgb(216 180 254)',
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
