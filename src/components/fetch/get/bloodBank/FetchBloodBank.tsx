import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  currentPage: number;
  pageSize: number;
  searchInput: string;
}

export function FetchBloodBank({
  currentPage,
  pageSize,
  searchInput,
}: props) {
  return useQuery({
    queryKey: ["Blood Bank", currentPage, searchInput, pageSize],
    queryFn: async () => {
      const response = await axios.get(
        `/api/blood-donate?page=${currentPage}&pageSize=${pageSize}&search=${searchInput}`,
      );
      return response.data;
    },
  });
}
