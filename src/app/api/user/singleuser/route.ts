import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import { deleteObject, getMetadata, ref } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
const Admin = process.env.NEXT_PUBLIC_ADMIN;

async function imageExists(imagePath: string | undefined) {
  const storageRef = ref(storage, imagePath);

  try {
    const metadata = await getMetadata(storageRef);
    return metadata.size > 0;
  } catch (error) {
    if ((error as any).code === "storage/object-not-found") {
      return false;
    } else {
      console.error("Error checking image existence:", error);
      throw error;
    }
  }
}

async function deleteImageIfExists(imagePath: string | undefined) {
  if (imagePath && (await imageExists(imagePath))) {
    const storageRefToDelete = ref(storage, imagePath);
    await deleteObject(storageRefToDelete);
  }
}

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
        applications: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
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
      if (await imageExists(application.image)) {
        const storageRefToDelete = ref(storage, application.image);
        await deleteObject(storageRefToDelete);
      }
    }
    if (user?.image) {
      if (await imageExists(user.image)) {
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
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Error: Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
