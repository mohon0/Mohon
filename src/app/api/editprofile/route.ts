import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

// Function to check if an image exists in Firebase Storage
async function checkIfImageExists(imagePath: string | undefined) {
  const storageRef = ref(storage, imagePath);

  try {
    // Get metadata for the file
    const metadata = await getMetadata(storageRef);
    return metadata.size > 0; // If size is greater than 0, the file exists.
  } catch (error) {
    if ((error as any).code === "storage/object-not-found") {
      // If the error code is "object-not-found," the file doesn't exist.
      return false;
    } else {
      // Handle other errors here
      console.error("Error checking image existence:", error);
      throw error;
    }
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req, secret });
  if (!token) {
    return new NextResponse("Token not found");
  }

  const id = token.sub;

  const userInfo = await prisma.user.findUnique({
    where: { id: id },
    select: {
      name: true,
      email: true,
      image: true,
      phoneNumber: true,
      facebook: true,
      bio: true,
      twitter: true,
      github: true,
      instagram: true,
      linkedin: true,
    },
  });
  if (!userInfo) {
    return new NextResponse("User not found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(userInfo), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.formData();

  const id = body.get("id");
  const name = body.get("name");
  const coverImageBlob = body.get("image") as Blob | null;

  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("You are not logged in");
    }

    if (id !== token.sub) {
      return new NextResponse("You are not authorized");
    }

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if the user has an image in Firebase Storage
    if (existingUser.image) {
      const imageExists = await checkIfImageExists(existingUser.image);
      if (imageExists) {
        // Delete the previous cover image
        const storageRefToDelete = ref(storage, existingUser.image);
        await deleteObject(storageRefToDelete);
      }
    }

    // Upload the new cover image
    let image = null;

    if (coverImageBlob) {
      const buffer = Buffer.from(await coverImageBlob.arrayBuffer());
      const filename = Date.now() + coverImageBlob.name.replaceAll(" ", "_");

      // Upload file to Firebase storage
      const storageRef = ref(storage, "profile/" + filename);
      await uploadBytes(storageRef, buffer);

      // Get download URL from Firebase storage
      image = await getDownloadURL(storageRef);
    }

    // Update the user's data using Prisma
    const updatedProfileData: {
      name: string;
      image?: string;
    } = {
      name: name as string,
    };

    if (image !== null) {
      updatedProfileData.image = image;
    }

    // Update user information
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedProfileData,
    });

    return new NextResponse(JSON.stringify(updatedUser), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    return new NextResponse("Error updating user information", {
      status: 500,
    });
  }
}
