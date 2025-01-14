import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
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
    const status = queryParams.get("category");
    const search = queryParams.get("search");
    const certificate = queryParams.get("certificate");
    const free = queryParams.get("free");

    const skipCount = (page - 1) * pageSize;

    // Build the where condition for filtering by category and searching by title
    const where: Prisma.ApplicationWhereInput = {
      ...(status && status !== "All" ? { status } : {}),
      ...(search
        ? {
            OR: [
              {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                AND: [
                  {
                    firstName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    lastName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            ],
          }
        : {}),
      ...(certificate && certificate !== "All" ? { certificate } : {}),
      ...(free === "true"
        ? { duration: "free" }
        : free === "false"
          ? { duration: { not: "free" } }
          : {}),
    };

    // Calculate the total number of posts without pagination
    const totalPostsCount = await prisma.application.count({ where });

    if (totalPostsCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No Application Found." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Attempt to fetch data from the database
    const application = await prisma.application.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        image: true,
        status: true,
        course: true,
        duration: true,
        createdAt: true,
        certificate: true,
        mobileNumber: true,
      },
      orderBy: {
        createdAt: sortBy === "oldest" ? "asc" : "desc",
      },
      skip: skipCount,
      take: pageSize,
      where,
    });

    // Return a success response
    return new NextResponse(JSON.stringify({ application, totalPostsCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error while getting application:", error);

    // Check if the error is a PrismaClientKnownRequestError
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Return a response with a more specific error message and a 500 status code
      return new NextResponse(
        JSON.stringify({ error: "Error while fetching application data" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
