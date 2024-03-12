"use client";
import Categories from "@/components/common/Post/Categories";
import PostContent from "@/components/common/Post/PostContent";
import FormikInput from "@/components/common/input/FormikInput";
import Loading from "@/components/common/loading/Loading";
import { FetchSinglePost } from "@/components/fetch/get/blog/FetchSinglePost";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

interface PageProps {
  params: { slug: string; category: string };
}

function EditPost({ params }: PageProps) {
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { status, data: session } = useSession();
  const admin = process.env.NEXT_PUBLIC_ADMIN;
  const { isLoading, data, isError } = FetchSinglePost({
    category: params.category,
    slug: params.slug,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error fetching post</div>;
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <div>Unauthenticated</div>;
  }

  if (session?.user?.email !== admin) {
    return <div>You are not authorized to access this page.</div>;
  }

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  // Function to properly encode a string for URLs
  const encodeForUrl = (str: string) => {
    return encodeURIComponent(str.replace(/\s+/g, "_")).toLowerCase();
  };

  return (
    <Formik
      initialValues={{
        title: data.title,
        categories: data.category,
        content: data.content,
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .matches(
            /^[a-zA-Z0-9\s,\u0980-\u09FF]+$/,
            "Title can not contain special characters",
          )
          .min(4, "Title Must be at least 4 characters")
          .max(80, "Title can not be more than 80 characters")
          .required("Title is required"),
        categories: Yup.string().required("Category is required"),
        content: Yup.string(),
      })}
      onSubmit={async (values) => {
        try {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("categories", values.categories);
          formData.append("content", values.content);
          formData.append("id", data.id);
          formData.append("userId", data.author.id);
          if (image) {
            formData.append("image", image as Blob);
          }

          toast.loading("Please wait...");

          const response = await axios.put("/api/post", formData);

          console.log(response);
          if (response.status === 200) {
            toast.dismiss();
            toast.success("Updated Successfully 🎉");
            const uri = response.data.title;
            const category = response.data.category;
            const encodedUri = uri ? encodeForUrl(uri) : "";
            const encodedCategory = category ? encodeForUrl(category) : "";
            setTimeout(() => {
              router.push(`/blog/category/${encodedCategory}/${encodedUri}`);
            }, 1000);
          }
        } catch (error) {
          toast.dismiss();
          toast.error("Error while updating.");
        }
      }}
    >
      <Form>
        <Card className="mx-1 w-full md:mx-auto md:w-10/12 lg:w-9/12">
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-3xl">Update Post</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormikInput label="Title:" name="title" type="text" id="title" />
            <div className="flex flex-col gap-1.5">
              <Label>Featured Image:</Label>
              <input
                type="file"
                onChange={(event) => handleImage(event)}
                className="rounded-md border p-2"
              />
            </div>
            <Label>Categories:</Label>
            <Categories value={data.category} name="categories" />
            <div>
              <Label>Post Content:</Label>
              <PostContent />
            </div>
            -
            <Button type="submit" className="mt-10">
              Update Post
            </Button>
          </CardContent>
          <ToastContainer position="top-center" theme="dark" />
        </Card>
      </Form>
    </Formik>
  );
}

export default EditPost;
