"use client";
import Application from "@/components/application/page";
import Loading from "@/components/common/loading/Loading";
import Image from "next/image";
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
}

export default function Apply() {
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<Post | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const router = useRouter();

  useEffect(() => {
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
  }, []);

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
        const response = await fetch(
          `/api/application?applicationId=${application.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          toast.dismiss();
          toast.success("Application deleted successfully");
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
      {isLoading ? (
        // Render a loading indicator or message while fetching data
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : application ? (
        <>
          <div className="flex items-center justify-center flex-col">
            <p className="text-xl font-bold">
              Your application has already been submitted
            </p>

            <div className="bg-gray-900 w-1/4 border rounded-lg mt-16 flex p-3 flex-col gap-2">
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
              <p>
                Name: {application.firstName} {application.lastName}
              </p>
              <p>Course: {application.course}</p>
              <p>Type: {application.duration}</p>
              <p>Status: {application.status}</p>
            </div>
          </div>
          {showConfirmation && (
            <div className="fixed w-screen inset-0  h-screen flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50  z-50">
              <div className="bg-blue-950 p-6 w-11/12 md:w-3/4 lg:w-2/6 rounded-lg shadow-md">
                <p className="text-xl">
                  Are you sure you want to delete this Application? This Action
                  can not be undone.
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
        <Application />
      )}
    </div>
  );
}
