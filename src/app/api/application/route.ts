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
const admin = process.env.NEXT_PUBLIC_ADMIN;

// Function to check if an image exists in Firebase Storage
async function imageExists(imagePath: string | undefined) {
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

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!token || !userId) {
      // User is not authenticated or authorId is missing
      return new NextResponse("User not logged in or authorId missing");
    }

    // Check if the user has already submitted an application
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId: userId,
      },
    });

    if (existingApplication) {
      // User has already submitted an application
      return new NextResponse("User has already submitted an application", {
        status: 400,
      });
    }

    // Extract form data from the request
    const formData = await req.formData();

    // Use utility function for each form field
    const firstName = getStringValue(formData, "firstName");
    const lastName = getStringValue(formData, "lastName");
    const email = getStringValue(formData, "email");
    const fatherName = getStringValue(formData, "fatherName");
    const motherName = getStringValue(formData, "motherName");
    const birthDay = getStringValue(formData, "birthDay");
    const bloodGroup = getStringValue(formData, "bloodGroup");
    const mobileNumber = getStringValue(formData, "mobileNumber");
    const guardianNumber = getStringValue(formData, "guardianNumber");
    const gender = getStringValue(formData, "gender");
    const religion = getStringValue(formData, "religion");
    const fullAddress = getStringValue(formData, "fullAddress");
    const district = getStringValue(formData, "district");
    const education = getStringValue(formData, "education");
    const board = getStringValue(formData, "board");
    const rollNumber = getStringValue(formData, "rollNumber");
    const regNumber = getStringValue(formData, "regNumber");
    const passingYear = getStringValue(formData, "passingYear");
    const gpa = getStringValue(formData, "gpa");
    const nid = getStringValue(formData, "nid");
    const nationality = getStringValue(formData, "nationality");
    const course = getStringValue(formData, "course");
    const duration = getStringValue(formData, "duration");
    const pc = getStringValue(formData, "pc");
    const picture = formData.get("picture");

    try {
      // Ensure you have a valid filename and buffer before using them
      const filename = Date.now() + (picture as File).name.replaceAll(" ", "_");
      const buffer = Buffer.from(await (picture as Blob).arrayBuffer());

      // Upload file to Firebase storage
      const storageRef = ref(storage, "application/" + filename);
      await uploadBytes(storageRef, buffer);

      // Get download URL from Firebase storage
      const downloadURL = await getDownloadURL(storageRef);

      // Create a new post using Prisma
      const newPost = await prisma.application.create({
        data: {
          firstName,
          lastName,
          fatherName,
          motherName,
          birthDay,
          bloodGroup,
          mobileNumber,
          guardianNumber,
          gender,
          religion,
          fullAddress,
          district,
          education,
          board,
          rollNumber,
          regNumber,
          passingYear,
          gpa,
          nid,
          nationality,
          course,
          duration,
          email,
          pc,
          userId,
          image: downloadURL,
          status: "Pending",
        },
      });

      return new NextResponse("Applications created successfully");
    } catch (error) {
      return new NextResponse("Applications creation failed", { status: 400 });
    }
  } catch (error) {
    console.error("Error occurred while processing form data: ", error);
    return new NextResponse("Form data processing failed", { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    const url = new URL(req.url);

    if (!token || !userId) {
      return new NextResponse("User not logged in or authorId missing");
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        duration: true,
        image: true,
        status: true,
        course: true,
      },
    });

    if (existingApplication) {
      return new NextResponse(JSON.stringify(existingApplication), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse("An error occurred");
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;
    const userEmail = token?.email;

    if (!token || (!userId && !userEmail)) {
      return new NextResponse("User not logged in or userId/userEmail missing");
    }

    const search = req.nextUrl.searchParams;
    const applicationId = search.get("id");

    if (!applicationId) {
      return new NextResponse("Application ID not provided", { status: 400 });
    }

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        userId: true,
        image: true,
      },
    });

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    // Check if the user has the right to delete the application
    if (userId === application.userId || userEmail === admin) {
      if (await imageExists(application.image)) {
        // Delete the previous cover image
        const storageRefToDelete = ref(storage, application.image);
        await deleteObject(storageRefToDelete);
      }

      await prisma.application.delete({
        where: {
          id: applicationId,
        },
      });

      return new NextResponse("Application deleted successfully", {
        status: 200,
      });
    } else {
      // User does not have the right to delete the application
      return new NextResponse("Unauthorized to delete this application", {
        status: 403,
      });
    }
  } catch (error) {
    console.error("Error deleting application:", error);
    return new NextResponse("Error deleting application", { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;
    const userEmail = token?.email;

    if (!token || (!userId && !userEmail)) {
      return new NextResponse("User not logged in or userId/userEmail missing");
    }

    const formData = await req.formData();

    const status = getStringValue(formData, "status");
    const id = getStringValue(formData, "id");

    if (userEmail === admin) {
      const response = await prisma.application.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });

      if (response) {
        return new NextResponse(JSON.stringify(response), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      return new NextResponse(
        "You do not have permission to update this item.",
        { status: 403 }
      );
    }
  } catch (error) {
    return new NextResponse("Error updating application");
  }
}
