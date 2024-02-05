"use client";
import Loading from "@/components/common/loading/Loading";
import PostModel from "@/components/common/post/PostModel";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Post {
  id: number;
  coverImage: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  category: string;
}

export default function Course() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const pageSize = 9;

  useEffect(() => {
    setPosts([]);
    setLoading(true);
    const apiUrl = `api/allpost?page=${currentPage}&pageSize=${pageSize}&category=course_module&sortBy=${sortBy}&search=${searchInput}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.posts.length > 0) setPosts(data.posts);

        setTotalPages(Math.ceil(data.totalPostsCount / pageSize));
        setLoading(false); // Set loading state to false when data is fetched
      })
      .catch(() => {
        console.log("error");
        setLoading(false); // Set loading state to false on error
      });
  }, [currentPage, sortBy, searchInput]);

  const jumpToPageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="my-4 md:my-20 mx-4 lg:mx-28 flex items-center justify-center flex-col gap-20">
      <div className="text-3xl md:text-5xl font-bold">Our Course</div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-10 lg:gap-20">
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
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <div className=" absolute right-4 text-xl">
            <FaSearch />
          </div>
        </div>
      </div>

      {/* Loading state rendering */}
      {loading ? (
        <div className="w-11/12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Loading />
          <Loading />
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id}>
                <PostModel
                  title={post.title}
                  img={post.coverImage}
                  category={post.category}
                />
              </div>
            ))
          ) : (
            <div className="text-2xl font-bold flex items-center justify-center col-span-3">
              No posts to display
            </div>
          )}
        </div>
      )}
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex gap-4 items-center">
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
                currentPage === index + 1 ? "bg-blue-950 border" : "bg-gray-600"
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
  );
}
