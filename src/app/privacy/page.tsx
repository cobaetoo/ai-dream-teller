import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: '개인정보처리방침 | AI Dream Teller',
  description: 'AI Dream Teller의 개인정보 수집, 이용 목적 및 관리 방침에 대한 안내입니다.',
};

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-pink-600 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          메인으로 돌아가기
        </Link>
        
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">개인정보처리방침</h1>
              <p className="text-slate-400 text-sm mt-1">최종 수정일: 2026년 3월 12일</p>
            </div>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                1. 수집하는 개인정보 항목
              </h2>
              <p>회사는 이용자의 서비스 이용을 위해 최소한의 개인정보를 수집하고 있습니다.</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" /> 회원가입 시
                  </h3>
                  <ul className="text-sm space-y-1 text-slate-500">
                    <li>• 이메일 주소</li>
                    <li>• 소셜 서비스 고유 식별자(UID)</li>
                    <li>• 프로필 닉네임</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-500" /> 주문/조회 시
                  </h3>
                  <ul className="text-sm space-y-1 text-slate-500">
                    <li>• 전화번호 (비회원 식별용)</li>
                    <li>• 주문 비밀번호 (비회원용)</li>
                    <li>• 꿈 입력 텍스트 데이터</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                2. AI 꿈 분석 데이터 처리
              </h2>
              <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100 space-y-3">
                <p className="font-semibold text-purple-900">당신의 꿈 정보는 안전하게 관리됩니다.</p>
                <p className="text-sm text-purple-800 leading-relaxed">
                  사용자가 입력한 꿈 내용은 AI 모델(Google Gemini)을 통해 분석됩니다. 
                  이때 데이터는 전송 구간 암호화(HTTPS)를 통해 보호되며, 
                  **AI 모델의 기계 학습이나 훈련 데이터로 사용되지 않도록 설정**되어 소중한 무의식의 기록을 보호합니다.
                </p>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                3. 개인정보의 이용 및 보유 기간
              </h2>
              <p>
                수집된 정보는 서비스 제공 및 정산, 고객 상담을 위해서만 사용되며, 
                이용자가 원할 경우 즉시 파기하는 것을 원칙으로 합니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-500">
                <li>계정 정보: 회원 탈퇴 시 즉시 삭제</li>
                <li>꿈 분석 결과: 회원 탈퇴 시 또는 개별 삭제 요청 시 즉시 삭제</li>
                <li>결제 기록: 전자상거래법에 따라 최대 5년간 보관</li>
              </ul>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                4. 이용자의 권리
              </h2>
              <p>
                이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 
                수집 및 이용에 대한 동의를 철회(회원 탈퇴)할 수 있습니다. 
                관련 문의는 고객센터(support@aidreamteller.com)를 통해 가능합니다.
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

export default PrivacyPage;

