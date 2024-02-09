import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Use Prisma's native groupBy method with transformed createdAt field
    const response = await prisma.application.groupBy({
      by: ["course"],

      _count: true,
    });

    return new NextResponse(JSON.stringify(response));
  } catch (error) {
    console.error("Error retrieving post counts:", error);
    return new NextResponse("API is not working", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
