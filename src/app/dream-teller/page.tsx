import type { Metadata } from 'next';
import { DreamTellerClient } from '@/components/features/dream-teller/dream-teller-client';

export const metadata: Metadata = {
  title: 'AI Dream Teller - 꿈 해석 시작하기',
  description: '원하는 전문 분야를 선택하고 당신만의 매력적이고 심층적인 꿈 해석 리포트를 받아보세요.',
};

export default function DreamTellerPage() {
  return <DreamTellerClient />;
}
