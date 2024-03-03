import Blog from "@/components/common/Post/Blog";
import { FetchSinglePost } from "@/components/fetch/get/blog/FetchSinglePost";
import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: { slug: string; category: string };
}

const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

function stripHtmlTags(html: string) {
  return html.replace(/(<([^>]+)>)/gi, "");
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, slug } = params;

  try {
    const { isLoading, data, isError } = FetchSinglePost({ category, slug });

    if (isLoading) {
      return {
        title: "Loading...",
        // You can provide a placeholder description or leave it empty
        description: "",
        openGraph: {
          // Provide a default URL or leave it empty
          url: "",
          // Provide a default image or leave it empty
          images: [],
        },
      };
    }

    if (isError) {
      return {
        title: "Error",
        description: "An error occurred while fetching the blog post.",
        openGraph: {
          // Provide a default URL or leave it empty
          url: "",
          // Provide a default image or leave it empty
          images: [],
        },
      };
    }

    const cleanedContent = stripHtmlTags(data.content);

    const dynamicDescription = cleanedContent.substring(0, 150);

    // Optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: data.title || "Blog Post",
      description: dynamicDescription || "This is a blog post",
      openGraph: {
        title: data.title || "Blog Post",
        description: dynamicDescription || "This is a blog post",
        type: "article",
        url: `${siteurl}/blog/${category}/${slug}`,
        authors: data.author.name,
        publishedTime: data.createdAt,
        modifiedTime: data.updatedAt,
        section: data.category,
        images: [
          {
            url: new URL(data.coverImage, siteurl).toString(),
            width: 1200,
            height: 630,
            alt: data.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: dynamicDescription,
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
