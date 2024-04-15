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
      url: `${siteurl}/blog/${category}/${slug}`,
      authors: response.data.author.name,
      publishedTime: response.data.createdAt,
      modifiedTime: response.data.updatedAt,
      section: response.data.category,

      images: [
        {
          url: response.data.coverImage,
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
