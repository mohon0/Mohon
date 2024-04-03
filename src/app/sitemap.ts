import { Options } from "@/components/common/Post/Options";
import { BlogPostType } from "@/components/type/BlogPostType";

const base = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap() {
  const encodeForUrl = (str: string) => {
    return encodeURIComponent(str).toLowerCase().replace(/%20/g, "_");
  };

  const postCategory = Options.map((category) => ({
    url: `${base}/blog/category/${encodeForUrl(category)}`,
  }));

  const staticUrls = [
    { url: `${base}/about` },
    { url: `${base}/signin` },
    { url: `${base}/signup` },
  ];

  try {
    const response = await fetch(
      `${base}/api/allpost?page=1&pageSize=100&category=all&sortBy=newest&search=`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const { posts } = await response.json();

    if (!Array.isArray(posts)) {
      throw new Error("Invalid blog post data");
    }

    const postUrls = posts.map((post: BlogPostType) => ({
      url: `${base}/blog/category/${encodeForUrl(post.category)}/${encodeForUrl(post.title)}`,
      lastModified: new Date(post.updatedAt),
    }));

    return [...postUrls, ...postCategory, ...staticUrls];
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return [];
  }
}
