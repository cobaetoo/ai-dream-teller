import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { DollarSign, Activity, Users, CreditCard, GraduationCap } from 'lucide-react';

const DemoAdminDashboardPage = () => {
  const METRICS_SUMMARY = {
    totalRevenue: 12540000,
    revenueGrowth: 15.2,
    totalOrders: 1248,
    ordersGrowth: 8.5,
    totalUsers: 8420,
    usersGrowth: 12.4,
    aiUsage: 3421,
    aiUsageGrowth: 18.2,
  };

  const MONTHLY_REVENUE = [
    { month: "9월", value: 850000 },
    { month: "10월", value: 920000 },
    { month: "11월", value: 1100000 },
    { month: "12월", value: 1350000 },
    { month: "1월", value: 1200000 },
    { month: "2월", value: 1580000 },
    { month: "3월", value: 1820000 },
    { month: "4월", value: 2100000 },
  ];

  const maxRevenue = MONTHLY_REVENUE.length > 0
    ? Math.max(...MONTHLY_REVENUE.map((d) => d.value))
    : 1;

  const trendPoints = MONTHLY_REVENUE.map((d, i) => ({
    x: ((i + 0.5) / MONTHLY_REVENUE.length) * 100,
    y: maxRevenue > 0 ? (1 - d.value / maxRevenue) * 90 + 5 : 95,
  }));

  const linePath = trendPoints.length > 0
    ? `M ${trendPoints[0].x} ${trendPoints[0].y} ` + trendPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : "";

  const areaPath = linePath
    ? `${linePath} L ${trendPoints[trendPoints.length - 1].x} 100 L ${trendPoints[0].x} 100 Z`
    : "";

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
              <span className="text-green-500 font-medium">
                +{METRICS_SUMMARY.revenueGrowth}%
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
              <span className="text-green-500 font-medium">
                +{METRICS_SUMMARY.ordersGrowth}%
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
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-dashed border-gray-200"></div>
              ))}
            </div>

            <svg
              className="absolute inset-0 w-full pointer-events-none z-20"
              style={{ height: 'calc(100% - 24px)' }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="demoTrendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {areaPath && (
                <path d={areaPath} fill="url(#demoTrendGradient)" />
              )}
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

            {MONTHLY_REVENUE.map((data) => {
              const heightPercent = maxRevenue > 0 ? (data.value / maxRevenue) * 100 : 0;
              return (
                <div
                  key={data.month}
                  className="flex flex-col items-center justify-end flex-1 h-full z-10 group relative"
                >
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                    {data.value.toLocaleString()}원
                  </div>
                  <div
                    className="w-full max-w-[40px] bg-linear-to-t from-purple-500 to-pink-400 rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  />
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

export default DemoAdminDashboardPage;
