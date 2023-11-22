import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const application = await prisma.application.findMany({});
    return new NextResponse(JSON.stringify({ application }));
  } catch (error) {
    return new NextResponse("Error while getting application", { status: 400 });
  }
}
