import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 실제 로직은 미들웨어에서 보호되어야 함
  return NextResponse.json({
    success: true,
    message: "Admin Stats accessed successfully",
    data: {
      total_dreams: 1250,
      active_users: 450
    }
  });
}
