import { Prisma } from "@/components/helper/backEnd/Prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const Admin = process.env.NEXT_PUBLIC_ADMIN;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const searchName = queryParams.get("search") || "";
    const data = await Prisma.duration.findFirst({});
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Failed to fetch data", { status: 500 });
  } finally {
    await Prisma.$disconnect();
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const email = token?.email;

    if (!token) {
      return new NextResponse("User not logged in", { status: 401 });
    }
    if (email !== Admin) {
      return new NextResponse("Unauthorized access", { status: 403 });
    }

    const { button } = await req.json();

    if (typeof button !== "string") {
      return new NextResponse("Button data must be a string", { status: 400 });
    }

    const data = await Prisma.duration.update({
      where: { id: "6572cabe088598503406b0a3" },
      data: { button: button },
    });

    return new NextResponse("Button updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
    return new NextResponse("Failed to update data", { status: 500 });
  } finally {
    await Prisma.$disconnect();
  }
}
