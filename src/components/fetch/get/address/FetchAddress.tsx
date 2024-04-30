import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  currentPage: number;
  filterBy: string;
  pageSize: number;
  searchInput: string;
}

export function FetchAddress({
  currentPage,
  filterBy,
  pageSize,
  searchInput,
}: props) {
  return useQuery({
    queryKey: ["address", currentPage, filterBy, searchInput, pageSize],
    queryFn: async () => {
      const response = await axios.get(
        `/api/address?page=${currentPage}&filterBy=${filterBy}&pageSize=${pageSize}&search=${searchInput}`,
      );
      return response.data;
    },
  });
}
