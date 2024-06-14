"use client";
import Loading from "@/components/common/loading/Loading";
import PaginationUi from "@/components/core/PaginationUi";
import { FetchAllApplication } from "@/components/fetch/get/application/FetchAllApplication";
import ApplicationDataCard from "@/components/page/applicationlist/ApplicationDataCard";
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
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function List() {
  const { data: session } = useSession();
  const params = useParams();
  const [page, setPage] = useState<number>(Number(params.page[1]) || 1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [certificate, setCertificate] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const email = session?.user?.email;
  const admin = process.env.NEXT_PUBLIC_ADMIN;
  const pageSize = 12;

  const { data, isError, refetch, isFetching } = FetchAllApplication({
    currentPage: page,
    pageSize,
    selectedCategory,
    sortBy,
    searchInput,
    certificate,
    free: "true",
  });

  const handleSelectChange = (value: string) => setSortBy(value);
  const handleFilterChange = (value: string) => setSelectedCategory(value);
  const handleCategoryChange = (value: string) => setCertificate(value);

  return (
    <div className="mx-2">
      <div className="mb-10 flex items-center justify-center gap-10">
        <Link href="/application-list/page/1">
          <Button variant="outline">All Application</Button>
        </Link>
        <Button variant="default">
          Free Application
        </Button>
      </div>
      <div className="text-center text-3xl font-bold md:text-5xl">
        Free Application
      </div>
      <div className="my-10 flex w-full flex-col  items-center justify-center gap-3 md:gap-2 lg:flex-row lg:gap-10">
        {/* Filter and Sort dropdowns */}
        {["FilterBy", "SortBy"].map((label, index) => (
          <Select
            key={index}
            onValueChange={
              index === 0 ? handleFilterChange : handleSelectChange
            }
            defaultValue={index === 0 ? "All" : "newest"}
          >
            <SelectTrigger className="w-60">
              <Label>{label}:</Label>
              <SelectValue placeholder={`Select ${label}:`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {index === 0
                  ? ["All", "Approved", "Pending", "Rejected"].map(
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

        <Select
          key="certificate"
          onValueChange={handleCategoryChange}
          defaultValue="All"
        >
          <SelectTrigger className="w-60">
            <Label>Certificate:</Label>
            <SelectValue placeholder="Select Certificate Status:" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Certificate Status</SelectLabel>
              {/* Render options for the new category filter */}
              {[
                "All",
                "At Office",
                "Pending",
                "Fail",
                "Received",
                "Course Incomplete",
              ].map((value, idx) => (
                <SelectItem
                  key={idx}
                  value={value}
                  onSelect={() => handleCategoryChange(value)}
                >
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
                  <ApplicationDataCard
                    key={app.id}
                    id={app.id}
                    duration={app.duration}
                    firstName={app.firstName}
                    lastName={app.lastName}
                    course={app.course}
                    image={app.image}
                    status={app.status}
                    createdAt={app.createdAt}
                    certificate={app.certificate}
                    refetch={refetch}
                  />
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
