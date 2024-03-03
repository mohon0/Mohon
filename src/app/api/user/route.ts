import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// ...

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const page = queryParams.get("page")
      ? parseInt(queryParams.get("page")!, 10)
      : 1;
    const pageSize = queryParams.get("pageSize")
      ? parseInt(queryParams.get("pageSize")!, 10)
      : 6;

    const sortBy = queryParams.get("sortBy");

    const skipCount = (page - 1) * pageSize;

    const searchName = queryParams.get("search") || ""; // Get the name parameter from the query

    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phoneNumber: true,
        applications: {
          select: {
            image: true,
          },
        },
      },
      where: {
        name: {
          contains: searchName,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: sortBy === "oldest" ? "asc" : "desc",
      },

      skip: skipCount,
      take: pageSize,
    });

    const totalUsersCount = await prisma.user.count();

    if (allUsers.length > 0) {
      return new NextResponse(
        JSON.stringify({ users: allUsers, totalUsersCount }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new NextResponse("No users found.", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
