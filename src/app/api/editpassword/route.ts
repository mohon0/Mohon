import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const prisma = new PrismaClient();

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const body = await req.formData();
    const id = body.get("id");
    const oldPasswordEntry = body.get("password");
    const newPasswordEntry = body.get("newPassword");

    if (!token) {
      return new NextResponse("You are not logged in");
    }

    if (id !== token.sub) {
      return new NextResponse("You are not authorized");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return new NextResponse("No user found");
    }

    if (existingUser.password === null) {
      return new NextResponse("User has no password set");
    }

    const oldPassword = oldPasswordEntry ? oldPasswordEntry.toString() : null;
    const newPassword = newPasswordEntry ? newPasswordEntry.toString() : null;

    if (oldPassword !== null && newPassword !== null) {
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        existingUser.password
      );

      if (isPasswordValid) {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await prisma.user.update({
          where: { id },
          data: { password: hashedPassword },
        });

        return new NextResponse("Password updated successfully");
      } else {
        return new NextResponse("Incorrect old password", { status: 401 });
      }
    } else {
      return new NextResponse("Old or new password not provided");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return new NextResponse("Error updating password", {
      status: 500,
    });
  }
}
