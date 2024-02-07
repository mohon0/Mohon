import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Get the total count of all posts
    const totalApplication = await prisma.application.count();

    // Calculate the start and end date of last month
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setDate(1);
    endDate.setHours(0, 0, 0, 0);

    // Get the count of posts created between start and end date of last month
    const lastMonthApplication = await prisma.application.count({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    // Calculate the percentage of posts from last month compared to total
    const percentageLastApplication = (
      (lastMonthApplication / totalApplication) *
      100
    ).toFixed(2);

    // Prepare response object
    const responseData = {
      totalApplication,
      lastMonthApplication,
      percentageLastApplication,
    };

    return new NextResponse(JSON.stringify(responseData));
  } catch (error) {
    return new NextResponse("API is not working", { status: 400 });
  }
}
