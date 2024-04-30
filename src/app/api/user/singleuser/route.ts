import checkIfImageExists from "@/components/helper/backEnd/ImageCheck";
import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
const Admin = process.env.NEXT_PUBLIC_ADMIN;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const email = token?.email;

    if (!token) {
      return new NextResponse("User not logged in");
    }
    if (email !== Admin) {
      return new NextResponse("Only admin can access this");
    }

    const search = req.nextUrl.searchParams;
    const userId = search.get("userId");

    if (!userId) {
      return new NextResponse("Error: User ID not specified", { status: 400 });
    }

    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phoneNumber: true,
        createdAt: true,
        facebook: true,
        twitter: true,
        linkedin: true,
        github: true,
        instagram: true,
        status: true,
        bio: true,
        _count: {
          select: {
            posts: true,
            comments: true,
          },
        },
        applications: {
          select: {
            id: true,
            image: true,
          },
        },
      },
    });

    if (!userData) {
      return new NextResponse("Error: User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify({ userData }));
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse("Error: Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const email = token?.email;

    if (!token) {
      return new NextResponse("User not logged in");
    }
    if (email !== Admin) {
      return new NextResponse("Only admin can access this");
    }

    const search = req.nextUrl.searchParams;
    const userId = search.get("userId");

    if (!userId) {
      return new NextResponse("Error: User ID not specified", { status: 400 });
    }

    // Step 2: Fetch the user details
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        image: true,
        applications: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const application = await prisma.application.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        image: true,
      },
    });

    if (application?.image) {
      if (await checkIfImageExists(application.image)) {
        const storageRefToDelete = ref(storage, application.image);
        await deleteObject(storageRefToDelete);
      }
    }
    if (user?.image) {
      if (await checkIfImageExists(user.image)) {
        const storageRefToDelete = ref(storage, user.image);
        await deleteObject(storageRefToDelete);
      }
    }

    const comments = await prisma.comment.deleteMany({
      where: {
        authorId: userId,
      },
    });

    const deleteApplication = await prisma.application.deleteMany({
      where: {
        userId: userId,
      },
    });

    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse("Error: Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
