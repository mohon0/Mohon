import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
const admin = process.env.NEXT_PUBLIC_ADMIN;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;
    const email = token?.email;

    if (!token || !userId) {
      return new NextResponse("User not logged in or authorId missing");
    }

    const search = req.nextUrl.searchParams;
    const id = search.get("id");

    if (email === admin && id) {
      const response = await prisma.application.findFirst({
        where: {
          id: id,
        },
      });
      return new NextResponse(JSON.stringify({ response }));
    }
    return new NextResponse("only admin has access to this");
  } catch (error) {
    return new NextResponse("api is unavailable");
  }
}
