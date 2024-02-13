import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  currentPage: number;
  pageSize: number;
  selectedCategory: string | string[];
  sortBy: string;
  searchInput: string;
}

export function FetchAllPost({
  currentPage,
  pageSize,
  selectedCategory,
  sortBy,
  searchInput,
}: props) {
  return useQuery({
    queryKey: [
      "Blog Post",
      currentPage,
      pageSize,
      selectedCategory,
      sortBy,
      searchInput,
    ],
    queryFn: async () => {
      const response = await axios.get(
        `/api/allpost?page=${currentPage}&pageSize=${pageSize}&category=${selectedCategory}&sortBy=${sortBy}&search=${searchInput}`,
      );
      return response.data;
    },
  });
}
