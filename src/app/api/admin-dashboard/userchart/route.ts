import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const currentDate = new Date();

    // Run aggregation to get user count per month for the last 12 months
    const userCounts = await prisma.user.count();

    return new NextResponse(JSON.stringify(userCounts));
  } catch (error) {
    console.error("Error retrieving user counts:", error);
    return new NextResponse("API is not working", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
