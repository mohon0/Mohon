import DecodeTitleFromUrl from "@/components/helper/backEnd/DecodeTitleFromUrl";
import { Prisma } from "@/components/helper/backEnd/Prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const admin = process.env.NEXT_PUBLIC_ADMIN;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const category = queryParams.get("category");
    const encodedTitle = queryParams.get("title") || "";

    if (!category || !encodedTitle) {
      return new NextResponse("No category or title provided");
    }
    const title = DecodeTitleFromUrl(encodedTitle);
    console.log(title, category);
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
      return new NextResponse("No Post Found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("Your are not authenticated");
    }
    if (token.email !== admin) {
      return new NextResponse("Only admin has access to this.");
    }

    const data = await req.json();

    if (!data.title || !data.imageUrl || !data.categories) {
      return new NextResponse("Missing title, imageId or categories", {
        status: 400,
      });
    }

    // Create a new post using Prisma

    const newImageUrl =
      "http://drive.google.com/uc?export=view&id=" + data.imageUrl;
    const newPost = await Prisma.post.create({
      data: {
        title: data.title,
        coverImage: newImageUrl,
        category: data.categories,
        content: data.content,
        author: { connect: { id: token.sub } },
      },
    });

    return new NextResponse(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("Your are not authenticated");
    }
    if (token.email !== admin) {
      return new NextResponse("Only admin has access to this.");
    }

    const data = await req.json();
    if (!data.title || !data.imageUrl || !data.categories || !data.id) {
      return new NextResponse("Missing title, imageId or categories", {
        status: 400,
      });
    }

    const newImageUrl =
      "http://drive.google.com/uc?export=view&id=" + data.imageUrl;

    const updatedPost = await Prisma.post.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.categories,
        coverImage: newImageUrl,
        content: data.content,
      },
    });

    return new NextResponse(JSON.stringify(updatedPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("Your are not authenticated");
    }
    if (token.email !== admin) {
      return new NextResponse("Only admin has access to this.");
    }

    const search = req.nextUrl.searchParams;
    const postId = search.get("postId");

    if (!postId) {
      return new NextResponse("Post not found", { status: 404 });
    }
    // Step 2: Fetch the post details
    const post = await Prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        author: {
          select: {
            id: true,
          },
        },
        coverImage: true,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // Step 4: Delete associated comments first
    await Prisma.comment.deleteMany({
      where: {
        postId: postId,
      },
    });

    // Step 6: Delete the post
    const deletedPost = await Prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (deletedPost) {
      return new NextResponse("Post deleted successfully");
    } else {
      return new NextResponse("Post not found", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
