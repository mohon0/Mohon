"use client";
import Loading from "@/components/common/loading/Loading";
import PostModel from "@/components/common/Post/PostModel";
import PaginationList from "@/components/core/PaginationList";
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

interface PageProps {
  params: { category: string };
}

export default function Category({ params }: PageProps) {
  const router = useParams();
  const category = router.category as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const pageSize = 16;

  const { isLoading, data, isError } = FetchAllPost({
    currentPage,
    pageSize,
    selectedCategory: params.category,
    sortBy,
    searchInput,
  });

  const handleSelectChange = (value: string) => {
    setSortBy(value);
  };

  function formatCategory(category: string): string {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="mx-4 my-4 flex flex-col items-center justify-center gap-20 md:my-20">
      <div className="text-3xl font-bold md:text-5xl">
        {formatCategory(category)}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row lg:gap-20">
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

                <SelectItem value="newest" onSelect={() => setSortBy("newest")}>
                  Newest
                </SelectItem>
                <SelectItem value="oldest" onSelect={() => setSortBy("oldest")}>
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

      {/* Loading state rendering */}
      {isLoading ? (
        <div className="grid  grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </div>
      ) : isError ? (
        "Error Loading Post"
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
              <PaginationList
                currentPage={currentPage}
                totalPages={Math.ceil(Number(data.totalPostsCount) / pageSize)}
                setCurrentPage={(newPage) => setCurrentPage(newPage)}
              />
            )}
        </>
      )}
    </div>
  );
}
