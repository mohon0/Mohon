"use client";
import Loading from "@/components/common/loading/Loading";
import PaginationUi from "@/components/core/PaginationUi";
import { FetchBloodBank } from "@/components/fetch/get/bloodBank/FetchBloodBank";
import ApplicationDataCard from "@/components/page/applicationlist/ApplicationDataCard";
import { ApplicationListType } from "@/components/type/ApplicationListType";
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

  const { data, isError, refetch, isFetching } = FetchBloodBank({
    currentPage: page,
    pageSize,
    searchInput,
  });

  const handleFilterChange = (value: string) => setSelectedCategory(value);

  return (
    <div className="mx-2">
      <div className="text-center text-3xl font-bold md:text-5xl">
        All Application
      </div>
      <div>
        <div className="text-center text-3xl font-bold md:text-5xl">
          Blood Bank
        </div>
        <div className="my-10 flex w-full flex-col  items-center justify-center gap-3 md:gap-2 lg:flex-row lg:gap-10">
          {/* Filter dropdown */}
          <Select onValueChange={handleFilterChange} defaultValue="All">
            <SelectTrigger className="w-60">
              <Label>Filter By Blood Group:</Label>
              <SelectValue placeholder="Select Blood Group:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Blood Group</SelectLabel>
                {["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (value, idx) => (
                    <SelectItem
                      key={idx}
                      value={value}
                      onSelect={() => handleFilterChange(value)}
                    >
                      {value}
                    </SelectItem>
                  ),
                )}
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
            <div className="absolute right-4 text-xl">
              <FaSearch />
            </div>
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
