"use client";
import { Options } from "@/components/common/Post/Options";
import PostModel from "@/components/common/Post/PostModel";
import Loading from "@/components/common/loading/Loading";
import PaginationUi from "@/components/core/PaginationUi";
import { FetchAllPost } from "@/components/fetch/get/blog/FetchAllPost";
import { BlogPostType } from "@/components/type/BlogPostType";
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
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Blog() {
  const params = useParams();
  const [page, setPage] = useState<number>(Number(params.page[1]) || 1);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const pageSize = 16;

  const { isLoading, data, isError } = FetchAllPost({
    currentPage: page,
    pageSize,
    selectedCategory: filterBy,
    sortBy,
    searchInput,
  });

  if (isError) return "No results found";

  const handleSelectChange = (value: string) => {
    setSortBy(value);
  };
  const handleFilterChange = (value: string) => {
    setFilterBy(value);
  };

  const sortedOptions = Options.sort((a, b) => a.localeCompare(b));

  return (
    <>
      <div className=" mx-4 flex flex-col items-center justify-center gap-10 md:gap-16  lg:my-10">
        <div className="text-3xl font-bold md:text-5xl">My Latest Updates</div>
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4 lg:w-8/12 lg:gap-10">
          {/* Sort by dropdown */}
          <div className="flex items-center justify-center gap-2">
            <Label htmlFor="sortPosts">FilterBy:</Label>
            <Select onValueChange={handleFilterChange} defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Updated Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Updated Time</SelectLabel>

                  <SelectItem value="all" onSelect={() => setSortBy("all")}>
                    All
                  </SelectItem>
                  {sortedOptions.map((categories) => (
                    <SelectItem
                      key={categories}
                      value={categories.toLowerCase().replace(/\s+/g, "_")}
                      onSelect={() => handleSelectChange(categories)}
                    >
                      {categories}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
                <div className=" columns-1 gap-5 sm:columns-2 md:columns-3 lg:columns-4">
                  {data.posts.map((post: BlogPostType) => (
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
                <PaginationUi
                  link="blog"
                  currentPage={page}
                  totalPages={Math.ceil(
                    Number(data.totalPostsCount) / pageSize,
                  )}
                  setCurrentPage={(newPage) => setPage(newPage)}
                />
              )}
          </>
        )}
      </div>
    </>
  );
}
