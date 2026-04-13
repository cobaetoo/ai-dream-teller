import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Image as ImageIcon,
  Search,
  CalendarDays,
  GraduationCap,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 어젯밤 꿈, 아직 기억나시나요?',
  description:
    '프로이트부터 신경과학까지 4가지 전문 관점으로 AI가 당신의 꿈을 분석합니다. 3분 안에 당신만의 꿈 해석 리포트를 받아보세요.',
};

const HomePage = async () => {
  const supabase = await createClient();

  // 공개 허용된 최신 해몽 결과 3개 가져오기
  const { data: publicDreams } = await supabase
    .from('dream_results')
    .select('id, order_id, analysis_text, image_url, created_at, orders!inner(expert_field, dream_content)')
    .eq('is_public', true)
    .eq('analysis_status', 'completed')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none opacity-50 animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-pink-400/30 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-multiply animate-pulse [animation-delay:1s]" />
        <div className="absolute top-2/3 right-1/3 w-[600px] h-[600px] bg-sky-300/30 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-multiply animate-pulse [animation-delay:2s]" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-black/5 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-slate-800">
              AI 기반 전문 꿈 해석 서비스
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-slate-900">
            어젯밤{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-500 to-sky-500">
              꿈
            </span>
            ,
            <br />
            아직 기억나시나요?
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            프로이트부터 신경과학까지, 4가지 전문 관점으로 AI가 당신의 꿈을
            분석합니다.
            <br className="hidden md:block" />
            어젯밤 꿈을 적으면, 3분 안에 당신만의 꿈 해석 리포트가 완성됩니다.
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            <Link href="/dream-teller">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_30px_rgba(168,85,247,0.4)] transition-all group cursor-pointer"
              >
                내 꿈 해석 시작하기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/admin-demo">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 mr-1.5" />
                어드민 데모 둘러보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Features Bento Grid Section */}
      <section className="relative w-full py-24 px-4 bg-zinc-50/50">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              왜, AI Dream Teller인가요?
            </h2>
            <p className="text-slate-600 text-lg">
              기존의 뻔한 키워드 검색이 아닌, 당신의 꿈만을 위한 심층 분석
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full auto-rows-[250px]">
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-white border border-black/5 shadow-xs p-8 flex flex-col justify-end hover:shadow-md hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-purple-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Brain className="absolute top-8 right-8 w-12 h-12 text-purple-400 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  프로이트, 칼 융, 그리고 신경과학까지
                </h3>
                <p className="text-slate-600 max-w-sm">
                  하나의 꿈, 네 가지 학문적 렌즈. 원하는 전문 관점을 선택해
                  나만의 꿈 해석을 받아보세요.
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl bg-white border border-black/5 shadow-xs p-8 flex flex-col justify-end hover:shadow-md hover:border-pink-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-pink-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Search className="absolute top-8 right-8 w-10 h-10 text-pink-400 group-hover:text-pink-500 group-hover:scale-110 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  키워드 검색은 그만, AI 심층 해석
                </h3>
                <p className="text-slate-600 text-sm">
                  꿈 속 상징, 감정, 서사 구조를 AI가 종합적으로 분석하여
                  당신만의 해석 리포트를 생성합니다.
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl bg-white border border-black/5 shadow-xs p-8 flex flex-col justify-end hover:shadow-md hover:border-blue-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-sky-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ImageIcon className="absolute top-8 right-8 w-10 h-10 text-sky-400 group-hover:text-sky-500 group-hover:scale-110 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  꿈을 다시 눈앞에
                </h3>
                <p className="text-slate-600 text-sm">
                  AI가 당신의 꿈 속 장면을 한 장의 이미지로 그려드립니다.
                  흐릿한 기억이 선명한 그림이 됩니다.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-white border border-black/5 shadow-xs p-8 flex flex-col justify-end hover:shadow-md hover:border-fuchsia-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-r from-fuchsia-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CalendarDays className="absolute top-8 right-8 w-12 h-12 text-fuchsia-400 group-hover:text-fuchsia-500 group-hover:scale-110 transition-all duration-300" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  나만의 꿈 아카이브
                </h3>
                <p className="text-slate-600 max-w-sm">
                  캘린더에 기록되는 꿈 해석 히스토리. 결과를 친구와 공유하고,
                  나의 무의식 패턴을 발견하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 이전 유저들의 꿈 해몽 예시 리스트 섹션 */}
      <section className="relative w-full py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                다른 사람들의 꿈 이야기
              </h2>
              <p className="text-slate-600">
                매일 업데이트되는 흥미롭고 신비로운 해몽 결과들
              </p>
            </div>
            <Link href="/feeds" className="cursor-pointer">
              <Button
                variant="outline"
                className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                더 많은 꿈 보기{' '}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicDreams && publicDreams.length > 0 ? (
              publicDreams.map((dream: any) => {
                const expertField = dream.orders?.expert_field || "해몽";
                const content = dream.orders?.dream_content || "";
                
                return (
                  <Link
                    key={dream.id}
                    href={`/dream-result/${dream.order_id}`}
                    className="block group cursor-pointer"
                  >
                    <div className="rounded-2xl bg-white border border-black/5 shadow-xs overflow-hidden h-full hover:shadow-lg transition-all duration-300 flex flex-col">
                      {dream.image_url ? (
                        <div className="aspect-video w-full bg-slate-100 relative">
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url('${dream.image_url}')` }}
                          />
                        </div>
                      ) : (
                        <div className="p-6 pb-0 flex-1">
                          {/* 이미지가 없을 때 남는 공간 확보용 (최소 높이 유지 등) */}
                        </div>
                      )}
                      
                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                              {expertField}
                            </span>
                            <span className="text-xs text-slate-500">
                              {formatDistanceToNow(new Date(dream.created_at), { addSuffix: true, locale: ko })}
                            </span>
                          </div>
                          <h4 className="font-semibold text-lg text-slate-900 line-clamp-1 mb-2">
                            {content}
                          </h4>
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {dream.analysis_text.replace(/[#*]/g, '')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400">
                아직 공개된 꿈 해몽 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
