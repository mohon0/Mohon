import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const searchName = queryParams.get("search") || "";
    const response = await prisma.application.groupBy({
      by: ["course"],
      _count: true,
    });

    const totalApplicationCount = await prisma.application.count();

    return NextResponse.json({
      groupedResults: response,
      totalApplicationCount,
    });
  } catch (error) {
    console.error("Error retrieving post counts:", error);
    return new NextResponse("API is not working", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
