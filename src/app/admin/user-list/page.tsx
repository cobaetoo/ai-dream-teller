import { getAdminUsers } from '@/app/actions/admin';
import { UserListClient } from '@/components/features/admin/user-list-client';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default async function AdminUserListPage() {
  // 서버에서 초기 데이터 페치
  const initialData = await getAdminUsers();
  
  return (
    <Suspense fallback={
      <div className="w-full h-96 flex items-center justify-center bg-white rounded-xl border border-dashed">
        <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
      </div>
    }>
      <UserListClient 
        initialUsers={initialData.data ?? []} 
        initialCount={initialData.count ?? 0} 
      />
    </Suspense>
  );
}
