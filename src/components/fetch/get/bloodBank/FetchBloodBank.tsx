import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  currentPage: number;
  pageSize: number;
  searchInput: string;
  bloodGroup: string;
}

export function FetchBloodBank({
  currentPage,
  pageSize,
  searchInput,
  bloodGroup,
}: props) {
  return useQuery({
    queryKey: ["Blood Bank", currentPage, searchInput, pageSize, bloodGroup],
    queryFn: async () => {
      const response = await axios.get(
        `/api/blood-donate?page=${currentPage}&pageSize=${pageSize}&bloodGroup=${bloodGroup}&search=${searchInput}`,
      );
      return response.data;
    },
  });
}
