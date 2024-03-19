"use client";
import Loading from "@/components/common/loading/Loading";
import PaginationUi from "@/components/core/PaginationUi";
import { FetchAllUser } from "@/components/fetch/get/user/FetchAllUser";
import { UserListType } from "@/components/type/UserListType";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users: React.FC = () => {
  const { status, data: session } = useSession();
  const params = useParams();
  const [page, setPage] = useState<number>(Number(params.page[1]) || 1);
  const [searchInput, setSearchInput] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [id, setId] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const pageSize = 18;
  const admin = process.env.NEXT_PUBLIC_ADMIN;
  const email = session?.user?.email;

  const { isLoading, data, isError, refetch } = FetchAllUser({
    currentPage: page,
    sortBy,
    searchInput,
    pageSize,
  });

  async function handleDelete() {
    try {
      toast.loading("Deleting user...");
      const response = await fetch(`/api/user/singleuser?userId=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      toast.dismiss();
      setShowConfirmation(false);
      if (response.ok) {
        toast.success("User was successfully deleted");
        refetch();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  }

  async function handlePopUp(id: string) {
    setId(id);
    setShowConfirmation(true);
  }

  const handleSelectChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="mx-2 md:mx-10 lg:mx-16">
      {status === "authenticated" && email === admin ? (
        <div>
          <h1 className="mb-10 flex items-center justify-center text-4xl font-bold uppercase text-primary">
            All Users
          </h1>
          <div className="mb-20 flex  w-full flex-col items-center justify-center gap-10 md:flex-row">
            <div className="flex items-center justify-center gap-2">
              <Label htmlFor="sortPosts">SortBy:</Label>
              <Select onValueChange={handleSelectChange} defaultValue="newest">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Updated Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Updated Time</SelectLabel>

                    <SelectItem
                      value="newest"
                      onSelect={() => setSortBy("newest")}
                    >
                      Newest
                    </SelectItem>
                    <SelectItem
                      value="oldest"
                      onSelect={() => setSortBy("oldest")}
                    >
                      Oldest
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex items-center md:w-1/2">
              <Input
                type="text"
                placeholder="Search By Name..."
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
                {data.users.map((user: UserListType) => (
                  <div
                    className=" relative col-span-1 flex flex-col items-center justify-center gap-3 rounded border p-4 hover:border-primary"
                    key={user.id}
                  >
                    <div>
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt=""
                          width={300}
                          height={300}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      ) : user.applications &&
                        user.applications[0] &&
                        user.applications[0].image &&
                        user.applications[0].image !== null ? (
                        <Image
                          src={user.applications[0].image}
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
                    <p className="mt-2 text-xl font-bold text-primary">
                      {user.name}
                    </p>
                    <p className="text-md text-secondary-foreground">
                      {user.email}
                    </p>
                    <p className="text-md text-secondary-foreground">
                      {user.phoneNumber}
                    </p>
                    {user.email !== admin && (
                      <Button
                        className=" absolute right-1 top-2"
                        variant="destructive"
                        size="sm"
                        onClick={() => handlePopUp(user.id)}
                      >
                        <MdDelete /> Delete User
                      </Button>
                    )}

                    {showConfirmation && (
                      <div className="fixed inset-0 z-50  flex h-screen w-screen items-center justify-center opacity-20 backdrop-blur">
                        <Card className="w-11/12 md:w-3/5 lg:w-2/5">
                          <CardHeader>
                            <CardTitle>
                              Are you sure you want to Delete this user.
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            This action can not be undone And everything
                            associate with is account including application and
                            comments are going to be deleted.
                          </CardContent>
                          <CardFooter className="flex justify-end gap-4">
                            <Button
                              onClick={() => setShowConfirmation(false)}
                              variant="secondary"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleDelete()}
                              variant="destructive"
                            >
                              Delete User
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    )}
                    <Link
                      href={`/user/userid/${user.id}`}
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
                      link="user"
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
