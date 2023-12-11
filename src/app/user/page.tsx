"use client";
import Loading from "@/components/common/loading/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface UserData {
  id: number;
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
  const [sortBy, setSortBy] = useState("newest");
  const [searchInput, setSearchInput] = useState("");

  const pageSize = 18;

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/user?page=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}&search=${searchInput}`
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
  }, [currentPage, searchInput, sortBy, status]);

  const jumpToPageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const admin = process.env.NEXT_PUBLIC_ADMIN;
  const email = session?.user?.email;

  return (
    <div className="mx-2 md:mx-10 lg:mx-16">
      {status === "authenticated" && email === admin ? (
        <div>
          <h1 className="flex items-center justify-center font-bold text-4xl uppercase text-primary-200 mb-10">
            All Users
          </h1>
          <div className="flex mb-20  flex-col md:flex-row items-center justify-center w-full gap-10">
            {/* Sort by dropdown */}
            <div className="rounded-full flex items-center justify-center  gap-2 border px-4 py-2">
              <label htmlFor="sortPosts">SortBy:</label>
              <select
                id="sortPosts"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#000119] px-2 py-2 w-24"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
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
                      <button className=" absolute top-2 right-2 flex gap-1 items-center bg-red-600 text-sm p-2 rounded-lg">
                        <MdDelete /> Delete User
                      </button>
                    )}
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
    </div>
  );
};

export default Users;
