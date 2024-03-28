import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const existingApp = await prisma.application.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!existingApp) {
      return new NextResponse("No application found");
    }
    const updatedApp = await prisma.application.update({
      where: {
        id: body.id,
      },
      data: {
        certificate: body.certificate,
      },
    });
    return new NextResponse("updated successfully");
  } catch (error) {
    return new NextResponse("error", { status: 400 });
  } finally {
    prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const id = queryParams.get("id");
    if (!id) {
      return new NextResponse("No application id available");
    }
    const response = await prisma.application.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse("Application deleted successfully");
  } catch (error) {}
  return new NextResponse("api is woriking");
}
