import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    console.log(url.search);
    const queryParams = new URLSearchParams(url.search);
    const page = queryParams.get("page")
      ? parseInt(queryParams.get("page")!, 10)
      : 1;
    const pageSize = queryParams.get("pageSize")
      ? parseInt(queryParams.get("pageSize")!, 10)
      : 6;

    const searchName = queryParams.get("search") || "";

    const searchParams = url.search.slice(1).split("&");
    let filterBy = "All";

    searchParams.forEach((param) => {
      const [key, value] = param.split("=");
      if (key === "filterBy") {
        filterBy = decodeURIComponent(value);
      }
    });

    const skipCount = (page - 1) * pageSize;

    let whereClause: any = {};

    if (filterBy !== "All") {
      whereClause.bloodGroup = {
        in: filterBy.split(","),
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

    const allUsers = await prisma.application.findMany({
      select: {
        id: true,
        email: true,
        image: true,
        createdAt: true,
        bloodGroup: true,
        fullAddress: true,
        firstName: true,
        lastName: true,
      },
      where: whereClause,
      skip: skipCount,
      take: pageSize,
    });

    const totalUsersCount = await prisma.application.count({
      where: whereClause,
    });

    if (allUsers.length > 0) {
      return new NextResponse(
        JSON.stringify({ users: allUsers, totalUsersCount }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new NextResponse("No users found.", { status: 200 });
    }
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
