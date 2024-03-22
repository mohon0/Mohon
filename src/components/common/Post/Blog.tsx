"use client";
import AuthorCard from "@/components/common/Post/AuthorCard";
import Loading from "@/components/common/loading/Loading";
import CommentForm from "@/components/core/Comment";
import SocialShare from "@/components/core/SocialShare";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchSinglePost } from "../../fetch/get/blog/FetchSinglePost";
import styles from "./PostContent.module.css";

interface PageProps {
  params: { slug: string; category: string };
}

export default function Blog({ params }: PageProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const { isLoading, data, isError } = FetchSinglePost({
    category: params.category,
    slug: params.slug,
  });

  if (isLoading) {
    return (
      <div className="my-20">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div className="my-20">Error Fetching Post</div>;
  }

  if (data.length < 0) {
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

  const confirmDelete = async () => {
    toast.loading("Please wait...");
    try {
      const response = await fetch(`/api/post?postId=${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.dismiss();
        toast.success("Post deleted successfully");
        router.push("/blog/page/1");
      } else {
        toast.error("Error deleting post");
      }
    } catch (error) {
      toast.error("Error deleting post");
    }
  };

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
    link.href = data.coverImage;
    link.download = "downloaded_image.jpg";
    link.click();
  };

  const inputString = data.category;
  const formattedCategory = formatString(inputString);

  const userInfo = session?.user?.email;

  return (
    <>
      <div>
        <div className="m-2 flex flex-col gap-6 lg:m-10 lg:flex-row">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-extrabold text-primary  md:text-4xl">
                {data.title}
              </h1>
              <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <div>
                  <span className="flex text-sm">
                    <span className="text-sm ">
                      This Post Last Was Updated By{" "}
                      <Link href={`/users/${data.author.id}`}>
                        <span className="px-1 text-lg font-medium ">
                          {data.author.name}
                        </span>{" "}
                      </Link>
                      At{" "}
                      <span className=" font-medium">
                        {formatDate(data.updatedAt)}
                      </span>
                    </span>
                  </span>
                </div>

                <Link href={`/blog/category/${data.category}`}>
                  <Button variant="outline" className="w-fit">
                    {formattedCategory}
                  </Button>
                </Link>

                <div className="flex flex-col items-center gap-6 md:flex-row">
                  {userInfo === data.author.email && (
                    <div className="mx-auto flex items-center justify-center gap-4 md:justify-end">
                      <Link
                        href={`/editpost/${params.category}/${params.slug}`}
                      >
                        <Button>Edit Post</Button>
                      </Link>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive">Delete Post</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Delete Post</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this post? This
                              Action can not be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={confirmDelete}
                              >
                                Delete
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mx-auto flex justify-center">
              <div className="absolute mx-auto flex h-[30rem] w-11/12 items-center justify-center rounded-sm bg-secondary p-1 lg:w-9/12 lg:p-4">
                <Image
                  src={`${data.coverImage}`}
                  alt=""
                  fill={true}
                  className="object-scale-down"
                />
              </div>
            </div>

            <div className="mt-[32rem]">
              <Button
                onClick={handleDownload}
                className="mx-auto my-6 flex items-center justify-center"
              >
                Download Image
              </Button>
              <div
                className={`mb-12 mt-10 list-decimal rounded-lg md:mx-0 md:mt-16 md:text-lg ${styles["post-content"]}`}
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
              <div className="my-8">
                <SocialShare
                  yourPostUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/category/${params.category}/${params.slug}`}
                />
              </div>
            </div>
          </div>
          <div className="right-4 top-20 mx-auto my-10 h-fit w-full rounded-lg  border md:w-80 lg:sticky lg:my-0 lg:w-60">
            <AuthorCard
              name={data.author.name}
              image={data.author.image}
              id={data.author.id}
            />
          </div>
        </div>
        <div className="mx-1 md:mx-10">
          <CommentForm postId={data.id} />
        </div>
        <ToastContainer position="top-center" theme="dark" />
      </div>
    </>
  );
}
