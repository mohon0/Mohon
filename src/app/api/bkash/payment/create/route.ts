import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { amount, orderId } = await req.json();

    console.log(amount, orderId);
    return new NextResponse("Api is working", { status: 200 });
  } catch (error) {
    return new NextResponse("Error", { status: 400 });
  }
}
