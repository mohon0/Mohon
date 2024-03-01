"use client";
import Filter from "@/components/common/Post/Filter";
import PostModel from "@/components/common/Post/PostModel";
import Loading from "@/components/common/loading/Loading";
import PaginationList from "@/components/core/PaginationList";
import { FetchAllPost } from "@/components/fetch/get/blog/FetchAllPost";
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

  const pageSize = 16;

  const { isLoading, data, isError } = FetchAllPost({
    currentPage,
    pageSize,
    selectedCategory,
    sortBy,
    searchInput,
  });

  if (isError) return "No results found";

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSelectChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <>
      <div className=" mx-4 flex flex-col items-center justify-center gap-10 md:gap-16  lg:my-10">
        <div className="text-3xl font-bold md:text-5xl">My Latest Updates</div>
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4 lg:w-8/12 lg:gap-10">
          {/* Filter by category dropdown */}

          <Filter onCategoryChange={handleCategoryChange} />

          {/* Sort by dropdown */}
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
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </div>
        ) : isError ? (
          "Error Fetching Post"
        ) : (
          <>
            <div>
              {/* Render first part */}
              {data && data !== "No posts found." && data.posts.length > 0 ? (
                <div className="gallery gap-5">
                  {data.posts.map((post: Post) => (
                    <div key={post.id}>
                      <PostModel
                        title={post.title}
                        img={post.coverImage}
                        category={post.category}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>No posts found matching your criteria.</div>
              )}
            </div>
            {data &&
              data !== "No posts found" &&
              data.totalPostsCount > pageSize && (
                <PaginationList
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    Number(data.totalPostsCount) / pageSize,
                  )}
                  setCurrentPage={(newPage) => setCurrentPage(newPage)}
                />
              )}
          </>
        )}
      </div>
    </>
  );
}
