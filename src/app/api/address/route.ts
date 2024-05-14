import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    const pageSize = parseInt(queryParams.get("pageSize") || "6", 10);
    const searchName = queryParams.get("search") || "";
    let bloodGroup = (queryParams.get("filterBy") || "").trim();

    if (page < 1 || pageSize < 1) {
      return new NextResponse("Invalid page or pageSize", { status: 400 });
    }

    const skipCount = (page - 1) * pageSize;

    let whereClause: any = {};

    if (bloodGroup && bloodGroup !== "All") {
      if (!bloodGroup.includes("-")) {
        bloodGroup = bloodGroup + "+";
      }

      whereClause.bloodGroup = {
        equals: bloodGroup,
      };
    }

    if (searchName) {
      whereClause.AND = [
        {
          fullAddress: {
            contains: searchName,
            mode: "insensitive",
          },
        },
        ...(whereClause.AND || []),
      ];
    }

    const [allUsers, totalUsersCount] = await Promise.all([
      prisma.application.findMany({
        select: {
          id: true,
          email: true,
          image: true,
          mobileNumber: true,
          createdAt: true,
          bloodGroup: true,
          fullAddress: true,
          firstName: true,
          lastName: true,
        },
        where: whereClause,
        skip: skipCount,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.application.count({ where: whereClause }),
    ]);

    if (allUsers.length > 0) {
      return new NextResponse(
        JSON.stringify({ users: allUsers, totalUsersCount }),
        { headers: { "Content-Type": "application/json" } },
      );
    } else {
      return new NextResponse("No users found.", { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
