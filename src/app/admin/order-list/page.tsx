'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  User, 
  Calendar, 
  CreditCard 
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

// TODO: 결제 완료된 주문 건 확인 리스트 테이블 구현
// FIX: [API 연동] GET /api/admin/orders 연동 (페이지네이션/필터 포함)

// --- 시작: DUMMY DATA --- //
const DUMMY_ORDERS = [
  {
    id: 'ord_12345678',
    userNickname: '꿈꾸는나그네',
    userEmail: 'dreamer@example.com',
    userType: 'member',
    expertField: 'jung',
    expertName: '칼 융',
    totalAmount: 2000,
    paymentStatus: 'paid',
    createdAt: '2024-03-23 14:20:10',
    includesImage: true,
  },
  {
    id: 'ord_87654321',
    userNickname: '010-1234-5678',
    userEmail: null,
    userType: 'guest',
    expertField: 'freud',
    expertName: '프로이트',
    totalAmount: 1500,
    paymentStatus: 'paid',
    createdAt: '2024-03-23 13:05:45',
    includesImage: false,
  },
  {
    id: 'ord_99998888',
    userNickname: '새벽감성',
    userEmail: 'dawn@kakao.com',
    userType: 'member',
    expertField: 'neuroscience',
    expertName: '신경과학',
    totalAmount: 2000,
    paymentStatus: 'paid',
    createdAt: '2024-03-22 22:15:30',
    includesImage: true,
  },
  {
    id: 'ord_55554444',
    userNickname: '010-9876-5432',
    userEmail: null,
    userType: 'guest',
    expertField: 'gestalt',
    expertName: '게슈탈트',
    totalAmount: 1500,
    paymentStatus: 'failed',
    createdAt: '2024-03-22 19:40:12',
    includesImage: false,
  },
  {
    id: 'ord_11112222',
    userNickname: '행복한꿈',
    userEmail: 'happy@gmail.com',
    userType: 'member',
    expertField: 'jung',
    expertName: '칼 융',
    totalAmount: 2000,
    paymentStatus: 'paid',
    createdAt: '2024-03-22 10:20:05',
    includesImage: true,
  },
];
// --- 끝: DUMMY DATA --- //

const AdminOrderListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = DUMMY_ORDERS.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userNickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              전체 주문 ({filteredOrders.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="주문번호 또는 닉네임 검색"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" title="필터">
                <Filter className="h-4 w-4" />
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
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{order.id}</div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {order.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-7 h-7 rounded-full flex items-center justify-center text-xs",
                            order.userType === 'member' ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-600"
                          )}>
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-1.5">
                              {order.userNickname}
                              <Badge variant="outline" className="h-4 px-1 text-[10px]">
                                {order.userType === 'member' ? '회원' : '비회원'}
                              </Badge>
                            </div>
                            {order.userEmail && (
                              <div className="text-xs text-gray-400">{order.userEmail}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-none">
                          {order.expertName}
                        </Badge>
                        {order.includesImage && (
                          <div className="text-[10px] text-pink-500 font-medium mt-1">+ AI 이미지</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {order.totalAmount.toLocaleString()}원
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge 
                          variant={order.paymentStatus === 'paid' ? 'default' : 'destructive'}
                          className={cn(
                            order.paymentStatus === 'paid' ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : ""
                          )}
                        >
                          {order.paymentStatus === 'paid' ? '결제완료' : '결제실패'}
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
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* 하단 페이지네이션 (디자인용 Mock) */}
          <div className="p-4 border-t flex items-center justify-between text-sm text-gray-500">
            <span>총 {filteredOrders.length}개 중 1-5 표시</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>이전</Button>
              <Button variant="outline" size="sm" disabled>다음</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrderListPage;
