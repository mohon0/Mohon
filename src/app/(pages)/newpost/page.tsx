"use client";
import FileInput from "@/components/common/input/FileInput";
import PostInput from "@/components/common/input/PostInput";
import Content from "@/components/common/post/Content";
import NewPostCategories from "@/components/common/post/NewPostCategory";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NewPostValidation from "@/components/validation/NewPostValidation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [validationFailed, setValidationFailed] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/signin");
    }
  }, [status, session, router]);

  async function createNewPost(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const errors = NewPostValidation({
      title,
      categories,
      content,
      files,
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors as { [key: string]: string });
      setValidationFailed(true);
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    if (files) {
      data.append("file", files[0]);
    }
    data.append("categories", categories);

    const loadingToastId = toast.loading("Creating your post...", {
      autoClose: false,
      theme: "dark",
    });
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      toast.dismiss(loadingToastId);
      if (response.ok) {
        toast.success("Post is added successfully");
        router.push("/dashboard");
      } else {
        toast.error("Couldn't save your post. Please try again later");
      }
    } catch (error) {
      console.error(error);
      toast.error("Couldn't save your post. Please try again later");
    }
  }

  return (
    <Card className="mx-auto max-w-3xl p-2 md:p-6">
      <div className="mb-8 flex flex-col items-center justify-center gap-2">
        <p className="text-3xl font-bold text-primary">Create New Post </p>
        <span className="flex h-1 w-40 bg-primary"></span>
      </div>
      <form
        className="flex w-full flex-col justify-center gap-6"
        onSubmit={createNewPost}
      >
        <PostInput
          label="Title"
          id="title"
          value={title}
          type="text"
          onChange={(ev) => setTitle(ev.target.value)}
          error={errors.title}
          maxLength={70}
        />

        <FileInput
          onChange={(ev) => setFiles(ev.target.files)}
          error={errors.files}
        />

        <NewPostCategories
          onChange={(ev) => setCategories(ev.target.value)}
          error={errors.categories}
        />
        <Content
          onChange={(newValue) => setContent(newValue)}
          error={errors.content}
          value={content}
        />

        <Button>Create Post</Button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </Card>
  );
}
