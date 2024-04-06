import DecodeTitleFromUrl from "@/components/helper/backEnd/DecodeTitleFromUrl";
import { Prisma } from "@/components/helper/backEnd/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const category = parts[2];
  const encodedTitle = parts[3];
  const title = DecodeTitleFromUrl(encodedTitle);

  try {
    const postData = await Prisma.post.findFirst({
      where: {
        category: {
          equals: category,
          mode: "insensitive",
        },
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
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
            email: true,
            image: true,
            id: true,
          },
        },
      },
    });

    if (postData) {
      return new NextResponse(JSON.stringify(postData));
    } else {
      return new NextResponse("No Post Found", { status: 204 });
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
