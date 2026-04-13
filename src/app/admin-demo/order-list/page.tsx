'use client';

import { useState } from 'react';
import {
  ChevronRight,
  Search,
  User,
  Calendar,
  CreditCard,
  GraduationCap,
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
import { cn } from '@/lib/utils';

const SAMPLE_ORDERS = [
  {
    id: 'a1b2c3d4',
    order_number: 'ORD-20260401-ABCD',
    created_at: '2026-04-01T14:30:00Z',
    expert_field: 'jung',
    includes_image: true,
    total_amount: 2000,
    payment_status: 'paid',
    users: { nickname: '꿈꾸는달', role: 'member' },
  },
  {
    id: 'e5f6g7h8',
    order_number: 'ORD-20260330-EFGH',
    created_at: '2026-03-30T22:15:00Z',
    expert_field: 'freud',
    includes_image: false,
    total_amount: 1500,
    payment_status: 'paid',
    users: { nickname: '밤하늘별', role: 'member' },
  },
  {
    id: 'i9j0k1l2',
    order_number: 'ORD-20260328-IJKL',
    created_at: '2026-03-28T06:45:00Z',
    expert_field: 'neuroscience',
    includes_image: true,
    total_amount: 2000,
    payment_status: 'paid',
    users: { nickname: '하늘바라기', role: 'member' },
  },
  {
    id: 'm3n4o5p6',
    order_number: 'ORD-20260325-MNOP',
    created_at: '2026-03-25T19:20:00Z',
    expert_field: 'gestalt',
    includes_image: false,
    total_amount: 1500,
    payment_status: 'paid',
    users: { nickname: '비회원', role: 'guest' },
  },
  {
    id: 'q7r8s9t0',
    order_number: 'ORD-20260322-QRST',
    created_at: '2026-03-22T11:00:00Z',
    expert_field: 'jung',
    includes_image: true,
    total_amount: 2000,
    payment_status: 'paid',
    users: { nickname: '몽환여행자', role: 'member' },
  },
  {
    id: 'u1v2w3x4',
    order_number: 'ORD-20260320-UVWX',
    created_at: '2026-03-20T08:30:00Z',
    expert_field: 'freud',
    includes_image: false,
    total_amount: 1500,
    payment_status: 'paid',
    users: { nickname: '비회원', role: 'guest' },
  },
  {
    id: 'y5z6a7b8',
    order_number: 'ORD-20260318-YZAB',
    created_at: '2026-03-18T16:50:00Z',
    expert_field: 'neuroscience',
    includes_image: true,
    total_amount: 2000,
    payment_status: 'paid',
    users: { nickname: '달빛요정', role: 'member' },
  },
  {
    id: 'c9d0e1f2',
    order_number: 'ORD-20260315-CDEF',
    created_at: '2026-03-15T21:10:00Z',
    expert_field: 'jung',
    includes_image: false,
    total_amount: 1500,
    payment_status: 'paid',
    users: { nickname: '새벽이', role: 'member' },
  },
];

const getExpertName = (field: string) => {
  const fields: Record<string, string> = {
    freud: '프로이트',
    jung: '칼 융',
    neuroscience: '신경과학',
    gestalt: '게슈탈트'
  };
  return fields[field] || field;
};

export default function DemoOrderListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = searchTerm
    ? SAMPLE_ORDERS.filter(o =>
        o.order_number.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : SAMPLE_ORDERS;

  return (
    <div className="flex flex-col gap-6">
      {/* Demo banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-sm">
        <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
        <span className="text-amber-700">
          <strong>강의용 데모 페이지</strong> — 모든 데이터는 샘플입니다.
        </span>
      </div>

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
              전체 주문 ({filtered.length})
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
                {filtered.length > 0 ? (
                  filtered.map((order) => (
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
                                {order.users?.role === 'member' ? '회원' : '비회원'}
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
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground cursor-default">
                          상세보기
                          <ChevronRight className="w-4 h-4" />
                        </Button>
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
        </CardContent>
      </Card>
    </div>
  );
}
