import { getAdminOrders } from '@/app/actions/admin';
import { OrderListClient } from '@/components/features/admin/order-list-client';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default async function AdminOrderListPage() {
  // 서버에서 초기 데이터 페치
  const initialData = await getAdminOrders();
  
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">주문 내역 리스트</h1>
        <p className="text-muted-foreground mt-1">
          결제 완료된 모든 주문 건을 확인하고 관리합니다.
        </p>
      </div>

      <Suspense fallback={
        <div className="w-full h-64 flex items-center justify-center bg-white rounded-xl border border-dashed">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
        </div>
      }>
        <OrderListClient 
          initialOrders={initialData.data ?? []} 
          initialCount={initialData.count ?? 0} 
        />
      </Suspense>
    </div>
  );
}
