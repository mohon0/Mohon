"use client";
import Loading from "@/components/common/loading/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchApplicationData } from "../fetch/get/application/FetchApplicationData";

interface Post {
  id: string;
  firstName: string;
  lastName: string;
  duration: string;
  image: string;
  course: string;
  status: string;
  createdAt: string;
}

function formatDate(isoDateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const date: Date = new Date(isoDateString);
  return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
}

export default function ApplicationModel() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const router = useRouter();
  const { status } = useSession();

  const { isLoading, data, isError, refetch } = FetchApplicationData();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    <p>Error Loading page.</p>;
  }

  const handleDelete = async () => {
    if (data.id) {
      // Open the confirmation modal
      setShowConfirmation(true);
    } else {
      console.error("Application is null. Cannot delete.");
    }
  };

  const confirmDelete = async () => {
    if (data.id) {
      // Perform the delete operation
      toast.loading("Please wait while deleting this application");

      try {
        const response = await fetch(`/api/application?id=${data.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          toast.dismiss();
          toast.success("Application deleted successfully");
          refetch();
        } else {
          toast.error("Error deleting post");
          console.error("Error deleting the Application");
        }
      } catch (error) {
        toast.error("Error deleting application");
        console.error("Error deleting the application", error);
      }
      // Close the confirmation modal
      setShowConfirmation(false);
    } else {
      console.error("Application is null. Cannot confirm delete.");
    }
  };

  return (
    <div>
      {!isLoading && status === "authenticated" ? (
        data && data !== "No Application Found" ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl font-bold">
                Your application has already been submitted
              </p>

              <div className="border-primary-200 mx-2 mt-16 flex w-full flex-col gap-2 rounded-lg border bg-gray-950 p-3 md:w-1/3 lg:w-1/4">
                <div className="mb-3 flex justify-between">
                  <Image
                    src={data.image}
                    alt=""
                    width={200}
                    height={200}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <button
                    onClick={handleDelete}
                    className="h-10 rounded-md bg-red-600 px-4"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-primary-100 mb-2 text-xl font-bold">
                  Name: {data.firstName} {data.lastName}
                </p>
                <p>
                  <span className="text-primary-200 font-bold">Course: </span>
                  <span>{data.course}</span>{" "}
                </p>
                <p>
                  <span className="text-primary-200 font-bold">Type: </span>
                  <span>{data.duration}</span>
                </p>
                <p>
                  <span className="text-primary-200 font-bold">Date: </span>
                  <span>{formatDate(data.createdAt)}</span>
                </p>
                <p>
                  <span>Status: </span>
                  <span
                    className={
                      data.status === "Pending"
                        ? "font-bold text-yellow-500"
                        : data.status === "Approved"
                          ? "font-bold text-green-500"
                          : data.status === "Rejected"
                            ? "font-bold text-red-500"
                            : "font-bold"
                    }
                  >
                    {data.status}
                  </span>
                </p>
                <Link
                  href={`/application-list/singleapplication/${data.id}`}
                  className="border-primary-100 hover:text-primary-100 flex items-center justify-center rounded border bg-black px-4 py-1.5"
                >
                  View Details
                </Link>
              </div>
            </div>
            {showConfirmation && (
              <div className="fixed inset-0 z-50  flex h-screen w-screen items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
                <div className="w-11/12 rounded-lg bg-blue-950 p-6 shadow-md md:w-3/4 lg:w-2/6">
                  <p className="text-xl">
                    Are you sure you want to delete this Application? This
                    Action can not be undone.
                  </p>
                  <p className="text-red-600">You will not be refunded.</p>
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="mr-4 rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            )}
          </>
        ) : (
          ""
        )
      ) : status !== "authenticated" ? (
        <div className="flex flex-col gap-10 text-center text-2xl font-bold">
          <p>You are not logged in. Log in to access this page.</p>
          <Link href="/signin" className="rounded border bg-blue-950 px-8 py-2">
            Log in
          </Link>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
