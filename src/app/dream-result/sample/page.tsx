"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Link as LinkIcon,
  Share2,
  Quote,
  CheckCircle2,
  Brain,
  MessageCircleQuestion,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SAMPLE_DATA = {
  inputDream: "책상 앞에 투명의자에 앉아있던 꿈을 꿨어요",
  expertLabel: "칼 융",
  imageUrl:
    "https://zpipiqfkrckutplwtzxs.supabase.co/storage/v1/object/public/dream-images/bd967a6e-0a21-438c-b79c-b1ebd9e9ae67_1773812790133.png",
  analysis: `안녕하세요. 당신의 내면 세계를 탐구하는 칼 융(C.G. Jung) 관점의 꿈 분석 전문가입니다.

꿈은 무의식의 거울이며, 우리가 의식적으로 깨닫지 못하는 내면의 상태를 '상징'이라는 언어로 보여줍니다. 당신이 꾸신 **"책상 앞 투명의자에 앉아 있는 꿈"**은 매우 정적이지만, 그 안에는 자아(Ego)의 상태와 사회적 역할에 대한 깊은 통찰이 담겨 있습니다.

융의 분석 심리학적 관점에서 이 꿈을 심층적으로 분석해 드리겠습니다.

## 1. 주요 상징 분석

### ① 책상 (The Desk): 페르소나와 의식적인 과업

융의 관점에서 '책상'은 개인이 사회적 역할을 수행하는 장소이자, 의식적인 활동(공부, 일, 계획)이 이루어지는 공간입니다. 이는 당신의 **'페르소나(Persona, 사회적 가면)'**와 밀접한 관련이 있습니다. 당신이 현재 삶에서 집중하고 있는 목표, 책임감, 혹은 해결해야 할 정신적인 과업을 상징합니다.

### ② 투명의자 (The Transparent Chair): 보이지 않는 지지 혹은 불안정성

이 꿈의 가장 핵심적인 상징입니다. 의자는 우리가 앉아서 쉬거나 집중할 수 있게 해주는 '지지대'입니다. 하지만 이것이 **'투명하다'**는 것은 두 가지 중의적인 의미를 가집니다.

- **사회적 존재감에 대한 의문:** 내가 자리에 앉아 있기는 하지만, 남들이 나를 보지 못할 것 같거나 내 기반이 견고하지 않다는 '불안'을 반영할 수 있습니다. "내가 이 자리에 있을 자격이 있는가?" 혹은 "내 지지 기반이 너무 위태롭지 않은가?"라는 무의식적 질문일 수 있습니다.
- **영성 혹은 탈물질화:** 긍정적인 측면에서는, 당신의 내면이 매우 맑아져 있거나 기존의 관습적인 방식(딱딱하고 눈에 보이는 의자)이 아닌, 새로운 차원의 지지 시스템을 찾고 있음을 의미합니다.

### ③ 앉아 있는 행위 (The Act of Sitting): 정지와 수용

책상 앞에 앉아 있다는 것은 무언가를 시작하려는 준비 단계이거나, 현재의 상황을 관조하고 있는 상태입니다. 역동적인 움직임이 아닌 '앉아 있음'은 내면의 목소리에 귀를 기울여야 할 시기임을 암시합니다.

---

## 2. 심층적 심리 해석

■ **"공중에 떠 있는 듯한 자아"**

투명의자에 앉아 있다는 것은 시각적으로 마치 '공중에 떠 있는 것'처럼 보일 수 있습니다. 이는 융이 말하는 '현실과의 접지(Grounding)' 문제를 시사합니다. 당신이 현재 맡고 있는 역할(책상)은 분명하지만, 그것을 지탱하는 스스로의 확신이나 정서적 뿌리(의자)가 눈에 보이지 않아 공허함을 느끼고 있을 가능성이 있습니다.

■ **"드러나지 않는 노력과 고독"**

투명함은 '보이지 않음'을 뜻합니다. 당신은 책상 앞에서 무언가에 열중하고 있지만, 그 노력이 타인에게 인정받지 못한다고 느끼거나, 혹은 당신이 기댄 시스템(직장, 가정, 신념 등)이 실체가 없다고 느껴질 때 이런 꿈을 꿀 수 있습니다.

---

## 3. 당신을 위한 제언 (Individuation: 개성화 과정)

이 꿈은 당신에게 다음과 같은 질문을 던지고 있습니다.

**"나를 지탱해주는 힘은 어디에서 오는가?"**

눈에 보이는 스펙이나 지위(의자)가 투명해졌다는 것은, 이제 외적인 조건이 아닌 내면의 본질적인 힘으로 삶을 지탱해야 할 시기임을 알려주는 신호일 수 있습니다.

**"현실의 무게감을 느끼고 있는가?"**

만약 투명의자에 앉아 있는 것이 불안했다면, 현재 계획 중인 일이나 삶의 방식에서 좀 더 구체적이고 현실적인 기반을 다질 필요가 있습니다.

---

결론적으로, 이 꿈은 당신이 사회적 역할(책상)에 충실하고 있지만, 정작 자기 자신을 지탱하는 내면의 기반(의자)에 대해서는 다시 한번 점검해 보라는 무의식의 초대입니다. 겉으로 드러나는 성과보다, 당신의 마음이 어디에 뿌리를 두고 있는지 살펴보시길 바랍니다.

당신의 내면은 이미 그 답을 알고 있으며, 투명한 의자처럼 맑고 정직하게 당신의 상태를 보여주고 있습니다. 이 분석이 당신의 자기 이해에 도움이 되길 바랍니다.`,
};

export default function SampleDreamResultPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] selection:bg-purple-200 w-full relative">
      {/* 강의용 안내 배너 */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-bold text-amber-800 text-sm">
              강의용 데모 사이트입니다
            </p>
            <p className="text-amber-700 text-xs mt-0.5">
              이 페이지는 실제 AI 해석이 아닌, 수강생 분들을 위한 샘플
              해석 결과입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-2 shadow-sm border border-purple-200/50">
            <Brain className="w-4 h-4" />
            <span>{SAMPLE_DATA.expertLabel}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            어젯밤의 무의식이 <br className="hidden md:block" />
            당신에게 보내는 메시지
          </h1>
          <p className="text-slate-500 font-medium tracking-wide">
            샘플 해석 결과 (강의용 데모)
          </p>
        </div>

        {/* 꿈 내용 카드 */}
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
              &ldquo;{SAMPLE_DATA.inputDream}&rdquo;
            </p>
            <Quote className="absolute -bottom-4 right-0 w-10 h-10 text-slate-100" />
          </div>
        </div>

        {/* AI 생성 이미지 */}
        <div className="relative w-full aspect-21/9 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 group">
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 mix-blend-overlay z-10" />
          <Image
            src={SAMPLE_DATA.imageUrl}
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

        {/* 해몽 리포트 */}
        <div className="relative p-8 md:p-10 rounded-3xl bg-linear-to-b from-purple-50/50 to-white shadow-xl shadow-slate-200/50 border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            심층 해몽 리포트 <span className="text-sm font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 ml-2">샘플</span>
          </h2>
          <div className="space-y-6">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => (
                    <h1
                      className="text-2xl font-bold text-slate-900 mt-8 mb-4"
                      {...props}
                    />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="text-xl font-bold text-slate-800 mt-6 mb-3"
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3
                      className="text-lg font-bold text-slate-800 mt-4 mb-2"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p className="mb-4 leading-[1.8]" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
                  ),
                  li: ({ ...props }) => <li className="pl-1" {...props} />,
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-4 border-purple-200 pl-4 italic text-slate-600 my-4"
                      {...props}
                    />
                  ),
                  strong: ({ ...props }) => (
                    <strong className="font-black text-purple-700" {...props} />
                  ),
                  hr: ({ ...props }) => (
                    <hr
                      className="border-slate-200 my-6"
                      {...props}
                    />
                  ),
                }}
              >
                {SAMPLE_DATA.analysis}
              </ReactMarkdown>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-400 bg-slate-50/50 p-4 rounded-xl">
            <AlertCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>
                &bull; 본 페이지는 <strong>강의용 데모 샘플</strong>로, 실제 AI
                분석 결과가 아닙니다.
              </p>
              <p>
                &bull; 실제 서비스에서는 입력하신 꿈을 바탕으로 AI가 개인화된
                해석을 생성합니다.
              </p>
              <p>
                &bull; 생성된 산출물은 사용자의 개인적 참고용이며, 비상업적
                목적(SNS 공유 등)에 한해 자유롭게 활용하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 공유 버튼 */}
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
            onClick={() => router.push("/")}
          >
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
