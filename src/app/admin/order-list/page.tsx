'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  User, 
  Calendar, 
  CreditCard,
  Loader2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAdminOrders } from '@/app/actions/admin';

const AdminOrderListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const json = await getAdminOrders(searchTerm);
      if (json.success) {
        setOrders(json.data || []);
      } else {
        throw new Error(`[Server Action] ${json.error}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getExpertName = (field: string) => {
    const fields: Record<string, string> = {
      freud: '프로이트',
      jung: '칼 융',
      neuroscience: '신경과학',
      gestalt: '게슈탈트'
    };
    return fields[field] || field;
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">주문 내역 리스트</h1>
        <p className="text-muted-foreground mt-1">
          결제 완료된 모든 주문 건을 확인하고 관리합니다.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b-0 shadow-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              전체 주문 ({orders.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="주문번호 검색"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" title="다시 로드" onClick={() => fetchOrders()}>
                <RotateCcw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-y">
                <tr>
                  <th className="px-6 py-3 font-medium">주문 정보</th>
                  <th className="px-6 py-3 font-medium">구매자</th>
                  <th className="px-6 py-3 font-medium text-center">전문 분야</th>
                  <th className="px-6 py-3 font-medium text-right">결제 금액</th>
                  <th className="px-6 py-3 font-medium text-center">상태</th>
                  <th className="px-6 py-3 font-medium text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        주문 내역을 불러오는 중...
                      </div>
                    </td>
                  </tr>
                ) : orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 truncate max-w-[150px]" title={order.order_number}>
                          {order.order_number}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center text-xs",
                            order.users?.role === 'member' ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-600"
                          )}>
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-1.5">
                              {order.users?.nickname || '알 수 없음'}
                              <Badge variant="outline" className="h-4 px-1 text-[10px]">
                                {order.users?.role === 'admin' ? '관리자' : (order.users?.role === 'member' ? '회원' : '비회원')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-none">
                          {getExpertName(order.expert_field)}
                        </Badge>
                        {order.includes_image && (
                          <div className="text-[10px] text-pink-500 font-medium mt-1">+ AI 이미지</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {order.total_amount.toLocaleString()}원
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge 
                          variant={order.payment_status === 'paid' ? 'default' : 'destructive'}
                          className={cn(
                            order.payment_status === 'paid' ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : ""
                          )}
                        >
                          {order.payment_status === 'paid' ? '결제완료' : 
                           order.payment_status === 'pending' ? '결제대기' : '결제실패'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/order-list/${order.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 group-hover:text-purple-600">
                            상세보기
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      {error ? `에러: ${error}` : '주문 내역이 없습니다.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { RotateCcw } from 'lucide-react';

export default AdminOrderListPage;
