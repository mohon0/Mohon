import Blog from "@/components/common/Post/Blog";
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: { slug: string; category: string };
}

function stripHtmlTags(html: string) {
  return html.replace(/(<([^>]+)>)/gi, "");
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, slug } = params;
  const siteurl = process.env.NEXT_PUBLIC_SITE_URL;
  const response = await axios.get(`${siteurl}/api/${category}/${slug}`);
  const cleanedContent = stripHtmlTags(response.data.content);
  const dynamicDescription = cleanedContent.substring(0, 150);

  function convertImageUrl(
    originalUrl: string,
    host: string,
    width: number,
    quality: number,
  ): string {
    // Extracting path, query, and token from the original URL
    const urlParts = new URL(originalUrl);
    const path = urlParts.pathname;
    const query = urlParts.searchParams.toString();
    const token = urlParts.searchParams.get("token");

    // Constructing the new URL with the desired format
    const newUrl = `${host}/_next/image?url=${encodeURIComponent(`${urlParts.origin}${path}?${query}`)}&w=${width}&q=${quality}`;

    return newUrl;
  }

  // Example usage
  const originalUrl = response.data.coverImage;
  const host =
    process.env.NEXT_PUBLIC_SITE_URL || "https://freelancermohon.online";
  const width = 1920;
  const quality = 75;
  const convertedUrl = convertImageUrl(originalUrl, host, width, quality);

  return {
    title: response.data.title || "Blog Post",
    description: dynamicDescription || "This is a blog post",
    alternates: {
      canonical: `/blog/category/${category}/${slug}`,
    },
    openGraph: {
      title: response.data.title || "Blog Post",
      description: dynamicDescription || "This is a blog post",
      type: "article",
      url: `${siteurl}/blog/category/${category}/${slug}`,
      authors: response.data.author.name,
      publishedTime: response.data.createdAt,
      modifiedTime: response.data.updatedAt,
      section: response.data.category,

      images: [
        {
          url: convertedUrl,
          alt: response.data.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: response.data.title,
      description: dynamicDescription,
    },
  };
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
