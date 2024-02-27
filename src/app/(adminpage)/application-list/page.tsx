"use client";
import Loading from "@/components/common/loading/Loading";
import PaginationList from "@/components/core/PaginationList";
import { FetchAllApplication } from "@/components/fetch/get/application/FetchAllApplication";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
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

export default function List() {
  const { status, data: session } = useSession();

  const [action, setAction] = useState("");
  const [key, setKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const email = session?.user?.email;
  const admin = process.env.NEXT_PUBLIC_ADMIN;
  const pageSize = 12;

  const { data, isLoading, isError } = FetchAllApplication({
    currentPage,
    pageSize,
    selectedCategory,
    sortBy,
    searchInput,
  });

  const totalPostsCount = data?.totalPostsCount || 1;
  const totalPages = Math.ceil(totalPostsCount / pageSize);

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
          response.status,
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

  const jumpToPageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="mx-2">
      <div>
        <div className="text-center text-3xl font-bold md:text-5xl">
          All Application
        </div>
        <div className="my-10 flex w-full flex-col items-center justify-center gap-10 md:flex-row">
          {/* Filter by category dropdown */}
          <div className="flex items-center justify-center gap-2 rounded-full border px-4 py-2">
            <Label htmlFor="filter">FilterBy:</Label>
            <select
              id="filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-32 bg-[#000119] px-2 py-2"
            >
              <option value="all">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          {/* Sort by dropdown */}
          <div className="flex items-center justify-center gap-2  rounded-full border px-4 py-2">
            <label htmlFor="sortPosts">SortBy:</label>
            <select
              id="sortPosts"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-24 bg-[#000119] px-2 py-2"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="relative flex items-center md:w-1/2">
            <input
              type="text"
              className="h-[3.2rem] w-full rounded-full border bg-transparent px-4 outline-none focus-within:border-primary-200 focus-within:outline-none"
              placeholder="Search by applicant name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <div className=" absolute right-4 text-xl">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>
      {email === admin ? (
        <>
          {isLoading ? (
            <div>
              <Loading />
            </div>
          ) : isError ? (
            <div>
              <p>Error loading applications. No Application Found.</p>
            </div>
          ) : data.application && data.application.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-20">
                {data.application.map((app: Post) => (
                  <div
                    key={app.id}
                    className="flex w-full flex-col justify-between rounded-lg border p-4"
                  >
                    <Image
                      src={app.image}
                      alt=""
                      height={200}
                      width={200}
                      className="mx-auto mb-4 h-20 w-20 rounded-full"
                    />

                    <div className="flex flex-col">
                      <p className="mb-2 text-xl font-bold text-primary">
                        Name: {app.firstName} {app.lastName}
                      </p>
                      <p>
                        <span className="font-bold text-secondary-foreground">
                          Course:{" "}
                        </span>
                        <span>{app.course}</span>{" "}
                      </p>
                      <p>
                        <span className="font-bold text-secondary-foreground">
                          Type:{" "}
                        </span>
                        <span>{app.duration}</span>
                      </p>
                      <p>
                        <span className="font-bold text-secondary-foreground">
                          Date:{" "}
                        </span>
                        <span>{formatDate(app.createdAt)}</span>
                      </p>

                      <p>
                        <span>Status: </span>
                        <span
                          className={
                            app.status === "Pending"
                              ? "font-bold text-yellow-500"
                              : app.status === "Approved"
                                ? "font-bold text-green-500"
                                : app.status === "Rejected"
                                  ? "font-bold text-red-500"
                                  : "font-bold"
                          }
                        >
                          {app.status}
                        </span>
                      </p>

                      <div className="mt-4 flex gap-2">
                        <div>
                          <ActionSelect
                            selectedValue={action}
                            onValueChange={handelActionChange}
                          />
                        </div>
                        <Button
                          onClick={() =>
                            UpdateApplication({ status: action, id: app.id })
                          }
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                    <Link
                      href={`/application-list/singleapplication/${app.id}`}
                      className="mt-6 flex w-full"
                    >
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <PaginationList
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    Number(data.totalPostsCount) / pageSize,
                  )}
                  setCurrentPage={(newPage) => setCurrentPage(newPage)}
                />
              </div>

              <ToastContainer position="top-center" autoClose={3000} />
            </div>
          ) : isError ? (
            <p>{"Error Loading Application"}</p>
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