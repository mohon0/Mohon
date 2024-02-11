import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const searchName = queryParams.get("search") || "";
    const response = await prisma.post.findMany({
      select: {
        createdAt: true,
      },
    });

    const countsByMonth: Record<string, number> = {};
    // Iterate through the data and aggregate counts by month
    response.forEach((entry) => {
      const month = format(new Date(entry.createdAt), "MMM yyyy"); // Format as "Jan 2024"
      countsByMonth[month] = (countsByMonth[month] || 0) + 1;
    });

    // Convert the aggregated counts to the desired format
    const result = Object.keys(countsByMonth).map((month) => ({
      month,
      count: countsByMonth[month],
    }));

    return new NextResponse(JSON.stringify(result));
  } catch (error) {
    console.error("Error retrieving post counts:", error);
    return new NextResponse("Error retrieving post counts", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
