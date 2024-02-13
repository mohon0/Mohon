"use client";
import useFormattedDate from "@/components/helper/hooks/useFormatedDate";
import Image from "next/image";
import Link from "next/link"; // Assuming you're using Link from next.js
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  application: {
    id: string;
    firstName: string;
    lastName: string;
    duration: string;
    image: string;
    course: string;
    status: string;
    createdAt: string;
  };
}

const ApplicationDataModel: React.FC<Props> = ({ application }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formattedDate = useFormattedDate(application.createdAt);
  const router = useRouter();

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
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
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
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl font-bold">
          Your application has already been submitted
        </p>

        <div className="mx-2 mt-16 flex w-full flex-col gap-2 rounded-lg border border-primary-200 bg-gray-950 p-3 md:w-1/3 lg:w-1/4">
          <div className="mb-3 flex justify-between">
            <Image
              src={application.image}
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
          <p className="mb-2 text-xl font-bold text-primary-100">
            Name: {application.firstName} {application.lastName}
          </p>
          <p>
            {" "}
            <span className="font-bold text-primary-200">Course: </span>
            <span>{application.course}</span>{" "}
          </p>
          <p>
            <span className="font-bold text-primary-200">Type: </span>
            <span>{application.duration}</span>
          </p>
          <p>
            <span className="font-bold text-primary-200">Date: </span>
            <span>{formattedDate}</span>
          </p>
          <p>
            <span>Status: </span>
            <span
              className={
                application.status === "Pending"
                  ? "font-bold text-yellow-500"
                  : application.status === "Approved"
                    ? "font-bold text-green-500"
                    : application.status === "Rejected"
                      ? "font-bold text-red-500"
                      : "font-bold"
              }
            >
              {application.status}
            </span>
          </p>
          <Link
            href={`/application-list/singleapplication/${application.id}`}
            className="flex items-center justify-center rounded border border-primary-100 bg-black px-4 py-1.5 hover:text-primary-100"
          >
            View Details
          </Link>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 z-50  flex h-screen w-screen items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
          <div className="w-11/12 rounded-lg bg-blue-950 p-6 shadow-md md:w-3/4 lg:w-2/6">
            <p className="text-xl">
              Are you sure you want to delete this Application? This Action can
              not be undone.
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
  );
};

export default ApplicationDataModel;
