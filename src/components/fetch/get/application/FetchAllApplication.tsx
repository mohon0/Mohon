import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  currentPage: number;
  pageSize: number;
  selectedCategory: string;
  sortBy: string;
  searchInput: string;
  certificate: string;
  free: string;
}

export function FetchAllApplication({
  currentPage,
  pageSize,
  selectedCategory,
  sortBy,
  searchInput,
  certificate,
  free,
}: props) {
  return useQuery({
    queryKey: [
      "allApplications",
      currentPage,
      pageSize,
      selectedCategory,
      sortBy,
      searchInput,
      certificate,
      free,
    ],
    queryFn: async () => {
      const response = await axios.get(
        `/api/apply?page=${currentPage}&pageSize=${pageSize}&category=${selectedCategory}&sortBy=${sortBy}&search=${searchInput}&certificate=${certificate}&free=${free}`,
      );
      return response.data;
    },
  });
}
