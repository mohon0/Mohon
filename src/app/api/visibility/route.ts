import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
const Admin = process.env.NEXT_PUBLIC_ADMIN;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.applyVisibility.findFirst({});

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
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
      const data = await prisma.applyVisibility.update({
        where: {
          id: "65706437140dc0db8e5e918f",
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
