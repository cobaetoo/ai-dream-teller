"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { Button } from '@/components/ui/button';
import { Receipt, AlertCircle, ArrowLeft, Loader2, Scissors } from 'lucide-react';
import Link from 'next/link';

// 환경 변수(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY)에서 클라이언트 키를 가져옵니다.
const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "";

export const PaymentClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get('orderId');
  
  // 상태 관리
  const [paymentWidget, setPaymentWidget] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // 실 결제 정보 상태
  const [orderInfo, setOrderInfo] = useState<{
    orderId: string;
    orderName: string;
    items: { name: string; price: number }[];
    totalPrice: number;
    customerName: string;
    customerEmail: string;
  } | null>(null);

  // 네트워크 상태 감지
  useEffect(() => {
    setIsOffline(!window.navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 1. 주문 정보 로드 (실제 백엔드 데이터 불러오기)
  useEffect(() => {
    async function fetchOrderInfo() {
      if (!orderIdFromUrl) {
        console.error("Order ID is missing in URL");
        return;
      }

      try {
        const response = await fetch(`/api/orders/${orderIdFromUrl}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "주문 정보를 불러오지 못했습니다.");
        }

        const order = result.order;
        setOrderInfo({
          orderId: order.order_number,
          orderName: `꿈 해몽 분석 (${order.expert_field})`,
          items: [
            { name: "심층 해몽 분석 서비스", price: 1500 },
            ...(order.includes_image ? [{ name: "AI 이미지 생성 추가", price: 500 }] : []),
          ],
          totalPrice: order.total_amount,
          customerName: "회원", 
          customerEmail: "",
        });
      } catch (err: any) {
        console.error(err);
        alert(err.message || "주문 정보 조회 중 오류가 발생했습니다.");
        router.push("/dream-teller");
      }
    }

    fetchOrderInfo();
  }, [orderIdFromUrl, router]);

  // 2. 토스 결제 위젯 초기화 (orderInfo가 확보된 후)
  useEffect(() => {
    if (!orderInfo || !widgetContainerRef.current) return;

    let active = true;

    async function initializeWidget() {
      try {
        setIsInitializing(true);
        const tossPayments = await loadTossPayments(CLIENT_KEY);
        
        // customerKey는 유니크해야 함 (간편결제를 위한 식별자이기도 함)
        const customerKey = `user_${Math.random().toString(36).slice(2, 11)}`;
        const widgets = tossPayments.widgets({ customerKey });
        
        if (!active || !orderInfo) return;
        
        await widgets.setAmount({
          currency: 'KRW',
          value: orderInfo.totalPrice,
        });

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

    initializeWidget();

    return () => {
      active = false;
    };
  }, [orderInfo]);

  const handlePayment = async () => {
    if (!paymentWidget || !orderInfo) return;
    
    setIsRequesting(true);
    try {
      await paymentWidget.requestPayment({
        orderId: orderInfo.orderId,
        orderName: orderInfo.orderName,
        successUrl: window.location.origin + "/payments/success",
        failUrl: window.location.origin + "/payments/fail",
      });
    } catch (error: any) {
      console.error(error);
      setIsRequesting(false);
      if (error?.code !== 'USER_CANCEL') {
        alert("결제 요청 중 오류가 발생했습니다.");
      }
    }
  };


  if (!orderInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium text-lg">주문 정보를 불러오고 있습니다...</p>
      </div>
    );
  }

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
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">{orderIdFromUrl}</span>
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
            <div id="payment-method" className={`w-full ${isOffline ? 'opacity-20 grayscale pointer-events-none' : ''}`} />
            <div id="agreement" className={`w-full mt-4 ${isOffline ? 'opacity-20 grayscale pointer-events-none' : ''}`} />

            {isOffline && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-xs z-20 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">네트워크 끊김 감지</h3>
                <p className="text-slate-600 max-w-xs">
                  현재 오프라인 상태입니다. <br/> 결제를 진행하려면 인터넷 연결을 확인해 주세요.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 border-slate-200"
                  onClick={() => window.location.reload()}
                >
                  페이지 새로고침
                </Button>
              </div>
            )}
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
              disabled={isInitializing || isRequesting || isOffline}
            >
              {isOffline ? (
                "네트워크 연결 필요"
              ) : isRequesting ? (
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
