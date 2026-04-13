import { redirect } from "next/navigation";
import { confirmPaymentAction } from "@/app/actions/payment";

interface SuccessPageProps {
  searchParams: Promise<{
    paymentKey?: string;
    orderId?: string;
    amount?: string;
  }>;
}

/**
 * 결제 성공 후 토스페이먼츠 리다이렉트 URL 처리 페이지
 * 서버 액션을 직접 호출하여 인증 정보를 유지한 채 결제 승인을 진행합니다.
 */
export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { paymentKey, orderId, amount } = await searchParams;

  if (!paymentKey || !orderId || !amount) {
    console.error("Missing payment parameters");
    redirect("/?error=payment_missing_params");
  }

  try {
    // 내부 API fetch 대신 서버 액션을 직접 호출함 (쿠키/세션 유지됨)
    const result = await confirmPaymentAction({
      paymentKey,
      orderId,
      amount: Number(amount),
    });

    if (!result.success) {
      console.error("Payment confirmation failed:", result.error);
      redirect(
        `/?error=payment_confirm_failed&message=${encodeURIComponent(
          result.error || "unknown"
        )}`
      );
    }

    // [강의용 데모] 결제 성공 시 샘플 해석 페이지로 리다이렉트
    redirect("/dream-result/sample");
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Critical error in payment success flow:", error);
    redirect("/?error=internal_server_error_at_success");
  }
}

