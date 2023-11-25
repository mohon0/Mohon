import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
const admin = process.env.NEXT_PUBLIC_ADMIN;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const search = req.nextUrl.searchParams;
    const id = search.get("id");
    if (!id) {
      return new NextResponse("Error id not specified", { status: 404 });
    }

    if (id) {
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
