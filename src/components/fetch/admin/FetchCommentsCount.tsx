import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchCommentsCount() {
  return useQuery({
    queryKey: ["admin comments data"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin-dashboard/totalcomments`);
      return response.data;
    },
  });
}
