import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | AI Dream Teller',
  description: 'AI Dream Teller 서비스 이용약관입니다.',
};

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">이용약관</h1>
      <div className="prose prose-invert max-w-none">
        {/* TODO: 이용약관 상세 내용 작성 필요 */}
        <p>서비스 이용약관 상세 내용이 들어갈 자리입니다.</p>
      </div>
    </div>
  );
};

export default TermsPage;
