interface AdminOrderDetailPageProps {
  params: Promise<{ 'order-id': string }>;
}

const AdminOrderDetailPage = async ({ params }: AdminOrderDetailPageProps) => {
  const { 'order-id': orderId } = await params;

  // TODO: 해당 주문 디테일 정보 표시 및 해몽 재생성 요청 기능 구현
  // FIX: [API 연동] 상세 정보: GET /api/admin/orders/[id]
  // FIX: [API 연동] 결과 재생성: POST /api/admin/orders/[id]/regenerate
  
  return (
    <div>
      <h1>상세 주문 내역 - {orderId}</h1>
    </div>
  );
};

export default AdminOrderDetailPage;
