import { createServiceRoleClient } from "@/utils/supabase/service";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { DollarSign, Activity, Users, CreditCard } from 'lucide-react';

const AdminDashboardPage = async () => {
  let METRICS_SUMMARY = {
    totalRevenue: 0,
    revenueGrowth: 0,
    totalOrders: 0,
    ordersGrowth: 0,
    totalUsers: 0,
    usersGrowth: 0,
    aiUsage: 0,
    aiUsageGrowth: 0,
  };
  let MONTHLY_REVENUE: any[] = [];
  let fetchError = null;

  try {
    /* 기존 DB 연동 로직 주석 처리 (스크린샷용 임시 데이터 사용 중)
    const supabase = createServiceRoleClient();

    // 1. 매출 정보 (결제 완료 건만)
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("total_amount, created_at")
      .eq("payment_status", "paid");

    if (ordersError) throw ordersError;

    // 현재/이전 달 식별
    const now = new Date();
    const currentMonthData = orders.filter((o) => {
      const date = new Date(o.created_at);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });

    const prevMonthData = orders.filter((o) => {
      const date = new Date(o.created_at);
      const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
    });

    // 매출 및 성과 지표 계산
    const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
    const currRevenue = currentMonthData.reduce((sum, o) => sum + o.total_amount, 0);
    const prevRevenue = prevMonthData.reduce((sum, o) => sum + o.total_amount, 0);
    const revenueGrowth = prevRevenue > 0 ? Number((((currRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1)) : 0;

    const totalOrders = orders.length;
    const currOrders = currentMonthData.length;
    const prevOrders = prevMonthData.length;
    const ordersGrowth = prevOrders > 0 ? Number((((currOrders - prevOrders) / prevOrders) * 100).toFixed(1)) : 0;

    // 2. 누적 회원 수
    const { count: totalUsers, error: usersError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    if (usersError) throw usersError;

    const usersGrowth = 0.0;

    // 3. AI 분석 완료 건수
    const { count: aiUsage, error: aiError } = await supabase
      .from("dream_results")
      .select("*", { count: "exact", head: true })
      .eq("analysis_status", "completed");

    if (aiError) throw aiError;
    const aiUsageGrowth = 0.0; 

    // 4. 최근 8개월 월별 매출 계산 (막대 차트 용)
    for (let i = 7; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const targetMonthLabel = `${targetDate.getMonth() + 1}월`;

      const monthlySum = orders
        .filter((o) => {
          const d = new Date(o.created_at);
          return d.getMonth() === targetDate.getMonth() && d.getFullYear() === targetDate.getFullYear();
        })
        .reduce((sum, o) => sum + o.total_amount, 0);

      MONTHLY_REVENUE.push({
        month: targetMonthLabel,
        value: monthlySum,
      });
    }

    METRICS_SUMMARY = {
      totalRevenue,
      revenueGrowth,
      totalOrders,
      totalUsers: totalUsers || 0,
      usersGrowth,
      aiUsage: aiUsage || 0,
      aiUsageGrowth,
    };
    */

    // --- [스크린샷용 임시 더미 데이터 시작] ---
    METRICS_SUMMARY = {
      totalRevenue: 12540000,
      revenueGrowth: 15.2,
      totalOrders: 1248,
      ordersGrowth: 8.5,
      totalUsers: 8420,
      usersGrowth: 12.4,
      aiUsage: 3421,
      aiUsageGrowth: 18.2,
    };

    MONTHLY_REVENUE = [
      { month: "9월", value: 850000 },
      { month: "10월", value: 920000 },
      { month: "11월", value: 1100000 },
      { month: "12월", value: 1350000 },
      { month: "1월", value: 1200000 },
      { month: "2월", value: 1580000 },
      { month: "3월", value: 1820000 },
      { month: "4월", value: 2100000 },
    ];
    // --- [스크린샷용 임시 더미 데이터 끝] ---

  } catch (error: any) {
    console.error("Admin dashboard query error:", error);
    fetchError = "Failed to load dashboard metrics.";
  }

  // 차트를 위한 최대 및 상대 높이 계산 (데이터가 없을 시 1 처리)
  const maxRevenue = MONTHLY_REVENUE.length > 0 
    ? Math.max(...MONTHLY_REVENUE.map((d: any) => d.value)) 
    : 1;

  // --- 추세선 SVG 경로 계산 (viewBox 0 0 100 100 퍼센트 좌표계) ---
  const trendPoints = MONTHLY_REVENUE.map((d, i) => ({
    // WHY: 각 막대의 중앙에 점을 배치하기 위해 (index + 0.5) / total * 100 사용
    x: ((i + 0.5) / MONTHLY_REVENUE.length) * 100,
    // WHY: y를 5~95 범위로 매핑하여 상하단에서 선이 잘리지 않도록 여유 확보
    y: maxRevenue > 0 ? (1 - d.value / maxRevenue) * 90 + 5 : 95,
    // 원본 퍼센트 (데이터 포인트 div 배치용)
    rawPercent: maxRevenue > 0 ? (d.value / maxRevenue) * 100 : 0,
  }));

  const linePath = trendPoints.length > 0 
    ? `M ${trendPoints[0].x} ${trendPoints[0].y} ` + trendPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : "";

  const areaPath = linePath 
    ? `${linePath} L ${trendPoints[trendPoints.length - 1].x} 100 L ${trendPoints[0].x} 100 Z`
    : "";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground mt-1">
          현재 서비스의 전반적인 매출 및 활동 요약입니다.
        </p>
      </div>

      {fetchError && (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          {fetchError}
        </div>
      )}

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
              <span className={METRICS_SUMMARY.revenueGrowth >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {METRICS_SUMMARY.revenueGrowth >= 0 ? '+' : ''}{METRICS_SUMMARY.revenueGrowth}%
              </span> 지난 달 대비
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
              {METRICS_SUMMARY.totalOrders.toLocaleString()}건
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={METRICS_SUMMARY.ordersGrowth >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {METRICS_SUMMARY.ordersGrowth >= 0 ? '+' : ''}{METRICS_SUMMARY.ordersGrowth}%
              </span> 지난 달 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 shadow-none border-b-0 space-y-0">
            <CardTitle className="text-sm font-medium">누적 유저 수 (비회원 포함)</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {METRICS_SUMMARY.totalUsers.toLocaleString()}명
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {/* 유저 성장률은 현재 고정 0% */}
              <span className="text-muted-foreground font-medium">변동사항 없음</span>
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
              {METRICS_SUMMARY.aiUsage.toLocaleString()}건
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-muted-foreground font-medium">변동사항 없음</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 매출 차트 섹션 */}
      <Card className="col-span-4 h-full">
        <CardHeader>
          <CardTitle>기간별 매출 추이</CardTitle>
          <CardDescription>
            근 8개월 간의 일 기준 월별 매출 합계입니다.
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

            {/* 추세선 (SVG Layer) - 선과 영역 그라데이션 */}
            <svg 
              className="absolute inset-0 w-full pointer-events-none z-20"
              style={{ height: 'calc(100% - 24px)' }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              
              {/* 선 아래 소프트 그라데이션 영역 */}
              {areaPath && (
                <path d={areaPath} fill="url(#trendGradient)" />
              )}
              
              {/* 추세선 */}
              {linePath && (
                <path 
                  d={linePath} 
                  fill="none" 
                  stroke="#a855f7" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>

            {/* 데이터 포인트 (별도 absolute div — SVG preserveAspectRatio='none' 찌그러짐 방지) */}
            <div className="absolute inset-0 pointer-events-none z-30" style={{ height: 'calc(100% - 24px)' }}>
              {trendPoints.map((p, i) => (
                <div
                  key={`point-${i}`}
                  className="absolute w-2.5 h-2.5 rounded-full bg-white border-2 border-purple-500 shadow-sm"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>

            {/* X축 차트 바 */}
            {MONTHLY_REVENUE.map((data: any) => {
              const heightPercent = maxRevenue > 0 ? (data.value / maxRevenue) * 100 : 0;
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
