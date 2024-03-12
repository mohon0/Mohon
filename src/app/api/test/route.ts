import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, re: NextResponse) {
  return new NextResponse("api is working");
}
