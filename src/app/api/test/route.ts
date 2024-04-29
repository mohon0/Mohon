import { Prisma } from "@/components/helper/backEnd/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await Prisma.user.findMany();

  return new NextResponse(JSON.stringify(response));
}
export async function PUT(req: NextRequest, res: NextResponse) {
  const response = await Prisma.user.update({
    where: {
      email: "freelancermohon01@gmail.com",
    },
    data: {
      status: "Administration",
    },
  });
  return new NextResponse(JSON.stringify(response));
}
