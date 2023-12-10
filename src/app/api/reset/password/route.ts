import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const prisma = new PrismaClient();

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const email = body.email;
    const password = body.password;
    const code = body.code;

    if (!email || !password || !code) {
      return new NextResponse(
        "Missing email or verification code or Password",
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findFirstOrThrow({
      where: { email },
    });

    if (code === existingUser.verificationCode) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      return new NextResponse("Password updated successfully");
    } else {
      return new NextResponse("Error: Code did not match", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("error", { status: 400 });
  }
}
