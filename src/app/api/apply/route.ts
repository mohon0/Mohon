import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const admin = process.env.NEXT_PUBLIC_ADMIN;
const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;
    const userEmail = token?.email;

    if (!userId) {
      return new NextResponse("User not logged in or userId/userEmail missing");
    }

    if (userEmail === admin) {
      const application = await prisma.application.findMany({});
      return new NextResponse(JSON.stringify({ application }));
    }
    return new NextResponse("You are not allowed to access this");
  } catch (error) {
    return new NextResponse("Error while getting application");
  }
}
