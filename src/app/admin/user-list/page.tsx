'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserCircle, 
  Mail, 
  Phone, 
  CreditCard, 
  Calendar,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Loader2,
  RotateCcw
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
import { getAdminUsers } from '@/app/actions/admin';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const AdminUserListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'member' | 'guest'>('all');
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const json = await getAdminUsers(searchTerm, roleFilter);
      if (json.success) {
        setUsers(json.data || []);
      } else {
        throw new Error(`[Server Action] ${json.error}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">유저 리스트 관리</h1>
          <p className="text-muted-foreground mt-1">
            서비스에 가입된 회원 및 비회원 유저 정보를 관리합니다.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-xs">
          <RadioGroup 
            value={roleFilter} 
            onValueChange={(val) => setRoleFilter(val as any)}
            className="flex items-center gap-0"
          >
            <div className="flex items-center">
              <RadioGroupItem value="all" id="all" className="sr-only" />
              <Label 
                htmlFor="all" 
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors",
                  roleFilter === 'all' ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-100"
                )}
              >
                전체
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="member" id="member" className="sr-only" />
              <Label 
                htmlFor="member" 
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors",
                  roleFilter === 'member' ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-100"
                )}
              >
                회원
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="guest" id="guest" className="sr-only" />
              <Label 
                htmlFor="guest" 
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors",
                  roleFilter === 'guest' ? "bg-purple-600 text-white" : "text-gray-500 hover:bg-gray-100"
                )}
              >
                비회원
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b-0 shadow-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              전체 유저 ({users.length}명)
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
              <Button variant="outline" size="icon" title="다시 로드" onClick={() => fetchUsers()}>
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
                  <th className="px-6 py-3 font-medium">유저 정보</th>
                  <th className="px-6 py-3 font-medium">연락처 / 가입경로</th>
                  <th className="px-6 py-3 font-medium text-center">결제 이력</th>
                  <th className="px-6 py-3 font-medium text-center">누적 주문</th>
                  <th className="px-6 py-3 font-medium text-center">가입일</th>
                  <th className="px-6 py-3 font-medium text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        유저 목록을 불러오는 중...
                      </div>
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
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
                                user.role === 'member' ? "border-purple-200 text-purple-600" : (user.role === 'admin' ? "border-red-200 text-red-600" : "border-gray-200 text-gray-500")
                              )}>
                                {user.role === 'admin' ? '관리자' : (user.role === 'member' ? '회원' : '비회원')}
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
                            <span className="capitalize">{user.provider || 'guest'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {user.has_paid ? (
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
                        {user.order_count > 0 ? (
                          <span className="text-purple-600">{user.order_count}건</span>
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
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 group-hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">
                      {error ? `에러: ${error}` : '검색 조건에 맞는 유저가 없습니다.'}
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
};

export default AdminUserListPage;
