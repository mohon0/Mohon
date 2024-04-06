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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("User not logged in");
    }

    const data = await req.formData();
    const titleEntry = data.get("title");
    const cover = data.get("image");
    const categoriesEntry = data.get("category");
    const contentEntry = data.get("content");

    if (!titleEntry || !cover || !categoriesEntry) {
      return new NextResponse("Missing title, file or categories", {
        status: 400,
      });
    }

    let title = "";
    if (typeof titleEntry === "string") {
      title = titleEntry;
    } else if (titleEntry instanceof File) {
      title = titleEntry.name;
    }

    let categories = "";
    if (typeof categoriesEntry === "string") {
      categories = categoriesEntry;
    } else if (categoriesEntry instanceof File) {
      categories = categoriesEntry.name;
    }

    let content = "";
    if (typeof contentEntry === "string") {
      content = contentEntry;
    } else if (contentEntry instanceof File) {
      content = contentEntry.name;
    }

    const coverBlob = cover as Blob;

    const buffer = Buffer.from(await coverBlob.arrayBuffer());
    const filename = Date.now() + coverBlob.name.replaceAll(" ", "_");

    try {
      // Upload file to Firebase storage
      const storageRef = ref(storage, "uploads/" + filename);
      await uploadBytes(storageRef, buffer);

      // Get download URL from Firebase storage
      const downloadURL = await getDownloadURL(storageRef);

      // Create a new post using Prisma
      const newPost = await Prisma.post.create({
        data: {
          title,
          coverImage: downloadURL,
          category: categories,
          content,
          author: { connect: { id: token.sub } },
        },
      });

      return new NextResponse(JSON.stringify(newPost), { status: 201 });
    } catch (error) {
      console.error("Error occurred while uploading the file: ", error);
      return new NextResponse("File upload failed", { status: 500 });
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("You are not logged in");
    }

    const body = await req.formData();

    const title = body.get("title");
    const content = body.get("content");
    const categories = body.get("categories");
    const userId = body.get("userId");
    const id = body.get("id");

    if (!id) {
      return new NextResponse("Invalid post ID", { status: 400 });
    }

    // Convert id to string
    const postId = id.toString();

    // Compare userId with token.sub
    if (userId !== token.sub) {
      return new NextResponse("You are not the author of this post");
    }

    const coverImageBlob = body.get("image") as Blob | null;

    let coverImageURL = null;
    if (coverImageBlob) {
      const buffer = Buffer.from(await coverImageBlob.arrayBuffer());
      const filename = Date.now() + coverImageBlob.name.replaceAll(" ", "_");

      // Upload file to Firebase storage
      const storageRef = ref(storage, "uploads/" + filename);
      await uploadBytes(storageRef, buffer);

      // Get download URL from Firebase storage
      coverImageURL = await getDownloadURL(storageRef);

      // Delete previous image from Firebase storage
      if (coverImageURL && postId) {
        const previousPost = await Prisma.post.findUnique({
          where: { id: postId },
          select: { coverImage: true },
        });

        if (previousPost?.coverImage) {
          const previousImageRef = ref(storage, previousPost.coverImage); // Create a reference from URL
          await deleteObject(previousImageRef);
        }
      }
    }

    // Update the post using Prisma
    const updatedPostData: {
      title: string;
      content: string;
      category: string;
      coverImage?: string;
    } = {
      title: title as string,
      content: content as string,
      category: categories as string,
    };

    if (coverImageURL !== null) {
      updatedPostData.coverImage = coverImageURL;
    }

    const updatedPost = await Prisma.post.update({
      where: { id: postId },
      data: updatedPostData,
    });

    return new NextResponse(JSON.stringify(updatedPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    // Step 1: Authenticate the user
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!token || !userId) {
      // User is not authenticated
      return new NextResponse("User not authenticated", { status: 401 });
    }

    const search = req.nextUrl.searchParams;
    const postId = search.get("postId");

    if (!postId) {
      return new NextResponse("Post not found", { status: 404 });
    }
    // Step 2: Fetch the post details
    const post = await Prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        author: {
          select: {
            id: true,
          },
        },
        coverImage: true,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const authorId = post.author.id;

    // Step 3: Check authorization
    if (userId !== authorId) {
      return new NextResponse(
        "Unauthorized: You can only delete your own posts",
        { status: 401 },
      );
    }

    // Step 4: Delete associated comments first
    await Prisma.comment.deleteMany({
      where: {
        postId: postId,
      },
    });

    if (await checkIfImageExists(post.coverImage)) {
      const storageRefToDelete = ref(storage, post.coverImage);
      await deleteObject(storageRefToDelete);
    }

    // Step 5: Delete the post
    const deletedPost = await Prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (deletedPost) {
      return new NextResponse("Post deleted successfully");
    } else {
      return new NextResponse("Post not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
