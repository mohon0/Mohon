"use client";
import Loading from "@/components/common/loading/Loading";
import Filter from "@/components/common/post/Filter";
import PostModel from "@/components/common/post/PostModel";
import PaginationUi from "@/components/core/PaginationUi";
import { FetchAllPost } from "@/components/fetch/get/blog/FetchAllPost";
import { useState } from "react";
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

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchInput, setSearchInput] = useState("");

  const pageSize = 9;

  const { isLoading, data, isError } = FetchAllPost({
    currentPage,
    pageSize,
    selectedCategory,
    sortBy,
    searchInput,
  });

  return (
    <div className=" mx-4 flex flex-col items-center justify-center gap-20 lg:mx-28 lg:my-10">
      <div className="text-3xl font-bold md:text-5xl">My Latest Updates</div>
      <div className="flex w-full flex-col items-center gap-10 md:flex-row">
        {/* Filter by category dropdown */}
        <div>
          <Filter
            selectedCategory={selectedCategory}
            onChange={(ev) => setSelectedCategory(ev.target.value)}
          />
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
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <div className=" absolute right-4 text-xl">
            <FaSearch />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid w-11/12 grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Loading />
          <Loading />
          <Loading />
        </div>
      ) : isError ? (
        "Error Fetching Post"
      ) : (
        <>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 ">
            {data.posts.length > 0 ? (
              data.posts.map((post: Post) => (
                <div key={post.id}>
                  <PostModel
                    title={post.title}
                    img={post.coverImage}
                    category={post.category}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center text-2xl font-bold">
                No posts to display
              </div>
            )}
          </div>
          <PaginationUi
            currentPage={currentPage}
            totalPages={Math.ceil(Number(data.totalPostsCount) / pageSize)}
            setCurrentPage={(newPage) => setCurrentPage(newPage)}
          />
        </>
      )}
    </div>
  );
}
