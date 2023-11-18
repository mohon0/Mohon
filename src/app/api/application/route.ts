import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;
    if (!token || !userId) {
      // User is not authenticated or authorId is missing
      return new NextResponse("User not logged in or authorId missing");
    }
    const {
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
    } = await req.json();

    const application = await prisma.application.create({
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
      },
    });

    return new NextResponse(JSON.stringify(application), { status: 201 });
  } catch (error) {
    return new NextResponse("error", { status: 400 });
  }
}
