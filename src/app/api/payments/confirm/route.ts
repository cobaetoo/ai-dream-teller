import { NextRequest, NextResponse } from "next/server";
import { confirmPaymentAction } from "@/app/actions/payment";

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await req.json();

    const result = await confirmPaymentAction({
      paymentKey,
      orderId,
      amount,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error, code: result.code },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true, payment: result.data }, { status: 200 });
  } catch (error) {
    console.error("Payment Confirmation API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

