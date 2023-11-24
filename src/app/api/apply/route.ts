import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Attempt to fetch data from the database
    const application = await prisma.application.findMany({});

    // Return a success response
    return new NextResponse(JSON.stringify({ application }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error while getting application:", error);

    // Check if the error is a PrismaClientKnownRequestError
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Return a response with a more specific error message and a 500 status code
      return new NextResponse("Error while fetching application data", {
        status: 500,
      });
    }

    return new NextResponse("Internal server error", { status: 400 });
  }
}
