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

  const pageSize = 12;

  const { isLoading, data, isError } = FetchAllPost({
    currentPage,
    pageSize,
    selectedCategory,
    sortBy,
    searchInput,
  });
  if (isLoading) return <Loading />;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSelectChange = (value: string) => {
    setSortBy(value);
  };

  const postsCount = data.posts.length;
  const postsPerPart = Math.ceil(postsCount / 4);

  // Define constants to hold each part of the sliced data
  const firstPart = data.posts.slice(0, postsPerPart);
  const secondPart = data.posts.slice(postsPerPart, postsPerPart * 2);
  const thirdPart = data.posts.slice(postsPerPart * 2, postsPerPart * 3);
  const fourthPart = data.posts.slice(postsPerPart * 3);

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
          <div className="grid w-11/12 grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            <Loading />
            <Loading />
            <Loading />
          </div>
        ) : isError ? (
          "Error Fetching Post"
        ) : (
          <>
            <div>
              <div className="gap- flex flex-wrap">
                {/* Render first part */}
                <div className="max-w-full flex-[100%] space-y-10 px-3 md:max-w-[50%] md:flex-[50%] lg:max-w-[25%] lg:flex-[25%]">
                  {firstPart.map((post: Post) => (
                    <PostModel
                      key={post.id}
                      title={post.title}
                      img={post.coverImage}
                      category={post.category}
                    />
                  ))}
                </div>
                <div className="max-w-full flex-[100%] space-y-10 px-3 md:max-w-[50%] md:flex-[50%] lg:max-w-[25%] lg:flex-[25%]">
                  {secondPart.map((post: Post) => (
                    <PostModel
                      key={post.id}
                      title={post.title}
                      img={post.coverImage}
                      category={post.category}
                    />
                  ))}
                </div>
                <div className="max-w-full flex-[100%] space-y-10 px-3 md:max-w-[50%] md:flex-[50%] lg:max-w-[25%] lg:flex-[25%]">
                  {thirdPart.map((post: Post) => (
                    <PostModel
                      key={post.id}
                      title={post.title}
                      img={post.coverImage}
                      category={post.category}
                    />
                  ))}
                </div>
                <div className="max-w-full flex-[100%] space-y-10 px-3 md:max-w-[50%] md:flex-[50%] lg:max-w-[25%] lg:flex-[25%]">
                  {fourthPart.map((post: Post) => (
                    <PostModel
                      key={post.id}
                      title={post.title}
                      img={post.coverImage}
                      category={post.category}
                    />
                  ))}
                </div>
              </div>
            </div>
            <PaginationList
              currentPage={currentPage}
              totalPages={Math.ceil(Number(data.totalPostsCount) / pageSize)}
              setCurrentPage={(newPage) => setCurrentPage(newPage)}
            />
          </>
        )}
      </div>
    </>
  );
}
