"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Brain, Sparkles, Image as ImageIcon, AlertCircle, ArrowRight, Zap, Eye, Asterisk, Expand, Shrink, ChevronRight, CheckCircle2 } from 'lucide-react';

const EXPERT_FIELDS = [
  {
    id: 'freud',
    title: '프로이트 (정신분석)',
    description: '억압된 욕망과 무의식적 충돌을 중심으로 해석합니다.',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-200',
    activeBorder: 'border-purple-500',
    activeBg: 'bg-purple-50/50',
  },
  {
    id: 'jung',
    title: '칼 융 (분석심리학)',
    description: '인류 보편적 상징과 원형(Archetype)을 찾아냅니다.',
    icon: Sparkles,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-200',
    activeBorder: 'border-blue-500',
    activeBg: 'bg-blue-50/50',
  },
  {
    id: 'neuroscience',
    title: '신경과학 기반',
    description: '기억의 재구성과 뇌 신경망의 관점으로 파악합니다.',
    icon: Zap,
    color: 'text-sky-500',
    bgColor: 'bg-sky-100',
    borderColor: 'border-sky-200',
    activeBorder: 'border-sky-500',
    activeBg: 'bg-sky-50/50',
  },
  {
    id: 'gestalt',
    title: '게슈탈트 심리학',
    description: '현재의 감정과 억눌린 미해결 과제에 집중합니다.',
    icon: Eye,
    color: 'text-fuchsia-500',
    bgColor: 'bg-fuchsia-100',
    borderColor: 'border-fuchsia-200',
    activeBorder: 'border-fuchsia-500',
    activeBg: 'bg-fuchsia-50/50',
  },
];

export const DreamTellerClient = () => {
  const router = useRouter();
  
  const [selectedField, setSelectedField] = useState('jung');
  const [dreamContent, setDreamContent] = useState('');
  const [includeImage, setIncludeImage] = useState(true); // AI 이미지 생성 옵션 기본 체크
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 아코디언 요소들을 위한 Ref
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  
  // 아코디언 상태 관리 (초기에는 1단계만 열림)
  const [openItems, setOpenItems] = useState<string[]>(['step-1']);

  const basePrice = 1500;
  const imagePrice = 500;
  const totalPrice = basePrice + (includeImage ? imagePrice : 0);

  const isAllExpanded = openItems.length === 3;

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setOpenItems(['step-1']);
    } else {
      setOpenItems(['step-1', 'step-2', 'step-3']);
    }
  };

  const handleNextStep = (nextStep: string) => {
    // 다음 스텝 열기
    setOpenItems((prev) => Array.from(new Set([...prev, nextStep])));
    
    // 부드러운 스크롤을 위해 다음 렌더링 사이클에서 실행
    setTimeout(() => {
      const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
        'step-1': step1Ref,
        'step-2': step2Ref,
        'step-3': step3Ref,
      };
      
      const targetRef = refMap[nextStep];
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamContent.trim()) {
      alert("꿈 내용을 입력해주세요.");
      
      // 만약 꿈 내용 입력창(step-2)이 접혀있다면 강제로 열어줍니다.
      if (!openItems.includes('step-2')) {
        handleNextStep('step-2');
      }
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/payments');
    }, 600);
  };

  return (
    <main className="min-h-screen relative w-full overflow-hidden bg-background py-16 px-4">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-50 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply opacity-50 animate-pulse [animation-delay:2s]" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-black/5 backdrop-blur-md shadow-sm mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-slate-700">심층 꿈 분석 모드</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            당신의 꿈을 들려주세요
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            어젯밤의 모호한 기억이 명확한 인사이트로 바뀝니다. <br className="hidden md:block"/>
            전문 분야를 선택하고 기억나는 대로 자유롭게 적어보세요.
          </p>
        </div>

        {/* Global Expand Toggle */}
        <div className="flex justify-end mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpandAll}
            className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            {isAllExpanded ? (
              <><Shrink className="w-4 h-4 mr-2" /> 단계별로 보기</>
            ) : (
              <><Expand className="w-4 h-4 mr-2" /> 모두 펼쳐보기</>
            )}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Accordion List */}
          <Accordion 
            value={openItems} 
            onValueChange={setOpenItems}
            className="space-y-4"
          >
            {/* Step 1: 전문가 선택 */}
            <div ref={step1Ref}>
              <AccordionItem value="step-1" className="bg-white/70 backdrop-blur-md rounded-2xl border border-black/5 px-6 py-2 shadow-xs data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors ${openItems.includes('step-1') ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>1</div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">누구에게 해몽을 맡길까요?</h2>
                      {!openItems.includes('step-1') && (
                        <p className="text-sm text-purple-600 font-medium mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 
                          {EXPERT_FIELDS.find(f => f.id === selectedField)?.title} 선택됨
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <RadioGroup 
                    value={selectedField} 
                    onValueChange={setSelectedField} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 outline-none"
                  >
                    {EXPERT_FIELDS.map((field) => (
                      <Label
                        key={field.id}
                        htmlFor={field.id}
                        className={`
                          relative flex flex-col items-start p-5 rounded-2xl border transition-all cursor-pointer bg-white/80 shadow-xs hover:shadow-md
                          ${selectedField === field.id ? 'border-2 ' + field.activeBorder + ' ' + field.activeBg : 'border-black/5 hover:border-black/10'}
                        `}
                      >
                        <RadioGroupItem value={field.id} id={field.id} className="sr-only" />
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-xl ${field.bgColor}`}>
                            <field.icon className={`w-5 h-5 ${field.color}`} />
                          </div>
                          <span className="font-semibold text-slate-900 text-lg">{field.title}</span>
                        </div>
                        <p className="text-slate-600 font-normal leading-relaxed text-sm">
                          {field.description}
                        </p>
                        
                        {selectedField === field.id && (
                          <div className="absolute top-5 right-5 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                        )}
                      </Label>
                    ))}
                  </RadioGroup>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      type="button" 
                      onClick={() => handleNextStep('step-2')}
                      className="rounded-full bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                    >
                      다음 단계 <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* Step 2: 꿈 텍스트 작성 */}
            <div ref={step2Ref}>
              <AccordionItem value="step-2" className="bg-white/70 backdrop-blur-md rounded-2xl border border-black/5 px-6 py-2 shadow-xs data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors ${openItems.includes('step-2') ? 'bg-pink-100 text-pink-700' : 'bg-slate-100 text-slate-700'}`}>2</div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">꿈의 내용을 자유롭게 적어주세요</h2>
                      {!openItems.includes('step-2') && dreamContent.length > 0 && (
                        <p className="text-sm text-pink-600 font-medium mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 
                          작성 완료 ({dreamContent.length}자)
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="relative group">
                    <Textarea
                      placeholder="어디서 누구와 있었나요? 어떤 감정을 느꼈나요? 기억나는 파편들을 모두 적어주실수록 분석이 정확해집니다."
                      className="min-h-[240px] resize-y p-6 text-lg rounded-2xl border-black/10 bg-white/80 backdrop-blur-sm focus-visible:ring-pink-500/50 focus-visible:border-pink-500 transition-all shadow-xs group-hover:shadow-md"
                      value={dreamContent}
                      onChange={(e) => setDreamContent(e.target.value)}
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-medium bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm pointer-events-none">
                      {dreamContent.length} / 최소 20자 권장
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button 
                      type="button" 
                      onClick={() => handleNextStep('step-3')}
                      className="rounded-full bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                    >
                      결제 옵션 선택 <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* Step 3: 옵션 및 가격선택 */}
            <div ref={step3Ref}>
              <AccordionItem value="step-3" className="bg-white/70 backdrop-blur-md rounded-2xl border border-black/5 px-6 py-2 shadow-xs data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors ${openItems.includes('step-3') ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-700'}`}>3</div>
                    <h2 className="text-xl font-bold text-slate-900">결제 옵션 선택</h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <Card className="border-black/5 bg-white/80 backdrop-blur-md shadow-xs overflow-hidden rounded-2xl">
                    <CardContent className="p-0 divide-y divide-black/5">
                      
                      {/* Basic Option */}
                      <div className="p-6 flex items-center justify-between bg-purple-50/20">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center bg-purple-500 rounded-full text-white">
                            <Asterisk className="w-3 h-3" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 text-base">전문 심층 해몽 (기본)</h3>
                            <p className="text-sm text-slate-500">선택한 전문가 관점의 AI 분석 텍스트 제공</p>
                          </div>
                        </div>
                        <div className="font-semibold text-slate-900">{basePrice.toLocaleString()}원</div>
                      </div>

                      {/* Extra Option */}
                      <Label 
                        htmlFor="include-image"
                        className={`p-6 flex items-center justify-between cursor-pointer transition-colors hover:bg-slate-50 border-l-4 ${includeImage ? 'border-l-pink-500 bg-pink-50/50' : 'border-l-transparent'}`}
                      >
                        <div className="flex items-center gap-4">
                          <Checkbox 
                            id="include-image" 
                            checked={includeImage} 
                            onCheckedChange={(checked) => setIncludeImage(checked as boolean)}
                            className="w-5 h-5 min-w-[20px] rounded-md border-slate-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500 cursor-pointer"
                          />
                          <div>
                            <h3 className="font-semibold text-slate-900 text-base flex items-center gap-2 flex-wrap">
                              AI 꿈 시각화 이미지 추가 <span className="px-2 py-0.5 text-[10px] font-bold bg-pink-100 text-pink-600 rounded-full">추천</span>
                            </h3>
                            <p className="text-sm text-slate-500 mt-0.5">꿈 속 가장 인상적인 장면을 수채화풍의 그림으로 그려드립니다.</p>
                          </div>
                        </div>
                        <div className="font-semibold text-slate-900 whitespace-nowrap">+{imagePrice.toLocaleString()}원</div>
                      </Label>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>

          {/* Warning Notes */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 flex items-start gap-3 mt-8">
            <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <p>• 분석 완료까지는 결제 후 <strong className="font-semibold text-orange-600">보통 1~3분</strong>이 소요됩니다.</p>
              <p>• 본 해몽은 AI 모델의 상징학적/심리학적 분석을 기반으로 하며, 의료 목적의 진단을 대체하지 않습니다.</p>
              <p>• 생성된 해석결과 및 이미지는 자기 이해를 위한 재미 및 참고 자료로만 활용해주세요.</p>
            </div>
          </div>

          {/* Submit Action Block */}
          <div className="sticky bottom-6 z-20 pt-4 pb-2 bg-linear-to-t from-background via-background to-transparent md:static md:bg-none md:p-0">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-16 text-lg rounded-2xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_8px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_8px_40px_rgba(168,85,247,0.4)] transition-all cursor-pointer group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="font-medium">결제창으로 이동 중...</span>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full px-4">
                  <span className="font-medium text-pink-100 tracking-wide text-base">{totalPrice.toLocaleString()}원 결제하기</span>
                  <span className="font-bold flex items-center gap-2">
                    해몽 분석 시작하기 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              )}
            </Button>
          </div>

        </form>
      </div>
    </main>
  );
};
