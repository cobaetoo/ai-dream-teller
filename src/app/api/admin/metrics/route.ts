import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";

export async function GET(req: NextRequest) {
  try {
    const supabase = createServiceRoleClient();

    // 1. 매출 정보 (결제 완료 건만)
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("id, total_amount, created_at")
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

    // (신규가입 퍼센트 같은 경우 현재 단순 더미 0%로 반환)
    const usersGrowth = 0.0;

    // 3. AI 분석 완료 건수
    const { count: aiUsage, error: aiError } = await supabase
      .from("dream_results")
      .select("*", { count: "exact", head: true })
      .eq("analysis_status", "completed");

    if (aiError) throw aiError;
    const aiUsageGrowth = 0.0; // 성장률 통계 임시 0

    // 4. 최근 8개월 월별 매출 계산 (막대 차트 용)
    const MONTHLY_REVENUE = [];
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

    // 결과 반환
    return NextResponse.json({
      success: true,
      data: {
        METRICS_SUMMARY: {
          totalRevenue,
          revenueGrowth,
          totalOrders,
          ordersGrowth,
          totalUsers: totalUsers || 0,
          usersGrowth,
          aiUsage: aiUsage || 0,
          aiUsageGrowth,
        },
        MONTHLY_REVENUE,
      },
    });
  } catch (error) {
    console.error("Admin Metrics Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load metrics data" },
      { status: 500 }
    );
  }
}
