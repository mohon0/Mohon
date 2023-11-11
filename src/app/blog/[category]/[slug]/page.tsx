import Blog from "@/components/blog/Blog";
import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: { slug: string; category: string };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category, slug } = params;

  try {
    const response = await fetch(`/api/${category}/${slug}`);
    if (response.ok) {
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const post = await response.json();

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: post.title || "Blog Post", // Set a default title if post.title is null or undefined
      openGraph: {
        images: [post.coverImage, ...previousImages],
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    // Handle the error (set a default title or handle it in a way that fits your application)
    return {
      title: "Default Title",
      openGraph: {
        images: [], // Provide default images array if necessary
      },
    };
  }
}

export default function Post({ params }: PageProps) {
  return (
    <>
      <Blog
        params={{
          slug: params.slug,
          category: params.category,
        }}
      />
    </>
  );
}
