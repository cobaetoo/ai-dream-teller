'use client';

import { useState, useEffect, useCallback } from 'react';
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
  ImageIcon as LucideImageIcon,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { getAdminOrderDetail, regenerateAdminOrderResult } from '@/app/actions/admin';

const OrderDetailContainer = ({ orderId }: { orderId: string }) => {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const json = await getAdminOrderDetail(orderId);
      if (json.success) {
        setOrder(json.data);
      } else {
        throw new Error(`[Server Action] ${json.error}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);

  const handleRegenerate = async () => {
    if (!confirm('AI 해몽 결과를 재생성하시겠습니까? 기존 결과는 덮어씌워집니다.')) return;
    
    try {
      setIsRegenerating(true);
      // Client-side fetch 대신 Server Action 사용 (미들웨어 401 이슈 해결)
      const json = await regenerateAdminOrderResult(orderId, window.location.origin);
      
      if (json.success) {
        alert('재생성 요청이 성공적으로 전송되었습니다.');
        fetchOrderDetail();
      } else {
        throw new Error(json.error || 'Failed to regenerate');
      }
    } catch (err: any) {
      alert(`에러: ${err.message}`);
    } finally {
      setIsRegenerating(false);
    }
  };

  const getExpertName = (field: string) => {
    const fields: Record<string, string> = {
      freud: '프로이트',
      jung: '칼 융',
      neuroscience: '신경과학',
      gestalt: '게슈탈트'
    };
    return fields[field] || field;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
        <p className="text-muted-foreground">주문 상세 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
        <p className="text-destructive font-medium">{error || '주문을 찾을 수 없습니다.'}</p>
        <Link href="/admin/order-list">
          <Button variant="outline">목록으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  // dream_results가 배열(one-to-many) 또는 단일 객체(unique FK)로 반환될 수 있으므로 안전하게 처리
  const dreamResult = Array.isArray(order.dream_results)
    ? order.dream_results[0]
    : order.dream_results;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/order-list">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">상세 주문 내역</h1>
            <p className="text-sm text-muted-foreground">{order.order_number}</p>
          </div>
        </div>
        <Button 
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
        >
          {isRegenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
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
                  <span className="text-sm font-semibold">{order.users?.nickname || '-'}</span>
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                    {order.users?.role === 'member' ? '회원' : '비회원'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">이메일</span>
                <span className="text-sm flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {order.users?.email || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">연락처</span>
                <span className="text-sm flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {order.users?.phone_number || '-'}
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
                    order.payment_status === 'paid' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"
                  )}
                >
                  {order.payment_status === 'paid' ? '결제완료' : '결제실패'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">결제 금액</span>
                <span className="text-base font-bold text-purple-700">{order.total_amount.toLocaleString()}원</span>
              </div>
              <div className="pt-2 border-t space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">주문 번호</span>
                  <span className="text-gray-600 font-mono">{order.order_number}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">승인 일시</span>
                  <span className="text-gray-600 font-mono">{new Date(order.created_at).toLocaleString()}</span>
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
                  {getExpertName(order.expert_field)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed italic border-l-4 border-purple-300 whitespace-pre-wrap">
                "{order.dream_content}"
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
                  {dreamResult?.analysis_status === 'completed' ? (
                    <Badge className="bg-green-500 hover:bg-green-500">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      정상 생성됨
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="animate-pulse">
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      생성 중...
                    </Badge>
                  ) }
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              {/* 해몽 텍스트 */}
              <div className="prose prose-sm max-w-none prose-purple bg-white border border-gray-100 p-6 rounded-xl shadow-xs whitespace-pre-wrap">
                {dreamResult?.analysis_text || '분석된 결과가 없습니다.'}
              </div>

              {/* AI 이미지 */}
              {order.includes_image && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <LucideImageIcon className="w-4 h-4 text-pink-500" />
                    AI 생성 꿈 이미지
                  </div>
                  {dreamResult?.image_url ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border">
                      <Image 
                        src={dreamResult.image_url} 
                        alt="AI Generated Dream" 
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 800px"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gray-50 flex flex-col items-center justify-center rounded-xl border border-dashed text-gray-400 gap-2">
                      <AlertCircle className="w-6 h-6" />
                      <p className="text-xs">이미지 생성 중이거나 결과가 없습니다.</p>
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
