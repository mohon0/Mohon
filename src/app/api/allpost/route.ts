import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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
    const category = queryParams.get("category");
    const search = queryParams.get("search");

    console.log(category)

    const skipCount = (page - 1) * pageSize;

    // Build the where condition for filtering by category and searching by title
    const where: Prisma.PostWhereInput = {
      ...(category && category !== "all"
        ? { category }
        : {
            category: {
              notIn: [
                "notice",
                "office_applications",
                "database_programming",
                "digital_marketing",
                "graphics_design",
                "motions_graphics",
                "web_design_and_development",
                "video_editing",
                "ethical_hacking",
                "python_progamming",
              ],
            },
          }),
      ...(search
        ? {
            title: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    };

    const allPosts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        coverImage: true,
        category: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: sortBy === "oldest" ? "asc" : "desc",
      },
      skip: skipCount,
      take: pageSize,
      where, // Apply the where condition here
    });

    const totalPostsCount = await prisma.post.count({ where });

    if (allPosts.length > 0) {
      // Include the total count along with the paginated posts in the response
      return new NextResponse(
        JSON.stringify({ posts: allPosts, totalPostsCount }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new NextResponse("No posts found.", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
