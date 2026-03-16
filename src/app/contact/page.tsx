import type { Metadata } from 'next';
import { ContactClient } from '@/components/features/contact/contact-client';

export const metadata: Metadata = {
  title: '문의하기 | AI Dream Teller',
  description: '서비스 이용 중 궁금한 점이나 불편한 사항이 있으신가요? AI Dream Teller 고객센터에 문의하세요.',
};

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
