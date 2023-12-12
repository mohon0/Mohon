"use client";
import Application from "@/components/application/Application";
import Notice from "@/components/application/Notice";
import Loading from "@/components/common/loading/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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

export default function Apply() {
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<Post | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [data, setData] = useState("");

  const router = useRouter();
  const { status, data: session } = useSession();

  useEffect(() => {
    const apiUrl = `api/visibility`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data.button);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    if (status !== "authenticated") {
      setIsLoading(false);
      return;
    }
    const apiUrl = `/api/application`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((postInfo: Post) => {
        setApplication(postInfo);
      })
      .catch((error) => {
        console.error("Error fetching application data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [status]);

  const handleDelete = async () => {
    if (application) {
      // Open the confirmation modal
      setShowConfirmation(true);
    } else {
      console.error("Application is null. Cannot delete.");
    }
  };

  const confirmDelete = async () => {
    if (application) {
      // Perform the delete operation
      toast.loading("Please wait while deleting this application");

      try {
        const response = await fetch(`/api/application?id=${application.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          toast.dismiss();
          toast.success("Application deleted successfully");
          console.log(response);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
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
      {data === "Apply" ? (
        <div>
          {!isLoading && status === "authenticated" ? (
            application ? (
              <>
                <div className="flex items-center justify-center flex-col">
                  <p className="text-xl font-bold">
                    Your application has already been submitted
                  </p>

                  <div className="bg-gray-950 border-primary-200 w-full mx-2 md:w-1/3 lg:w-1/4 border rounded-lg mt-16 flex p-3 flex-col gap-2">
                    <div className="flex justify-between mb-3">
                      <Image
                        src={application.image}
                        alt=""
                        width={200}
                        height={200}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <button
                        onClick={handleDelete}
                        className="bg-red-600 px-4 h-10 rounded-md"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="font-bold text-xl mb-2 text-primary-100">
                      Name: {application.firstName} {application.lastName}
                    </p>
                    <p>
                      <span className="text-primary-200 font-bold">
                        Course:{" "}
                      </span>
                      <span>{application.course}</span>{" "}
                    </p>
                    <p>
                      <span className="text-primary-200 font-bold">Type: </span>
                      <span>{application.duration}</span>
                    </p>
                    <p>
                      <span className="text-primary-200 font-bold">Date: </span>
                      <span>{formatDate(application.createdAt)}</span>
                    </p>
                    <p>
                      <span>Status: </span>
                      <span
                        className={
                          application.status === "Pending"
                            ? "text-yellow-500 font-bold"
                            : application.status === "Approved"
                            ? "text-green-500 font-bold"
                            : application.status === "Rejected"
                            ? "text-red-500 font-bold"
                            : "font-bold"
                        }
                      >
                        {application.status}
                      </span>
                    </p>
                    <Link
                      href={`/application-list/singleapplication/${application.id}`}
                      className="border-primary-100 border px-4 py-1.5 rounded bg-black hover:text-primary-100 flex items-center justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                {showConfirmation && (
                  <div className="fixed w-screen inset-0  h-screen flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50  z-50">
                    <div className="bg-blue-950 p-6 w-11/12 md:w-3/4 lg:w-2/6 rounded-lg shadow-md">
                      <p className="text-xl">
                        Are you sure you want to delete this Application? This
                        Action can not be undone.
                      </p>
                      <p className="text-red-600">You will not be refunded.</p>
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
                    <ToastContainer position="top-center" autoClose={3000} />
                  </div>
                )}
              </>
            ) : (
              <div>
                <div className=" mb-10 mt-24 font-bold text-xl">
                  <Notice />
                </div>
                <Application />
              </div>
            )
          ) : status !== "authenticated" ? (
            <div className="text-center font-bold flex flex-col gap-10 text-2xl">
              <p>You are not logged in. Log in to access this page.</p>
              <Link
                href="/signin"
                className="bg-blue-950 border px-8 py-2 rounded"
              >
                Log in
              </Link>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center mx-auto border w-full m-2 lg:m-10 lg:w-1/4">
          {" "}
          Application date is over. Please wait for next circular or you can
          contact us.
        </div>
      )}
    </div>
  );
}
