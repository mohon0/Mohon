import Blog from "@/components/blog/Blog";
import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: { slug: string; category: string };
}

const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category, slug } = params;

  try {
    const response = await fetch(`${siteurl}/api/${category}/${slug}`);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok (${response.status} ${response.statusText})`
      );
    }

    const post = await response.json();

    // Optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: post.title || "Blog Post",
      description: post.content.slice(0, 100) || "This is a blog post",
      openGraph: {
        title: post.title || "Blog Post",
        description: post.content.slice(0, 100) || "This is a blog post",
        type: "article",
        url: `${siteurl}/category/${category}/${slug}`,
        authors: post.author.name,
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        section: post.category,
        images: [
          {
            url: new URL(post.coverImage, siteurl).toString(),
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);

    // Handle specific error cases or set a default title based on the error
    let defaultTitle = "Default Title";
    if (error instanceof Error) {
      if (error.message.includes("not ok")) {
        defaultTitle = "Network Error";
      }
    }

    return {
      title: "Blog Post",
      openGraph: {
        images: [],
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
