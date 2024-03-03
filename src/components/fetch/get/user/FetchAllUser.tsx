import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  currentPage: number;
  sortBy: string;
  pageSize: number;
  searchInput: string;
}

export function FetchAllUser({
  currentPage,
  sortBy,
  pageSize,
  searchInput,
}: props) {
  return useQuery({
    queryKey: ["all User Data", currentPage, sortBy, searchInput, pageSize],
    queryFn: async () => {
      const response = await axios.get(
        `/api/user?page=${currentPage}&sortBy=${sortBy}&pageSize=${pageSize}&search=${searchInput}`,
      );
      return response.data;
    },
  });
}
