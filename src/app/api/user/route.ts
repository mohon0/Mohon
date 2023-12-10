import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const users = await prisma.user.findMany({});
    return new NextResponse(JSON.stringify(users));
  } catch (error) {
    return new NextResponse("error", { status: 400 });
  }
}
