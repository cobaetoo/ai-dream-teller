import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: '이용약관 | AI Dream Teller',
  description: 'AI Dream Teller 서비스 이용을 위한 약관 및 규정 안내입니다.',
};

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-purple-600 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          메인으로 돌아가기
        </Link>
        
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">서비스 이용약관</h1>
              <p className="text-slate-400 text-sm mt-1">최종 수정일: 2026년 3월 12일</p>
            </div>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
              <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">
                주요 안내 사항
                <span className="block normal-case font-normal mt-1 text-slate-600">
                  AI Dream Teller는 인공지능 기술을 활용하여 사용자의 꿈을 분석하고 이미지를 생성하는 서비스를 제공합니다. 본 약관은 서비스 이용 중 발생하는 권리와 의무를 규정합니다.
                </span>
              </p>
            </div>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                제 1 조 (목적)
              </h2>
              <p>
                본 약관은 "AI Dream Teller Company"(이하 "회사")가 운영하는 "AI Dream Teller"(이하 "서비스")를 통해 제공하는 유료 및 무료 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                제 2 조 (이용계약의 체결)
              </h2>
              <p>
                1. 이용계약은 이용자가 본 약관의 내용에 동의하고, 회사가 정한 절차에 따라 가입하거나 서비스를 결제할 때 체결됩니다.<br />
                2. 회사는 기술적, 사업적 이유로 이용 신청을 승낙하지 않거나 보류할 수 있으며, 타인의 정보를 도용한 경우 서비스 이용이 제한될 수 있습니다.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                제 3 조 (결제 및 환불 규정)
              </h2>
              <div className="space-y-4">
                <p>
                  1. 서비스는 유료 기능(심층 해몽, AI 이미지 생성)을 포함하고 있으며, 명시된 금액을 사전 결제한 후 이용할 수 있습니다.
                </p>
                <div className="font-semibold text-slate-900 bg-red-50 p-5 rounded-2xl border border-red-100 space-y-2">
                  <p className="text-red-700 underline">2. 환불 불가 원칙 (디지털 콘텐츠 특약)</p>
                  <p className="text-sm font-normal text-slate-600">
                    인공지능 분석 및 이미지 생성 서비스는 결제 시점부터 즉시 컴퓨팅 리소스가 소모되는 특성이 있습니다. 따라서 **분석이 시작된 이후에는 단순 변심으로 인한 환불이 절대 불가능합니다.** 이용자는 결제 전 이 점을 충분히 숙지하시기 바랍니다.
                  </p>
                </div>
                <p>
                  3. 결제 후 24시간 이내에 시스템 오류로 인해 결과물이 생성되지 않거나, 비정상적인 결과(공백 등)가 제공된 경우 고객센터를 통해 확인 후 전액 환불을 받으실 수 있습니다.
                </p>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                제 4 조 (콘텐츠 저작권 및 소유권)
              </h2>
              <p>
                1. AI가 생성한 해몽 텍스트 및 시각화 이미지의 저작권은 회사에 귀속됩니다.<br />
                2. 이용자는 본인이 결제한 결과물을 개인적인 용도로 무제한 복제, 저장 및 SNS 공유를 할 수 있습니다.<br />
                3. 다만, 결과물을 상업 목적으로 재판매하거나 무단으로 서비스 전체를 복제하여 경쟁 서비스를 만드는 등의 행위는 법적 제재를 받을 수 있습니다.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                제 5 조 (책임의 한계)
              </h2>
              <p>
                1. AI Dream Teller의 분석 결과는 AI 모델이 학습한 데이터를 기반으로 한 확률적인 해석일 뿐, **의학적, 심리 치료적 진단을 대체할 수 없습니다.**<br />
                2. 회사는 사용자의 꿈 분석 결과를 실제 삶에 적용함에 따라 발생하는 결과에 대해 어떠한 직접적인 책임도 지지 않습니다.
              </p>
            </section>

            <section className="space-y-4 pt-10 border-t border-slate-100">
              <p className="text-sm text-slate-400">
                시행일자: 2026년 3월 10일
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

