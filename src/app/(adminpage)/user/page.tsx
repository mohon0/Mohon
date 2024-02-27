"use client";
import Loading from "@/components/common/loading/Loading";
import PaginationList from "@/components/core/PaginationList";
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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string;
  phoneNumber: string;
}

const Users: React.FC = () => {
  const { status, data: session } = useSession();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [id, setId] = useState("");
  const [random, setRandom] = useState(Number);
  const [sortBy, setSortBy] = useState("newest");

  const pageSize = 18;
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/user?page=${currentPage}&sortBy=${sortBy}&pageSize=${pageSize}&search=${searchInput}`,
        );

        if (!response.ok) {
          setLoading(false);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.users.length > 0) {
          setUsers(data.users);
          setTotalPages(Math.ceil(data.totalUsersCount / pageSize));
          setLoading(false);
        } else {
          setUsers([]);
          setTotalPages(1);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchInput, status, random, sortBy]);

  const admin = process.env.NEXT_PUBLIC_ADMIN;
  const email = session?.user?.email;

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

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
        setRandom(generateRandomNumber());
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
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                  <div
                    className=" relative col-span-1 flex flex-col items-center justify-center gap-3 rounded border p-4 hover:border-primary"
                    key={user.id}
                  >
                    <div>
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt=""
                          height={100}
                          width={100}
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
                    <Link href={`/user/${user.id}`} className="flex w-full">
                      <Button className="flex w-full" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="mt-10">
            <PaginationList
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={(newPage) => setCurrentPage(newPage)}
            />
          </div>
        </div>
      ) : (
        "You are not authenticated"
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Users;
