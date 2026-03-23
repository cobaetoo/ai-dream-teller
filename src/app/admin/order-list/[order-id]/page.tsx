import OrderDetailContainer from '@/components/features/admin/order-detail-container';

interface AdminOrderDetailPageProps {
  params: Promise<{ 'order-id': string }>;
}

const AdminOrderDetailPage = async ({ params }: AdminOrderDetailPageProps) => {
  const { 'order-id': orderId } = await params;

  return (
    <OrderDetailContainer orderId={orderId} />
  );
};

export default AdminOrderDetailPage;
