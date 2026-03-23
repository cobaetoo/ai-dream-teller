import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { DollarSign, Activity, Users, CreditCard } from 'lucide-react';

// TODO: 기간별 매출 조회 대시보드(기본 화면)
// FIX: [API 연동] GET /api/admin/metrics 연동

// --- 시작: DUMMY DATA --- //
const METRICS_SUMMARY = {
  totalRevenue: 3450000,
  revenueGrowth: 15.2,
  totalOrders: 2310,
  ordersGrowth: 10.1,
  totalUsers: 840,
  usersGrowth: 5.4,
  aiUsage: 1940,
  aiUsageGrowth: 12.5,
};

const MONTHLY_REVENUE = [
  { month: '8월', value: 800000 },
  { month: '9월', value: 1200000 },
  { month: '10월', value: 1050000 },
  { month: '11월', value: 2100000 },
  { month: '12월', value: 1800000 },
  { month: '1월', value: 2400000 },
  { month: '2월', value: 3200000 },
  { month: '3월', value: 3450000 },
];
// --- 끝: DUMMY DATA --- //

const AdminDashboardPage = () => {
  // 차트를 위한 최대 및 상대 높이 계산
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((d) => d.value));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground mt-1">
          현재 서비스의 전반적인 매출 및 활동 요약입니다.
        </p>
      </div>

      {/* 요약 카드 섹션 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 shadow-none border-b-0 space-y-0">
            <CardTitle className="text-sm font-medium">총 매출액</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {METRICS_SUMMARY.totalRevenue.toLocaleString()}원
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+{METRICS_SUMMARY.revenueGrowth}%</span> 지난 달 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 shadow-none border-b-0 space-y-0">
            <CardTitle className="text-sm font-medium">총 주문 수</CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{METRICS_SUMMARY.totalOrders.toLocaleString()}건
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+{METRICS_SUMMARY.ordersGrowth}%</span> 지난 달 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 shadow-none border-b-0 space-y-0">
            <CardTitle className="text-sm font-medium">신규 유저 수 (비회원 포함)</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{METRICS_SUMMARY.totalUsers.toLocaleString()}명
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+{METRICS_SUMMARY.usersGrowth}%</span> 지난 달 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 shadow-none border-b-0 space-y-0">
            <CardTitle className="text-sm font-medium">누적 AI 해석 건수</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{METRICS_SUMMARY.aiUsage.toLocaleString()}건
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+{METRICS_SUMMARY.aiUsageGrowth}%</span> 지난 달 대비
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 매출 차트 섹션 */}
      <Card className="col-span-4 h-full">
        <CardHeader>
          <CardTitle>기간별 매출 추이</CardTitle>
          <CardDescription>
            근 8개월 간의 월별 매출 합계입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 h-[300px] w-full flex items-end justify-between gap-2 px-2 pb-6 border-b relative">
            {/* Y축 그리드 라인 (시각적 장식) */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-dashed border-gray-200"></div>
              ))}
            </div>

            {/* X축 차트 바 */}
            {MONTHLY_REVENUE.map((data) => {
              const heightPercent = (data.value / maxRevenue) * 100;
              return (
                <div 
                  key={data.month} 
                  className="flex flex-col items-center justify-end flex-1 h-full z-10 group relative"
                >
                  {/* Hover 툴팁 */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                    {data.value.toLocaleString()}원
                  </div>
                  
                  {/* 바(막대) */}
                  <div 
                    className="w-full max-w-[40px] bg-linear-to-t from-purple-500 to-pink-400 rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  />
                  {/* X축 레이블 */}
                  <div className="absolute -bottom-6 text-xs text-muted-foreground whitespace-nowrap">
                    {data.month}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
