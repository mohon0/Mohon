"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchAllApplication } from "@/components/fetch/get/application/FetchAllApplication";
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
  const pageSize = 9;

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
    <div className="mx-2 lg:mx-20">
      <div className="mt-28">
        <div className="text-center text-3xl font-bold md:text-5xl">
          All Application
        </div>
        <div className="my-10 flex w-full flex-col items-center justify-center gap-10 md:flex-row">
          {/* Filter by category dropdown */}
          <div className="flex items-center justify-center gap-2 rounded-full border px-4 py-2">
            <label htmlFor="filter">FilterBy:</label>
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
                    className="w-full rounded-lg  border border-gray-500 p-4"
                  >
                    <div>
                      <div className="mb-6 flex items-center justify-center">
                        <Image
                          src={app.image}
                          alt=""
                          height={200}
                          width={200}
                          className="h-20 w-20 rounded-full"
                        />
                      </div>
                      <p className="mb-2 text-xl font-bold text-primary-100">
                        Name: {app.firstName} {app.lastName}
                      </p>
                      <p>
                        <span className="font-bold text-primary-200">
                          Course:{" "}
                        </span>
                        <span>{app.course}</span>{" "}
                      </p>
                      <p>
                        <span className="font-bold text-primary-200">
                          Type:{" "}
                        </span>
                        <span>{app.duration}</span>
                      </p>
                      <p>
                        <span className="font-bold text-primary-200">
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
                        <button
                          onClick={() =>
                            UpdateApplication({ status: action, id: app.id })
                          }
                          className="rounded bg-primary-200 px-4 py-1.5 text-black"
                        >
                          Submit
                        </button>
                      </div>

                      <Link
                        href={`/application-list/singleapplication/${app.id}`}
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-primary-100 px-4 py-2 hover:text-primary-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage === 1}
                    className={`rounded-md px-4 py-2 ${
                      currentPage === 1
                        ? "cursor-not-allowed bg-gray-500"
                        : "cursor-pointer bg-gray-700 text-white"
                    }`}
                  >
                    Prev
                  </button>
                  <div className="relative">
                    <select
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className="rounded-md bg-gray-600 px-4 py-2 focus:outline-none"
                    >
                      {jumpToPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`rounded-md px-4 py-2 ${
                        currentPage === index + 1
                          ? "border bg-blue-950"
                          : "bg-gray-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`rounded-md px-4 py-2 ${
                      currentPage === totalPages
                        ? "cursor-not-allowed bg-gray-500"
                        : "cursor-pointer bg-gray-700 text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
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
