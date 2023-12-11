"use client";
import Loading from "@/components/common/loading/Loading";
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
          `/api/user?page=${currentPage}&pageSize=${pageSize}&search=${searchInput}`
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
  }, [currentPage, searchInput, status, random]);

  const jumpToPageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

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

  return (
    <div className="mx-2 md:mx-10 lg:mx-16">
      {status === "authenticated" && email === admin ? (
        <div>
          <h1 className="flex items-center justify-center font-bold text-4xl uppercase text-primary-200 mb-10">
            All Users
          </h1>
          <div className="flex mb-20  flex-col md:flex-row items-center justify-center w-full gap-10">
            <div className="relative flex items-center md:w-1/2">
              <input
                type="text"
                className="w-full bg-transparent border h-[3.2rem] focus-within:border-primary-200 rounded-full focus-within:outline-none outline-none px-4"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div
                    className=" relative col-span-1 border p-4 rounded flex items-center justify-center gap-3 flex-col hover:border-primary-200"
                    key={user.id}
                  >
                    <div>
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt=""
                          height={100}
                          width={100}
                          className="rounded-full h-20 w-20 object-cover"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-gray-600  p-0.5 text-center text-sm flex items-center justify-center">
                          No image
                        </div>
                      )}
                    </div>
                    <p className="mt-2 font-bold text-xl text-primary-200">
                      {user.name}
                    </p>
                    <p className="text-gray-300">{user.email}</p>
                    {user.email !== admin && (
                      <button
                        className=" absolute top-2 right-2 flex gap-1 items-center bg-red-600 text-sm p-2 rounded-lg"
                        onClick={() => handlePopUp(user.id)}
                      >
                        <MdDelete /> Delete User
                      </button>
                    )}

                    {showConfirmation && (
                      <div className="fixed w-screen inset-0  h-screen flex items-center justify-center backdrop-blur-sm bg-opacity-95 z-50">
                        <div className="bg-blue-950 p-6 w-11/12 lg:w-2/6 rounded-lg shadow-md">
                          <p className="text-xl text-red-500 font-b">
                            Are you sure you want to Delete this user.
                          </p>
                          <p className="text-sm ">
                            This action can not be undone And everything
                            associate with is account including application and
                            comments are going to be deleted.
                          </p>
                          <div className="flex justify-end mt-8">
                            <button
                              onClick={() => setShowConfirmation(false)}
                              className="px-4 py-2 mr-4 bg-gray-600 hover:bg-gray-700 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete()}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                              Delete User
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <Link
                      href={`/user/${user.id}`}
                      className="border w-full p-1.5 border-primary-200 text-sm text-primary-200 flex items-center justify-center rounded-md"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className=" flex gap-4 justify-center mt-16 items-center">
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white cursor-pointer"
                }`}
              >
                Prev
              </button>
              <div className="relative">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="px-4 py-2 rounded-md bg-gray-600 focus:outline-none"
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
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-950 border"
                      : "bg-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
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
