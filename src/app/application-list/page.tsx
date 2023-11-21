"use client";
import Loading from "@/components/common/loading/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ActionSelect } from "./DropDown";

interface Post {
  id: string;
  duration: string;
  firstName: string;
  lastName: string;
  course: string;
  image: string;
  status: string;
}

export default function List() {
  const { status, data: session } = useSession();
  const [applications, setApplications] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState("");
  const [key, setKey] = useState(0);

  const email = session?.user?.email;
  const admin = process.env.NEXT_PUBLIC_ADMIN;

  useEffect(() => {
    const apiUrl = `/api/apply`;

    setLoading(true);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setApplications(data.application);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching application data:", error);
        setError("Error fetching application data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key]);

  const handelActionChange = (value: string) => {
    if (value.trim() !== "") {
      setAction(value);
    } else {
      toast.error("Action cannot be empty");
      console.error("Action cannot be empty");
    }
  };

  async function UpdateApplication({
    status,
    id,
  }: {
    status: string;
    id: string;
  }) {
    const data = new FormData();
    data.set("status", status);
    if (id) {
      data.set("id", id);
    }

    // Use window.confirm to show a confirmation dialog
    const shouldDelete =
      action === "Delete"
        ? window.confirm("Are you sure you want to delete this application?")
        : true;

    if (!shouldDelete) {
      return; // If the user cancels, do nothing
    }

    toast.loading("Please wait while we update.");

    try {
      let response;

      if (action === "Delete") {
        response = await fetch(`/api/application?id=${id}`, {
          method: "DELETE",
          credentials: "include",
        });
      } else {
        response = await fetch(`/api/application`, {
          method: "PUT",
          body: data,
          credentials: "include",
        });
      }

      if (response.ok) {
        toast.dismiss();
        toast.success("Application Updated successfully");
        setKey((prevKey) => prevKey + 1);
      } else {
        console.error(
          "Failed to update the Application. Status:",
          response.status
        );
        toast.dismiss();
        toast.error("Application Updating failed");
      }
    } catch (error) {
      console.error("An error occurred while updating the post:", error);
      toast.dismiss();
      toast.error("An error occurred");
    }
  }

  return (
    <div className="mx-2 lg:mx-20">
      {email === admin ? (
        <>
          {loading ? (
            <div className="loading-spinner">
              <Loading />
            </div>
          ) : applications && applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              <div>
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-500  rounded-lg p-4 w-full"
                  >
                    <div>
                      <div className="flex justify-center items-center mb-6">
                        <Image
                          src={app.image}
                          alt=""
                          height={200}
                          width={200}
                          className="h-20 w-20 rounded-full"
                        />
                      </div>
                      <p className="font-bold text-xl mb-2 text-primary-100">
                        Name: {app.firstName} {app.lastName}
                      </p>
                      <p>
                        <span className="text-primary-200 font-bold">
                          Course:{" "}
                        </span>
                        <span>{app.course}</span>{" "}
                      </p>
                      <p>
                        <span className="text-primary-200 font-bold">
                          Type:{" "}
                        </span>
                        <span>{app.duration}</span>
                      </p>
                      <p>
                        <span>Status: </span>
                        <span
                          className={
                            app.status === "Pending"
                              ? "text-yellow-500 font-bold"
                              : app.status === "Approved"
                              ? "text-green-500 font-bold"
                              : app.status === "Rejected"
                              ? "text-red-500 font-bold"
                              : "font-bold"
                          }
                        >
                          {app.status}
                        </span>
                      </p>

                      <div className="flex gap-2 mt-4">
                        <div>
                          <ActionSelect
                            selectedValue={action}
                            onValueChange={handelActionChange}
                          />
                        </div>
                        <button
                          onClick={() =>
                            UpdateApplication({ status: action, id: app.id })
                          }
                          className="bg-primary-200 text-black rounded py-1.5 px-4"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <ToastContainer position="top-center" autoClose={3000} />
              </div>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>No application data available.</p>
          )}
        </>
      ) : (
        "You don't have permission to access this page."
      )}
    </div>
  );
}
