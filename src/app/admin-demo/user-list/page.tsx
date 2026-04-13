'use client';

import { useState } from 'react';
import {
  Users,
  Search,
  UserCircle,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  CheckCircle2,
  XCircle,
  MoreVertical,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SAMPLE_USERS = [
  {
    id: 'u1',
    nickname: '꿈꾸는달',
    email: 'dreammoon@example.com',
    phone_number: '010-1234-5678',
    role: 'member',
    provider: 'google',
    paid_orders: 5,
    total_orders: 5,
    created_at: '2026-01-15T10:30:00Z',
  },
  {
    id: 'u2',
    nickname: '밤하늘별',
    email: 'nightstar@example.com',
    phone_number: '010-2345-6789',
    role: 'member',
    provider: 'kakao',
    paid_orders: 3,
    total_orders: 3,
    created_at: '2026-02-03T14:20:00Z',
  },
  {
    id: 'u3',
    nickname: '하늘바라기',
    email: 'sunflower@example.com',
    phone_number: '010-3456-7890',
    role: 'member',
    provider: 'google',
    paid_orders: 8,
    total_orders: 8,
    created_at: '2026-01-28T09:15:00Z',
  },
  {
    id: 'u4',
    nickname: '비회원_0301',
    email: null,
    phone_number: '010-4567-8901',
    role: 'guest',
    provider: 'guest',
    paid_orders: 1,
    total_orders: 1,
    created_at: '2026-03-01T18:45:00Z',
  },
  {
    id: 'u5',
    nickname: '몽환여행자',
    email: 'dreamtrip@example.com',
    phone_number: '010-5678-9012',
    role: 'member',
    provider: 'kakao',
    paid_orders: 12,
    total_orders: 12,
    created_at: '2025-12-20T22:00:00Z',
  },
  {
    id: 'u6',
    nickname: '비회원_0310',
    email: null,
    phone_number: '010-6789-0123',
    role: 'guest',
    provider: 'guest',
    paid_orders: 0,
    total_orders: 1,
    created_at: '2026-03-10T13:30:00Z',
  },
  {
    id: 'u7',
    nickname: '달빛요정',
    email: 'moonfairy@example.com',
    phone_number: '010-7890-1234',
    role: 'member',
    provider: 'google',
    paid_orders: 4,
    total_orders: 4,
    created_at: '2026-02-14T07:00:00Z',
  },
  {
    id: 'u8',
    nickname: '새벽이',
    email: 'dawn@example.com',
    phone_number: '010-8901-2345',
    role: 'member',
    provider: 'kakao',
    paid_orders: 2,
    total_orders: 2,
    created_at: '2026-03-05T16:20:00Z',
  },
];

export default function DemoUserListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'member' | 'guest'>('all');

  const filtered = SAMPLE_USERS.filter(u => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch = !searchTerm ||
      u.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.phone_number && u.phone_number.includes(searchTerm));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Demo banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-sm">
        <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
        <span className="text-amber-700">
          <strong>강의용 데모 페이지</strong> — 모든 데이터는 샘플입니다.
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">유저 리스트 관리</h1>
          <p className="text-muted-foreground mt-1">
            서비스에 가입된 회원 및 비회원 유저 정보를 관리합니다.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-xs">
          {(['all', 'member', 'guest'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors",
                roleFilter === role ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-100"
              )}
            >
              {role === 'all' ? '전체' : role === 'member' ? '회원' : '비회원'}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b-0 shadow-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              전체 유저 ({filtered.length}명)
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="닉네임, 이메일, 전화번호 검색"
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
                  <th className="px-6 py-3 font-medium">유저 정보</th>
                  <th className="px-6 py-3 font-medium">연락처 / 가입경로</th>
                  <th className="px-6 py-3 font-medium text-center">결제 이력</th>
                  <th className="px-6 py-3 font-medium text-center">누적 주문</th>
                  <th className="px-6 py-3 font-medium text-center">가입일</th>
                  <th className="px-6 py-3 font-medium text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.length > 0 ? (
                  filtered.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center",
                            user.role === 'member' ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-400"
                          )}>
                            <UserCircle className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                              {user.nickname}
                              <Badge variant="outline" className={cn(
                                "h-4 px-1 text-[10px]",
                                user.role === 'member' ? "border-purple-200 text-purple-600" : "border-gray-200 text-gray-500"
                              )}>
                                {user.role === 'member' ? '회원' : '비회원'}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              {user.email ? (
                                <><Mail className="w-3 h-3" /> {user.email}</>
                              ) : (
                                <span className="italic text-[10px]">이메일 정보 없음</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Phone className="w-3 h-3 text-gray-400" />
                            {user.phone_number || '-'}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CreditCard className="w-3 h-3 text-gray-400" />
                            <span className="capitalize">{user.provider}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {user.paid_orders > 0 ? (
                            <div className="flex items-center gap-1 text-green-600 font-medium text-xs">
                              <CheckCircle2 className="w-4 h-4" />
                              결제 유저
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <XCircle className="w-4 h-4" />
                              미결제
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">
                        {user.total_orders > 0 ? (
                          <span className="text-purple-600">{user.total_orders}건</span>
                        ) : (
                          <span className="text-gray-300">0건</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-300" />
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 group-hover:text-gray-600 cursor-default">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">
                      검색 조건에 맞는 유저가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t flex items-center justify-between text-xs text-gray-400">
            <p>※ 비회원 유저 데이터는 전화번호 및 임시 계정으로 식별됩니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
