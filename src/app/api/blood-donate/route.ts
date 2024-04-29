import { Prisma } from "@/components/helper/backEnd/Prisma";
import storage from "@/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();

    const name = getStringValue(formData, "fullName");
    const birthDate = getStringValue(formData, "birthDay");
    const bloodGroup = getStringValue(formData, "bloodGroup");
    const allergies = getStringValue(formData, "allergies");
    const donatedBefore = getStringValue(formData, "donatedBefore");
    const diseases = getStringValue(formData, "diseases");
    const district = getStringValue(formData, "district");
    const address = getStringValue(formData, "address");
    const occupation = getStringValue(formData, "Occupation");
    const number = getStringValue(formData, "number");
    const number2 = getStringValue(formData, "number2");

    // Check if there is an image in the FormData
    const hasImage = formData.has("image");
    let imageURL = null;

    if (hasImage) {
      // Image is present in the FormData
      const image = formData.get("image");
      const filename = Date.now() + (image as File).name.replaceAll(" ", "_");
      const buffer = Buffer.from(await (image as Blob).arrayBuffer());

      // Upload file to Firebase storage
      const storageRef = ref(storage, "bloodDonar/" + filename);
      await uploadBytes(storageRef, buffer);

      // Get download URL from Firebase storage
      imageURL = await getDownloadURL(storageRef);
    }

    // Save form data and image URL using Prisma
    const bloodDonation = await Prisma.bloodDonation.create({
      data: {
        name,
        birthDate,
        bloodGroup,
        allergies,
        donatedBefore,
        diseases,
        district,
        address,
        occupation,
        number,
        number2,
        image: imageURL,
      },
    });

    // Return the response data
    return new NextResponse(JSON.stringify(bloodDonation), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    Prisma.$disconnect();
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const page = queryParams.get("page")
      ? parseInt(queryParams.get("page")!, 10)
      : 1;
    const pageSize = queryParams.get("pageSize")
      ? parseInt(queryParams.get("pageSize")!, 10)
      : 6;

    const skipCount = (page - 1) * pageSize;

    const searchName = queryParams.get("search") || "";

    const allUsers = await Prisma.bloodDonation.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        number: true,
        number2: true,
        diseases: true,
        district: true,
        birthDate: true,
        bloodGroup: true,
        donatedBefore: true,
      },
      where: {
        name: {
          contains: searchName,
          mode: "insensitive",
        },
      },

      skip: skipCount,
      take: pageSize,
    });

    const totalUsersCount = await Prisma.user.count({
      where: {
        name: {
          contains: searchName,
          mode: "insensitive",
        },
      },
    });

    if (allUsers.length > 0) {
      return new NextResponse(
        JSON.stringify({ users: allUsers, totalUsersCount }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new NextResponse("No users found.", { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
