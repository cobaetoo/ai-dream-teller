import { PaymentClient } from "@/components/features/payments/payment-client";

export const metadata = {
  title: "안전 결제 | AI Dream Teller",
  description: "AI 꿈 해몽 및 시각화 서비스 결제 페이지입니다. 안전하게 결제하세요.",
};

export default function PaymentsPage() {
  return <PaymentClient />;
}
