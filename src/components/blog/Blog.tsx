"use client";
import AuthorCard from "@/components/card/AuthorCard";
import Loading from "@/components/common/loading/Loading";
import CommentForm from "@/components/core/Comment";
import SocialShare from "@/components/core/SocialShare";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./PostContent.module.css";

interface PageProps {
  params: { slug: string; category: string };
}

interface Post {
  id: string;
  content: string;
  title: string;
  author: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
  category: string;
  coverImage: string;
}

export default function Blog({ params }: PageProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postUrl, setPostUrl] = useState<string>("");
  useEffect(() => {
    const currentUrl = window.location.href;
    setPostUrl(currentUrl);
  }, []);

  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = `/api/${params.category}/${params.slug}`;

    setError(null);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((postInfo: Post) => {
        setPost(postInfo);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching the post.");
        setIsLoading(false);
      });
  }, [params.category, params.slug]);

  if (isLoading) {
    return (
      <div className="my-20">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="my-20">{error}</div>;
  }

  if (!post) {
    return <div className="my-20">Post not found</div>;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const day = formattedDate.split(" ")[0];
    const month = formattedDate.split(" ")[1];
    const year = formattedDate.split(" ")[2];
    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  const daySuffix = (day: string): string => {
    if (+day >= 11 && +day <= 13) {
      return "th";
    }
    switch (+day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const handleDelete = async () => {
    // Open the confirmation modal
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    // Perform the delete operation
    toast.loading("Please wait while deleting this post");
    try {
      const response = await fetch(`/api/post?postId=${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.dismiss();
        toast.success("Post deleted successfully");
        // Handle successful deletion, e.g., redirect to another page
        router.push("/blog"); // Redirect to the home page or another suitable page
      } else {
        toast.error("Error deleting post");
        // Handle errors, e.g., show an error message
        console.error("Error deleting the post");
      }
    } catch (error) {
      toast.error("Error deleting post");
      console.error("Error deleting the post:", error);
    }
    // Close the confirmation modal
    setShowConfirmation(false);
  };

  function stripHtmlTags(html: string) {
    return html.replace(/(<([^>]+)>)/gi, "");
  }

  function formatString(inputString: string) {
    // Split the inputString by underscores
    const words = inputString.split("_");

    // Capitalize the first letter of each word and join them with a space
    const formattedString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return formattedString;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = post.coverImage;
    link.download = "downloaded_image.jpg";
    link.click();
  };

  const inputString = post.category;
  const formattedCategory = formatString(inputString);

  const cleanedContent = stripHtmlTags(post.content);

  const userInfo = session?.user?.email;
  const dynamicDescription = cleanedContent.substring(0, 150);
  return (
    <>
      <div>
        <div className="lg:m-10 m-2 flex-col lg:flex-row flex gap-6">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl md:text-4xl text-primary-200  font-extrabold">
                {post.title}
              </h1>
              <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <div>
                  <span className="flex text-sm">
                    <span className="text-sm ">
                      This Post Last Was Updated By{" "}
                      <Link href={`/users/${post.author.id}`}>
                        <span className="px-1 text-lg font-medium ">
                          {post.author.name}
                        </span>{" "}
                      </Link>
                      At{" "}
                      <span className=" font-medium">
                        {formatDate(post.updatedAt)}
                      </span>
                    </span>
                  </span>
                </div>
                <div>
                  <div>
                    <button className="mr-10 rounded-tl-2xl rounded-br-2xl border-2 border-primary-200 px-4 py-1">
                      {formattedCategory}
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex flex-col items-center gap-6 md:flex-row">
                  {userInfo === post.author.email && (
                    <div className="mx-auto flex items-center justify-center md:justify-end gap-4">
                      <div>
                        <Link
                          href={`/editpost/${params.category}/${params.slug}`}
                          className="px-8 h-10 flex items-center justify-center rounded-md bg-blue-700 hover:bg-blue-800"
                        >
                          Edit Post
                        </Link>
                      </div>
                      <button
                        onClick={handleDelete}
                        className="px-7 h-10 flex items-center justify-center rounded-md bg-red-500 hover:bg-red-600"
                      >
                        Delete Post
                      </button>
                    </div>
                  )}

                  {showConfirmation && (
                    <div className="fixed w-screen inset-0  h-screen flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50  z-50">
                      <div className="bg-blue-950 p-6 w-11/12 md:w-3/4 lg:w-2/6 rounded-lg shadow-md">
                        <p className="text-xl">
                          Are you sure you want to delete this post? This Action
                          can not be undone.
                        </p>
                        <div className="flex justify-end mt-8">
                          <button
                            onClick={() => setShowConfirmation(false)}
                            className="px-4 py-2 mr-4 bg-gray-600 hover:bg-gray-700 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                          >
                            Confirm Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Image
              className="mx-auto rounded-lg w-full h-fit"
              src={`${post.coverImage}`}
              alt=""
              width={1000}
              height={1000}
            />
            <button
              onClick={handleDownload}
              className="px-5 mx-auto my-6 flex items-center justify-center py-2 rounded-md text-sm font-bold text-primary-200 border border-primary-200"
            >
              Download Image
            </button>
            <div
              className={`mt-10 mb-12 rounded-lg md:mx-0 md:mt-16 md:text-lg ${styles["post-content"]}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="my-8">
              <SocialShare
                yourPostUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.category}/${params.slug}`}
              />
            </div>
          </div>
          <div className="h-fit border mx-auto my-10 lg:my-0 border-gray-600 rounded-lg  w-full md:w-80 lg:w-60 lg:sticky top-20 right-4">
            <AuthorCard
              name={post.author.name}
              image={post.author.image}
              id={post.author.id}
            />
          </div>
        </div>
        <div>
          <CommentForm postId={post.id} />
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </>
  );
}
