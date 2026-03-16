'use client';

import { useState } from 'react';
import { Mail, MessageSquare, HelpCircle, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ContactClient = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 문의하기 API 연동 필요
    setIsSubmitted(true);
  };

  const faqs = [
    {
      question: 'AI 꿈 분석은 얼마나 걸리나요?',
      answer: '보통 결제 완료 후 1~3분 이내에 분석 리포트와 이미지가 생성됩니다. 서버 상황에 따라 최대 5분까지 소요될 수 있습니다.',
    },
    {
      question: '결제 후 환불이 가능한가요?',
      answer: 'AI 서비스 특성상 분석이 시작된 이후에는 환불이 불가능합니다. 다만, 시스템 오류로 인해 결과물이 생성되지 않은 경우에는 100% 환불해 드립니다.',
    },
    {
      question: '회원과 비회원의 차이가 무엇인가요?',
      answer: '회원은 과거의 꿈 해몽 내역을 캘린더 형태로 보관하고 관리할 수 있습니다. 비회원은 주문 조회 페이지를 통해 개별 주문 내역만 확인 가능합니다.',
    },
    {
      question: '분석 결과가 마음에 들지 않으면 어떻게 하나요?',
      answer: '심층 해몽은 선택하신 전문 관점(프로이트, 칼 융 등)에 따라 주관적일 수 있습니다. 만약 데이터 생성 자체에 오류가 있다면 고객센터로 문의 부탁드립니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl text-blue-600 mb-2">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            무엇을 도와드릴까요?
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            서비스 이용 중 궁금한 점이 있으시거나 제휴 제안이 있으시다면 언제든 문의해 주세요.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          
          {/* FAQ Section */}
          <div className="md:col-span-3 space-y-8">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-slate-900">자주 묻는 질문</h2>
            </div>
            
            <Accordion className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-slate-200">
                  <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-purple-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900">직접 문의하기</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                답변은 영업일 기준 1~2일 내에 기재하신 이메일로 발송됩니다.<br />
                직접 메일 발송을 원하시면 아래 주소를 이용해 주세요.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@aidreamteller.com">support@aidreamteller.com</a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="md:col-span-2">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">문의 제목</Label>
                  <Input 
                    id="title" 
                    placeholder="제목을 입력하세요" 
                    required 
                    className="rounded-xl border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">회신 받을 이메일</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@email.com" 
                    required 
                    className="rounded-xl border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">문의 내용</Label>
                  <Textarea 
                    id="content" 
                    placeholder="궁금하신 내용을 자세히 적어주세요." 
                    required 
                    className="min-h-[200px] rounded-xl border-slate-200 focus:border-purple-400 focus:ring-purple-400 resize-none"
                  />
                </div>

                <Button type="submit" className="w-full h-14 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200/50 transition-all active:scale-[0.98]">
                  <Send className="w-5 h-5 mr-2" />
                  문의 보내기
                </Button>
              </form>

            ) : (
              <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full text-green-600 mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">문의가 접수되었습니다!</h3>
                  <p className="text-slate-500">
                    빠른 시일 내에 기재하신 이메일로 답변을 드리겠습니다.<br />
                    감사합니다.
                  </p>
                </div>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full rounded-xl border-slate-200 text-slate-600"
                >
                  새로운 문의하기
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export { ContactClient };
