import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

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
    const fatherName = getStringValue(formData, "fatherName");
    const motherName = getStringValue(formData, "motherName");
    const dateOfBirth = getStringValue(formData, "dateOfBirth");
    const bloodGroups = getStringValue(formData, "bloodGroups");
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
    const image = formData.get("image");

    // Ensure you have a valid filename and buffer before using them
    const filename = Date.now() + (image as File).name.replaceAll(" ", "_");
    const buffer = Buffer.from(await (image as Blob).arrayBuffer());

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
        dateOfBirth,
        bloodGroups,
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
        userId,
        image: downloadURL,
        status: "Pending",
      },
    });

    return new NextResponse(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error occurred while processing form data: ", error);
    return new NextResponse("Form data processing failed", { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
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
      // User has already submitted an application
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
  const token = await getToken({ req, secret });
  const userId = token?.sub;

  if (!token || !userId) {
    // User is not authenticated or authorId is missing
    return new NextResponse("User not logged in or authorId missing");
  }

  return new NextResponse("api is working");
}
