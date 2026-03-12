"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { Button } from '@/components/ui/button';
import { Receipt, AlertCircle, ArrowLeft, Loader2, Scissors } from 'lucide-react';
import Link from 'next/link';

// 환경 변수(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY)에서 클라이언트 키를 가져옵니다.
const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "";

export const PaymentClient = () => {
  const router = useRouter();
  
  // 상태 관리
  const [paymentWidget, setPaymentWidget] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // 영수증 디자인에 표시할 목업 데이터 (추후 이전 페이지에서 넘겨받은 상태로 대체)
  const orderInfo = {
    orderId: `dream_test_${Math.floor(Math.random() * 1000000)}`,
    orderName: "심층 꿈 분석 및 AI 시각화",
    items: [
      { name: "전문 심층 해몽 (기본)", price: 1500 },
      { name: "AI 꿈 시각화 이미지 추가", price: 500 },
    ],
    totalPrice: 2000,
    customerName: "비회원(게스트)",
    customerEmail: "guest@example.com",
  };

  useEffect(() => {
    let active = true;

    async function initializeWidget() {
      try {
        setIsInitializing(true);
        // SDK 로드
        const tossPayments = await loadTossPayments(CLIENT_KEY);
        
        // 위젯 인스턴스 생성
        // 비회원 결제를 가정하여 임의의 customerKey (혹은 ANONYMOUS 식별자)를 사용
        const widgets = tossPayments.widgets({ customerKey: `guest_${new Date().getTime()}` });
        
        if (!active) return;
        
        // 위젯 금액 설정
        await widgets.setAmount({
          currency: 'KRW',
          value: orderInfo.totalPrice,
        });

        // 위젯 렌더링 병렬 처리
        await Promise.all([
          widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          }),
          widgets.renderAgreement({ 
            selector: "#agreement", 
            variantKey: "AGREEMENT" 
          }),
        ]);

        if (active) {
          setPaymentWidget(widgets);
          setIsInitializing(false);
        }
      } catch (error) {
        console.error("위젯 초기화 중 오류 발생:", error);
        setIsInitializing(false);
      }
    }

    if (widgetContainerRef.current) {
      initializeWidget();
    }

    return () => {
      active = false;
    };
  }, [orderInfo.totalPrice]);

  const handlePayment = async () => {
    if (!paymentWidget) return;
    
    setIsRequesting(true);
    try {
      // 결제 요청
      // 성공 시 /success 로 이동, 실패 시 /fail 로 이동 (혹은 뒤로 돌아오도록)
      await paymentWidget.requestPayment({
        orderId: orderInfo.orderId,
        orderName: orderInfo.orderName,
        successUrl: window.location.origin + "/payments/success",
        failUrl: window.location.origin + "/payments/fail",
        customerEmail: orderInfo.customerEmail,
        customerName: orderInfo.customerName,
      });
    } catch (error: any) {
      // 에러 발생 시 처리
      console.error(error);
      setIsRequesting(false);
      // 토스페이먼츠 에러 코드가 USER_CANCEL인 경우 유저가 창을 닫은 것
      if (error?.code !== 'USER_CANCEL') {
        alert("결제 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-background relative selection:bg-purple-200">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-200/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-50 hidden md:block" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-200/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply opacity-50 hidden md:block" />

      <div className="max-w-4xl mx-auto py-12 px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 영수증 형태의 주문 요약 */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="w-full max-w-md relative">
            {/* 영수증 종이 느낌 */}
            <div className="bg-white rounded-t-2xl px-8 pt-10 pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
              <div className="absolute top-0 inset-x-0 flex justify-center -mt-6">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center shadow-inner border border-purple-100">
                  <Receipt className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              
              <div className="text-center mb-8 mt-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">주문 접수증</h2>
                <p className="text-sm text-slate-500 mt-1">{new Date().toLocaleDateString('ko-KR')}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span>주문 번호</span>
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">{orderInfo.orderId}</span>
                </div>
                
                <div className="border-t border-dashed border-slate-300 my-4" />
                
                <div className="space-y-3">
                  {orderInfo.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="font-medium text-slate-900">{item.price.toLocaleString()}원</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-slate-300 my-4" />

                <div className="flex justify-between items-end pt-2">
                  <span className="text-base font-semibold text-slate-800">최종 결제 금액</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                    {orderInfo.totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
            
            {/* 영수증 하단 톱니(가위) 모양 장식 */}
            <div className="relative h-4 overflow-hidden -mt-px opacity-100 z-10 w-full flex">
              {/* CSS 바탕으로 톱니모양 구현 */}
              <div className="w-full h-full bg-white mask-[radial-gradient(4px_at_50%_0%,transparent_100%,#fff_100%)] mask-size-[12px_10px] mask-repeat-x" />
            </div>
            
            <div className="flex items-center justify-center mt-6 text-slate-400 gap-2">
              <Scissors className="w-4 h-4" />
              <div className="w-full border-t border-dashed border-slate-300" />
            </div>
            
            {/* 내역 수정하기 바로가기 */}
            <div className="mt-6 text-center">
              <Link href="/dream-teller" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                선택 내역 수정하러 돌아가기
              </Link>
            </div>
          </div>
        </div>

        {/* Right: 토스페이먼츠 위젯 */}
        <div className="lg:col-span-7 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-10" ref={widgetContainerRef}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">결제 수단 선택</h2>
            <p className="text-slate-500 mt-2">안전하고 간편하게 결제를 진행하세요.</p>
          </div>

          <div className="relative min-h-[400px]">
            {isInitializing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-xl">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
                <p className="text-slate-600 font-medium">안전한 결제 환경을 준비하고 있습니다...</p>
              </div>
            )}
            
            {/* 결제 위젯 렌더링 영역 */}
            <div id="payment-method" className="w-full" />
            <div id="agreement" className="w-full mt-4" />
          </div>

          {/* 환불 규정 및 안내 */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-4 flex gap-3 text-sm text-slate-600">
            <AlertCircle className="w-5 h-5 text-slate-400 shrink-0" />
            <p>
              결제 완료 후 즉시 AI 분석이 시작되므로 <strong className="font-semibold text-slate-800">단순 변심에 의한 환불 및 취소가 불가</strong>합니다. 진행 상황에서 에러가 발생한 경우에는 전액 환불 처리됩니다.
            </p>
          </div>

          {/* 결제하기 버튼 */}
          <div className="mt-8">
            <Button 
              size="lg" 
              className="w-full h-16 text-lg rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePayment}
              disabled={isInitializing || isRequesting}
            >
              {isRequesting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  결제 요청 중...
                </span>
              ) : (
                `총 ${orderInfo.totalPrice.toLocaleString()}원 안전하게 결제하기`
              )}
            </Button>
          </div>

        </div>
      </div>
    </main>
  );
};
