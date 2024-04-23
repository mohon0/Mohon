"use client";
import Loading from "@/components/common/loading/Loading";
import PaginationUi from "@/components/core/PaginationUi";
import { FetchAddress } from "@/components/fetch/get/address/FetchAddress";
import { AddressListType } from "@/components/type/AddressListType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users: React.FC = () => {
  const { status, data: session } = useSession();
  const params = useParams();
  const [page, setPage] = useState<number>(Number(params.page[1]) || 1);
  const [searchInput, setSearchInput] = useState("");
  const [filterBy, setFilterBy] = useState("All");

  const pageSize = 18;
  const admin = process.env.NEXT_PUBLIC_ADMIN;
  const email = session?.user?.email;

  const { isLoading, data } = FetchAddress({
    currentPage: page,
    filterBy,
    searchInput,
    pageSize,
  });

  const handleBloodGroupChange = (value: string) => {
    setFilterBy(value);
  };
  return (
    <div className="mx-2 md:mx-10 lg:mx-16">
      {status === "authenticated" && email === admin ? (
        <div>
          <h1 className="mb-10 flex items-center justify-center text-4xl font-bold uppercase text-primary">
            Address
          </h1>
          <div className="mb-20 flex  w-full flex-col items-center justify-center gap-10 md:flex-row">
            <div className="flex items-center justify-center gap-2">
              <Label htmlFor="sortPosts">Filter By:</Label>

              <Select onValueChange={handleBloodGroupChange} defaultValue="All">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex items-center md:w-1/2">
              <Input
                type="text"
                placeholder="Search By Address..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className=" absolute right-4 text-xl">
                <FaSearch />
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : data === "No users found." ? (
            "No User Found"
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.users.map((user: AddressListType) => (
                  <div
                    className=" relative col-span-1 flex flex-col justify-center gap-1 rounded border p-4 hover:border-primary"
                    key={user.id}
                  >
                    <div className="mx-auto">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt=""
                          width={300}
                          height={300}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center  justify-center rounded-full bg-secondary p-0.5 text-center text-sm">
                          No image
                        </div>
                      )}
                    </div>

                    <p className="mx-auto mt-2 text-xl font-bold text-primary">
                      {user.firstName + " " + user.lastName}
                    </p>
                    {user.email && (
                      <div>
                        <span className="text-md mr-2 text-primary">
                          Email:
                        </span>
                        <span className="text-md text-secondary-foreground">
                          {user.email}
                        </span>
                      </div>
                    )}
                    {user.mobileNumber && (
                      <div>
                        <span className="text-md mr-2 text-primary">
                          Phone:
                        </span>
                        <span className="text-md text-secondary-foreground">
                          {user.mobileNumber}
                        </span>
                      </div>
                    )}

                    {user && (
                      <div>
                        <span className="text-md mr-2 text-primary">
                          BloodGroup:
                        </span>
                        <span className="text-md text-secondary-foreground">
                          {user.bloodGroup}
                        </span>
                      </div>
                    )}
                    {user && (
                      <p className="text-md text-secondary-foreground">
                        {user.fullAddress}
                      </p>
                    )}

                    <Link
                      href={`/application-list/singleapplication/${user.id}`}
                      className="flex w-full"
                    >
                      <Button className="flex w-full" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                {data &&
                  data !== "No users found." &&
                  data.totalUsersCount > pageSize && (
                    <PaginationUi
                      link="address"
                      currentPage={page}
                      totalPages={Math.ceil(
                        Number(data.totalUsersCount) / pageSize,
                      )}
                      setCurrentPage={(newPage) => setPage(newPage)}
                    />
                  )}
              </div>
            </>
          )}
        </div>
      ) : (
        "You are not authenticated"
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Users;
