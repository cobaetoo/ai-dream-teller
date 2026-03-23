'use client';

import Link from 'next/link';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  ImageIcon as LucideImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// TODO: 해당 주문 디테일 정보 표시 및 해몽 재생성 요청 기능 구현
// FIX: [API 연동] 상세 정보: GET /api/admin/orders/[id]
// FIX: [API 연동] 결과 재생성: POST /api/admin/orders/[id]/regenerate

// --- 시작: DUMMY DATA --- //
const DUMMY_ORDER_DETAIL = {
  id: 'ord_12345678',
  user: {
    nickname: '꿈꾸는나그네',
    email: 'dreamer@example.com',
    phone: '010-1111-2222',
    type: 'member',
  },
  payment: {
    status: 'paid',
    amount: 2000,
    orderNumber: 'PAY-12345-ABCDE',
    approvedAt: '2024-03-23 14:25:30',
  },
  dream: {
    content: "어두운 숲속을 혼자 걷고 있었는데, 갑자기 거대한 황금색 사자가 나타났어요. 사자는 무섭기보다 신비로웠고, 저에게 길을 안내해주는 듯한 느낌이 들었습니다. 멀리서 반짝이는 호수가 보였는데 그곳으로 같이 걸어갔던 것 같아요.",
    expertField: 'jung',
    expertName: '칼 융',
    includesImage: true,
  },
  result: {
    status: 'completed',
    analysisText: `## 꿈 분석 리포트 (분석 관점: 칼 융)

### 1. 전반적인 상징 해석
**황금색 사자**는 당신의 내면 깊숙한 곳에서 깨어나는 '강력한 자아' 혹은 '아니마/아니무스'의 원형적 이미지를 상징합니다. 숲이라는 무의식의 공간에서 사자가 길을 안내한다는 것은, 현재 당신이 인생의 중요한 전환점에서 직관적인 힘을 얻고 있음을 뜻합니다.

### 2. 무의식의 메시지
어두운 숲은 혼란스러운 현실을 뜻하며, 황금색은 고귀함과 완성을 상징합니다. 호수는 무의식의 정수를 뜻하므로, 이 꿈은 당신의 내적 성숙과 지혜의 근원을 찾아가는 과정을 묘사하고 있습니다.

### 3. 조언
현재 계획하고 있는 일이 있다면 자신의 직관을 믿고 나아가십시오. 당신의 내면에는 이미 답을 알고 있는 강력한 조언자가 있습니다.`,
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=2000',
    createdAt: '2024-03-23 14:28:15',
  }
};
// --- 끝: DUMMY DATA --- //

const OrderDetailContainer = ({ orderId }: { orderId: string }) => {
  const order = DUMMY_ORDER_DETAIL; // 실제 연동 시 fetching logic 필요

  const handleRegenerate = () => {
    if (confirm('AI 해몽 결과를 재생성하시겠습니까? 기존 결과는 덮어씌워집니다.')) {
      alert('재생성 요청이 전송되었습니다. (Mock)');
      // TODO: POST /api/admin/orders/[id]/regenerate 연동
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/order-list">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">상세 주문 내역</h1>
            <p className="text-sm text-muted-foreground">{orderId}</p>
          </div>
        </div>
        <Button 
          onClick={handleRegenerate}
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          LLM 해몽 재생성
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽 섹션: 주문 및 유저 정보 */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" />
                구매자 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">닉네임</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{order.user.nickname}</span>
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                    {order.user.type === 'member' ? '회원' : '비회원'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">이메일</span>
                <span className="text-sm flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {order.user.email || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">연락처</span>
                <span className="text-sm flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {order.user.phone}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-600" />
                결제 내역
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">주문 상태</span>
                <Badge 
                  className={cn(
                    "font-bold",
                    order.payment.status === 'paid' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"
                  )}
                >
                  {order.payment.status === 'paid' ? '결제완료' : '결제실패'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">결제 금액</span>
                <span className="text-base font-bold text-purple-700">{order.payment.amount.toLocaleString()}원</span>
              </div>
              <div className="pt-2 border-t space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">주문 번호</span>
                  <span className="text-gray-600 font-mono">{order.payment.orderNumber}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">승인 일시</span>
                  <span className="text-gray-600 font-mono">{order.payment.approvedAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 섹션: 꿈 내용 및 AI 결과 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  유저의 꿈 Input
                </CardTitle>
                <Badge variant="outline" className="text-purple-600 border-purple-200">
                  {order.dream.expertName}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed italic border-l-4 border-purple-300">
                "{order.dream.content}"
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardHeader className="bg-purple-50/50 rounded-t-xl border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2 text-purple-900">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI 해몽 분석 결과
                  </CardTitle>
                  <CardDescription className="text-purple-600/70">
                    LLM에 의해 생성된 최종 결과물입니다.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 hover:bg-green-500">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    정상 생성됨
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              {/* 해몽 텍스트 */}
              <div className="prose prose-sm max-w-none prose-purple bg-white border border-gray-100 p-6 rounded-xl shadow-xs">
                {order.result.analysisText.split('\n').map((line, i) => (
                  <p key={i} className="mb-2 last:mb-0">{line}</p>
                ))}
              </div>

              {/* AI 이미지 */}
              {order.dream.includesImage && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <LucideImageIcon className="w-4 h-4 text-pink-500" />
                    AI 생성 꿈 이미지
                  </div>
                  {order.result.imageUrl ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border">
                      <img 
                        src={order.result.imageUrl} 
                        alt="AI Generated Dream" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gray-50 flex flex-col items-center justify-center rounded-xl border border-dashed text-gray-400 gap-2">
                      <AlertCircle className="w-6 h-6" />
                      <p className="text-xs">이미지 생성 중이거나 오류가 발생했습니다.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailContainer;
