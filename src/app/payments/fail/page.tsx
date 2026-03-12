"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

function FailContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "결제 중 오류가 발생했습니다.";
  const code = searchParams.get("code") || "UNKNOWN_ERROR";

  return (
    <div className="text-center max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-900">결제 실패</h1>
      <p className="text-slate-600 mb-2">{message}</p>
      <p className="text-sm text-slate-400 mb-8 font-mono">에러 코드: {code}</p>
      <Link href="/payments">
        <Button size="lg" className="w-full">
          결제 페이지로 돌아가기
        </Button>
      </Link>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <FailContent />
      </Suspense>
    </div>
  );
}
