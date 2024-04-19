import { Prisma } from "@/components/helper/backEnd/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const searchParams = url.search.substring(1).split("&");
    const bloodGroupParam = searchParams[0];
    const bloodGroup = bloodGroupParam.split("=")[1];

    console.log("Extracted blood group:", bloodGroup);

    let whereClause = {};

    // If bloodGroup is not provided or set to "All", show all applications
    if (!bloodGroup || bloodGroup === "All") {
      whereClause = {}; // No filter
    } else {
      // Filter applications by blood group if bloodGroup is specified
      whereClause = {
        bloodGroup: bloodGroup,
      };
    }

    const page = parseInt(queryParams.get("page") || "1", 10);
    const pageSize = 10;

    const response = await Prisma.application.findMany({
      where: whereClause,
      select: {
        bloodGroup: true,
        firstName: true,
        lastName: true,
        image: true,
        email: true,
        mobileNumber: true,
        fullAddress: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new NextResponse(JSON.stringify(response));
  } catch (error) {
    console.error("Error while fetching response:", error);
    return new NextResponse("Error while fetching response", { status: 500 });
  }
}
