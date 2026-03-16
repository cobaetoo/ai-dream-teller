import { PaymentClient } from "@/components/features/payments/payment-client";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "안전 결제 | AI Dream Teller",
  description: "AI 꿈 해몽 및 시각화 서비스 결제 페이지입니다. 안전하게 결제하세요.",
};

export default function PaymentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
        <p className="text-slate-500">결제 환경을 불러오는 중...</p>
      </div>
    }>
      <PaymentClient />
    </Suspense>
  );
}

