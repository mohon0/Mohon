import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  currentPage: number;
  pageSize: number;
  selectedCategory: string;
  sortBy: string;
  searchInput: string;
}

export function FetchAllApplication({
  currentPage,
  pageSize,
  selectedCategory,
  sortBy,
  searchInput,
}: props) {
  return useQuery({
    queryKey: [
      "allApplications",
      currentPage,
      pageSize,
      selectedCategory,
      sortBy,
      searchInput,
    ],
    queryFn: async () => {
      const response = await axios.get(
        `/api/apply?page=${currentPage}&pageSize=${pageSize}&category=${selectedCategory}&sortBy=${sortBy}&search=${searchInput}`
      );
      return response.data;
    },
  });
}
