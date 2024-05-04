import checkIfImageExists from "@/components/helper/backEnd/ImageCheck";
import { Prisma } from "@/components/helper/backEnd/Prisma";
import storage from "@/utils/firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const admin = process.env.NEXT_PUBLIC_ADMIN;

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

export async function PUT(req: NextRequest, res: NextResponse) {
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
    const id = getStringValue(formData, "id");

    const response = await Prisma.bloodDonation.findUnique({
      where: {
        id: id,
      },
    });

    // Check if there is an image in the FormData
    const hasImage = formData.has("image");
    let imageURL = null;

    console.log(formData);

    if (hasImage && response?.image) {
      // Image is present in the FormData
      const image = formData.get("image");
      if (await checkIfImageExists(response.image)) {
        // Delete the previous cover image
        const storageRefToDelete = ref(storage, response.image);
        await deleteObject(storageRefToDelete);
      }
      const filename = Date.now() + (image as File).name.replaceAll(" ", "_");
      const buffer = Buffer.from(await (image as Blob).arrayBuffer());
      // Upload file to Firebase storage
      const storageRef = ref(storage, "bloodDonar/" + filename);
      await uploadBytes(storageRef, buffer);
      // Get download URL from Firebase storage
      imageURL = await getDownloadURL(storageRef);
    }

    // Save form data and image URL using Prisma
    const bloodDonation = await Prisma.bloodDonation.update({
      where: {
        id: id,
      },
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
    let bloodGroup = (queryParams.get("bloodGroup") || "All").trim();
    if (bloodGroup && bloodGroup !== "All") {
      if (!bloodGroup.includes("-")) {
        bloodGroup = bloodGroup + "+";
      }
    }

    const allUsers = await Prisma.bloodDonation.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        number: true,
        number2: true,
        district: true,
        address: true,
        diseases: true,
        allergies: true,
        birthDate: true,
        bloodGroup: true,
        donatedBefore: true,
      },
      where: {
        name: {
          contains: searchName,
          mode: "insensitive",
        },
        ...(bloodGroup !== "All" && { bloodGroup: { equals: bloodGroup } }),
      },
      skip: skipCount,
      take: pageSize,
    });

    const totalUsersCount = await Prisma.bloodDonation.count({
      where: {
        name: {
          contains: searchName,
          mode: "insensitive",
        },
        ...(bloodGroup !== "All" && { bloodGroup: { equals: bloodGroup } }),
      },
    });

    if (allUsers.length > 0) {
      return new NextResponse(
        JSON.stringify({ users: allUsers, count: totalUsersCount }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new NextResponse("No users found.", { status: 200 });
    }
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  } finally {
    Prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return new NextResponse("Your are not authenticated");
    }
    if (token.email !== admin) {
      return new NextResponse("Only admin has access to this.");
    }
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const id = queryParams.get("id");
    if (!id) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // Step 2: Fetch the user details
    const user = await Prisma.bloodDonation.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        image: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (user?.image) {
      if (await checkIfImageExists(user.image)) {
        const storageRefToDelete = ref(storage, user.image);
        await deleteObject(storageRefToDelete);
      }
    }
    const deleteUser = await Prisma.bloodDonation.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  } finally {
    Prisma.$disconnect();
  }
}
