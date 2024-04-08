import checkIfImageExists from "@/components/helper/backEnd/ImageCheck";
import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const prisma = new PrismaClient();

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const existingApp = await prisma.application.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!existingApp) {
      return new NextResponse("No application found");
    }
    const updatedApp = await prisma.application.update({
      where: {
        id: body.id,
      },
      data: {
        certificate: body.certificate,
      },
    });
    return new NextResponse("updated successfully");
  } catch (error) {
    return new NextResponse("error", { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    // Step 1: Authenticate the user
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!token || !userId) {
      // User is not authenticated
      return new NextResponse("User not authenticated", { status: 401 });
    }
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const id = queryParams.get("id");
    if (!id) {
      return new NextResponse("No application id available");
    }

    const application = await prisma.application.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        image: true,
      },
    });

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }
    if (await checkIfImageExists(application.image)) {
      const storageRefToDelete = ref(storage, application.image);
      await deleteObject(storageRefToDelete);
    }

    const response = await prisma.application.delete({
      where: {
        id: id,
      },
    });
    if (response) {
      return new NextResponse("Application deleted successfully");
    } else {
      return new NextResponse("Application not found", { status: 404 });
    }
  } catch (error) {}
  return new NextResponse("api is woriking");
}
