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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 어젯밤 꿈, 아직 기억나시나요?',
  description:
    '프로이트부터 신경과학까지 4가지 전문 관점으로 AI가 당신의 꿈을 분석합니다. 3분 안에 당신만의 꿈 해석 리포트를 받아보세요.',
};

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        {/* 배경 오로라 효과 - 몽환적이고 은은한 분위기 연출 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none opacity-50 animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-pink-400/30 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-multiply animate-pulse [animation-delay:1s]" />
        <div className="absolute top-2/3 right-1/3 w-[600px] h-[600px] bg-sky-300/30 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-multiply animate-pulse [animation-delay:2s]" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* 뱃지 - 서비스 핵심 키워드 한눈에 전달 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-black/5 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-slate-800">
              AI 기반 전문 꿈 해석 서비스
            </span>
          </div>

          {/* H1 - PRD 기획: "어젯밤 꿈, 아직 기억나시나요?" */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-slate-900">
            어젯밤{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-500 to-sky-500">
              꿈
            </span>
            ,
            <br />
            아직 기억나시나요?
          </h1>

          {/* Sub-text - PRD 기획: 전문성 + AI + 편리함 + 결과물 전달 */}
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            프로이트부터 신경과학까지, 4가지 전문 관점으로 AI가 당신의 꿈을
            분석합니다.
            <br className="hidden md:block" />
            어젯밤 꿈을 적으면, 3분 안에 당신만의 꿈 해석 리포트가 완성됩니다.
          </p>

          {/* CTA - PRD 기획: "내 꿈 해석 시작하기" */}
          <div className="pt-4">
            <Link href="/dream-teller">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_30px_rgba(168,85,247,0.4)] transition-all group cursor-pointer"
              >
                내 꿈 해석 시작하기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
            {/* Card 1 (Main/Large) - 전문 관점 선택 */}
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

            {/* Card 2 - AI 심층 분석 */}
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

            {/* Card 3 - AI 꿈 시각화 */}
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

            {/* Card 4 (Wide) - 기록 & 공유 */}
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
            {/* 더미 카드 1 - 이미지 포함 */}
            <Link
              href="/dream-result/dummy-1"
              className="block group cursor-pointer"
            >
              <div className="rounded-2xl bg-white border border-black/5 shadow-xs overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                <div className="aspect-video w-full bg-linear-to-br from-indigo-200 to-purple-200 relative">
                  <div className="absolute inset-0 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                      칼 융 기반
                    </span>
                    <span className="text-xs text-slate-500">2시간 전</span>
                  </div>
                  <h4 className="font-semibold text-lg text-slate-900 line-clamp-1 mb-2">
                    하늘을 나는 고래를 본 꿈
                  </h4>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    당신이 마주한 고래는 거대한 무의식의 흐름을 상징합니다.
                    현재 겪고 있는 감정적 변화에 순응하라는 무의식의
                    메시지로 해석될 수 있습니다...
                  </p>
                </div>
              </div>
            </Link>

            {/* 더미 카드 2 - 텍스트 전용 */}
            <Link
              href="/dream-result/dummy-2"
              className="block group cursor-pointer"
            >
              <div className="rounded-2xl bg-white border border-black/5 shadow-xs overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700">
                        프로이트 기반
                      </span>
                      <span className="text-xs text-slate-500">5시간 전</span>
                    </div>
                    <h4 className="font-semibold text-lg text-slate-900 line-clamp-1 mb-2">
                      끝없이 이어지는 계단
                    </h4>
                    <p className="text-sm text-slate-600 line-clamp-4">
                      계단을 끊임없이 내려가는 꿈은 내면 깊은 곳으로
                      침잠하려는 욕구를 나타냅니다. 억압된 감정이나 피하고
                      싶었던 과거의 기억이 표면으로 드러나기 위한 준비
                      과정입니다.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* 더미 카드 3 - 이미지 포함 */}
            <Link
              href="/dream-result/dummy-3"
              className="block group cursor-pointer"
            >
              <div className="rounded-2xl bg-white border border-black/5 shadow-xs overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                <div className="aspect-video w-full bg-linear-to-br from-sky-200 to-blue-200 relative">
                  <div className="absolute inset-0 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-sky-100 text-sky-700">
                      신경과학 기반
                    </span>
                    <span className="text-xs text-slate-500">1일 전</span>
                  </div>
                  <h4 className="font-semibold text-lg text-slate-900 line-clamp-1 mb-2">
                    거울 속에 비친 낯선 나
                  </h4>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    최근 극심한 스트레스로 인해 뇌의 특정 부분에서 기억
                    체계가 강하게 활성화되며 발현된 이미지입니다...
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
