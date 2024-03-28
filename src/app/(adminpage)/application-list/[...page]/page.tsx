"use client";
import Loading from "@/components/common/loading/Loading";
import PaginationUi from "@/components/core/PaginationUi";
import { FetchAllApplication } from "@/components/fetch/get/application/FetchAllApplication";
import ActionSelect from "@/components/page/applicationlist/ActionSelect";
import CertificateSelect from "@/components/page/applicationlist/CertificateSelect";
import { ApplicationListType } from "@/components/type/ApplicationListType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function List() {
  const { data: session } = useSession();
  const params = useParams();
  const [page, setPage] = useState<number>(Number(params.page[1]) || 1);
  const [action, setAction] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const [certificate, setCertificate] = useState("");
  const email = session?.user?.email;
  const admin = process.env.NEXT_PUBLIC_ADMIN;
  const pageSize = 12;

  const { data, isError, refetch, isFetching } = FetchAllApplication({
    currentPage: page,
    pageSize,
    selectedCategory,
    sortBy,
    searchInput,
  });

  const handleActionChange = (value: string) => {
    if (!value.trim()) {
      toast.error("Action cannot be empty");
    } else {
      setAction(value);
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
    if (id) data.set("id", id);

    const shouldDelete =
      action === "Delete"
        ? window.confirm("Are you sure you want to delete this application?")
        : true;
    if (!shouldDelete) return;

    toast.loading("Please wait...");

    try {
      let response = await axios({
        method: action === "Delete" ? "DELETE" : "PUT",
        url:
          action === "Delete"
            ? `/api/application?id=${id}`
            : `/api/application`,
        data: action === "Delete" ? null : data,
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Application Updated successfully");
        refetch();
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

  const handleSelectChange = (value: string) => setSortBy(value);
  const handleFilterChange = (value: string) => setSelectedCategory(value);

  function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function handleCertificateChange(value: string) {
    if (!value.trim()) {
      toast.error("Action cannot be empty");
    } else {
      setCertificate(value);
    }
  }

  async function UpdateCertificate({
    id,
    status,
  }: {
    id: string;
    status: string;
  }) {
    toast.loading("Please wait...");
    const response = await axios.put("/api/application/application-list", {
      certificate: status,
      id: id,
    });

    toast.dismiss();
    if (response.status === 200) {
      toast.success("Updated certificate successfully");
    } else {
      toast.error("Error updating certificate");
    }
  }

  return (
    <div className="mx-2">
      <div className="text-center text-3xl font-bold md:text-5xl">
        All Application
      </div>
      <div className="my-10 flex w-full flex-col  items-center justify-center gap-3 md:flex-row md:gap-2 lg:gap-10">
        {/* Filter and Sort dropdowns */}
        {["FilterBy", "SortBy"].map((label, index) => (
          <Select
            key={index}
            onValueChange={
              index === 0 ? handleFilterChange : handleSelectChange
            }
            defaultValue={index === 0 ? "all" : "newest"}
          >
            <SelectTrigger className="w-60">
              <Label>{label}:</Label>
              <SelectValue placeholder={`Select ${label}:`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {index === 0
                  ? ["all", "Approved", "Pending", "Rejected"].map(
                      (value, idx) => (
                        <SelectItem
                          key={idx}
                          value={value}
                          onSelect={() => handleSelectChange(value)}
                        >
                          {value}
                        </SelectItem>
                      ),
                    )
                  : ["newest", "oldest"].map((value, idx) => (
                      <SelectItem
                        key={idx}
                        value={value}
                        onSelect={() => handleSelectChange(value)}
                      >
                        {value === "newest" ? "Newest" : "Oldest"}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
        {/* Search input */}
        <div className="relative flex w-full items-center md:w-1/2">
          <Input
            type="text"
            placeholder="Search by applicant name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className=" absolute right-4 text-xl">
            <FaSearch />
          </div>
        </div>
      </div>
      {/* Application list */}
      {email === admin ? (
        <>
          {isFetching ? (
            <Loading />
          ) : isError ? (
            <p>Error loading applications. No Application Found.</p>
          ) : data === "No Application Found." ? (
            "No Application Found"
          ) : data.application && data.application.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 gap-3 gap-y-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-4">
                {data.application.map((app: ApplicationListType) => (
                  <div
                    key={app.id}
                    className="flex w-full flex-col justify-between rounded-lg border p-4"
                  >
                    <div className="flex justify-between">
                      <Link
                        href={`/application-list/editapplication/${app.id}`}
                        className="h-fit w-fit"
                      >
                        <Button size="icon" variant="secondary">
                          <FaRegEdit size="16" />
                        </Button>
                      </Link>
                      <Image
                        src={app.image}
                        alt=""
                        height={200}
                        width={200}
                        className="mx-auto mb-4 h-20 w-20 rounded-full"
                      />
                      <Button size="icon" variant="destructive">
                        <FaRegTrashAlt />
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      <p className="mb-2 text-xl font-bold text-primary">
                        {app.firstName} {app.lastName}
                      </p>
                      <p>
                        <span className="font-bold text-secondary-foreground">
                          Course:{" "}
                        </span>
                        {app.course}
                      </p>
                      <p>
                        <span className="font-bold text-secondary-foreground">
                          Type:{" "}
                        </span>
                        {app.duration}
                      </p>
                      <p>
                        <span className="font-bold text-secondary-foreground">
                          Date:{" "}
                        </span>
                        {formatDate(app.createdAt)}
                      </p>
                      <p>
                        <span className="font-bold text-secondary-foreground">
                          Status:{" "}
                        </span>
                        <span
                          className={
                            app.status === "Approved"
                              ? "font-bold text-primary"
                              : app.status === "Pending"
                                ? "font-bold text-yellow-500"
                                : app.status === "Rejected"
                                  ? "font-bold text-destructive"
                                  : ""
                          }
                        >
                          {app.status}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold text-secondary-foreground">
                          Certificate:{" "}
                        </span>
                        <span
                          className={
                            app.certificate === "At Office"
                              ? "font-bold text-cyan-500"
                              : app.certificate === "Pending"
                                ? "font-bold text-yellow-500"
                                : app.certificate === "Fail"
                                  ? "font-bold text-destructive"
                                  : app.certificate === "Received"
                                    ? "text-primary font-bold"
                                    : ""
                          }
                        >
                          {app.certificate}
                        </span>
                      </p>
                      <div className="mt-3 flex items-center gap-0.5">
                        <p className="text-sm font-bold">Status:</p>
                        <ActionSelect
                          Value={app.status}
                          onValueChange={handleActionChange}
                        />

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            UpdateApplication({ status: action, id: app.id })
                          }
                        >
                          OK
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center gap-0.5">
                        <p className="text-sm font-bold">Certificate:</p>
                        <CertificateSelect
                          Value={app.certificate}
                          onValueChange={handleCertificateChange}
                        />

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            UpdateCertificate({
                              status: certificate,
                              id: app.id,
                            })
                          }
                        >
                          OK
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
                    {/* <Link
                      href={`/application-list/editapplication/${app.id}`}
                      className="absolute right-2"
                    >
                      <Button variant="secondary" size="icon">
                        <BiEdit />
                      </Button>
                    </Link> */}
                  </div>
                ))}
              </div>
              <div className="mt-10">
                {data &&
                  data !== "No posts found" &&
                  data.totalPostsCount > pageSize && (
                    <PaginationUi
                      link="application-list"
                      currentPage={page}
                      totalPages={Math.ceil(
                        Number(data.totalPostsCount) / pageSize,
                      )}
                      setCurrentPage={(newPage) => setPage(newPage)}
                    />
                  )}
              </div>
              <ToastContainer position="top-center" theme="dark" />
            </div>
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
