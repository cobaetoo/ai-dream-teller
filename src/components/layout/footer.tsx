import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t border-black/5 bg-background py-12 text-slate-500">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* 비즈니스 정보 */}
        <div className="flex flex-col gap-2 text-center md:text-left text-sm">
          <h3 className="font-semibold text-slate-900 text-lg mb-2">AI Dream Teller</h3>
          <p>상호명: AI 드림 컴퍼니 | 대표자: 아무개 | 고객센터: 02-123-4567</p>
          <p>사업자등록번호: 000-00-00000 | 통신판매업신고: 제2026-서울-0000호</p>
          <p>주소: 서울특별시 신비구 환상동 몽환로 77</p>
          <p>호스팅서비스 제공자: Vercel Inc. (또는 AWS)</p>
          <p className="mt-4 text-xs opacity-60">© {new Date().getFullYear()} AI Dream Teller. All rights reserved.</p>
        </div>

        {/* 관련 링크 */}
        <div className="flex flex-col gap-2 text-center md:text-right text-sm">
          <Link href="/terms" className="hover:text-purple-600 transition-colors">이용약관</Link>
          <Link href="/privacy" className="hover:text-pink-600 transition-colors">개인정보처리방침</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">문의하기</Link>
          <Link href="/admin-demo" className="hover:text-amber-600 transition-colors">어드민 데모</Link>
          <p className="mt-4 text-xs">문의 메일: support@aidreamteller.com</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-black/5">
        <div className="text-[11px] text-slate-400 leading-relaxed text-center md:text-left space-y-1">
          <p>• [Disclaimer] 본 AI 드림 텔러 서비스의 해몽 분석 및 이미지는 AI 모델의 확률적 분석을 기반으로 하며, <strong className="font-semibold text-slate-600">전문의의 의학적, 신경학적 판단 및 공식적인 심리 상담을 대체할 수 없습니다.</strong></p>
          <p>• 생성된 해석결과는 자기 이해를 돕기 위한 보조적 지표 및 오락(Entertainment) 목적으로만 제공됩니다. 사용자의 실제 결정 및 행동에 대한 책임은 회사에 귀속되지 않습니다.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
