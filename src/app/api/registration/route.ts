import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { name, identifier, password } = body;

  if (!name || !identifier || !password) {
    return new NextResponse("Missing name, identifier, or password", {
      status: 400,
    });
  }

  let exist;
  if (identifier.includes("@")) {
    // Check if identifier is an email
    exist = await prisma.user.findUnique({
      where: {
        email: identifier,
      },
    });
  } else {
    // Check if identifier is a phone number
    exist = await prisma.user.findUnique({
      where: {
        phoneNumber: identifier,
      },
    });
  }

  if (exist) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      [identifier.includes("@") ? "email" : "phoneNumber"]: identifier,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
