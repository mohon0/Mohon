import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const search = req.nextUrl.searchParams;
    const email = search.get("userEmail");
    const code = search.get("code");

    if (!email) {
      return new NextResponse("something went wrong", { status: 404 });
    }
    if (!code) {
      return new NextResponse("something went wrong", { status: 404 });
    }

    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
    console.log(user);

    if (code === user.verificationCode) {
      return new NextResponse("success", { status: 200 });
    } else {
      return new NextResponse("error code did not match", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("error", { status: 400 });
  }
}
