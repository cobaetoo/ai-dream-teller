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

    // admin 계정: AI 해석을 백그라운드에서 비동기 요청 후 마이페이지로 이동
    // 일반 계정: [강의용 데모] 샘플 해석 페이지로 리다이렉트
    if (result.isAdmin && result.orderId) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      // fire-and-forget: AI 생성 완료를 기다리지 않고 즉시 리다이렉트
      fetch(`${siteUrl}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: result.orderId }),
      }).catch((aiError) => {
        console.error("AI generation failed for admin user:", aiError);
      });
      redirect("/my-page");
    } else {
      redirect("/dream-result/sample");
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Critical error in payment success flow:", error);
    redirect("/?error=internal_server_error_at_success");
  }
}

