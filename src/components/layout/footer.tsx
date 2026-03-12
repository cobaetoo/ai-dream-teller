import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-background py-12 text-muted-foreground">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* 비즈니스 정보 */}
        <div className="flex flex-col gap-2 text-center md:text-left text-sm">
          <h3 className="font-semibold text-foreground text-lg mb-2">AI Dream Teller</h3>
          <p>상호명: AI 드림 컴퍼니 | 대표자: 아무개</p>
          <p>사업자등록번호: 000-00-00000 | 통신판매업신고: 제2026-서울-0000호</p>
          <p>주소: 서울특별시 신비구 환상동 몽환로 77</p>
          <p className="mt-4 text-xs opacity-60">© {new Date().getFullYear()} AI Dream Teller. All rights reserved.</p>
        </div>

        {/* 관련 링크 */}
        <div className="flex flex-col gap-2 text-center md:text-right text-sm">
          <Link href="/terms" className="hover:text-purple-400 transition-colors">이용약관</Link>
          <Link href="/privacy" className="hover:text-pink-400 transition-colors">개인정보처리방침</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">문의하기</Link>
          <p className="mt-4 text-xs">문의 메일: support@aidreamteller.com</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
