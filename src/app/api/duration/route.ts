import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
const Admin = process.env.NEXT_PUBLIC_ADMIN;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.duration.findFirst({});

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    // Authenticate user and retrieve token
    const token = await getToken({ req, secret });
    const email = token?.email;

    if (!token) {
      // User is not authenticated
      return new NextResponse("User not logged in");
    }
    if (email !== Admin) {
      return new NextResponse("Only admin can access this");
    }
    const { button } = await req.json();
    if (typeof button === "string") {
      const data = await prisma.duration.update({
        where: {
          id: "6572cabe088598503406b0a3",
        },
        data: {
          button: button,
        },
      });

      return new NextResponse("button enabled");
    } else {
      return new NextResponse("Button data must be a string", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("error", { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
