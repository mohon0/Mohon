import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchPostCount() {
  return useQuery({
    queryKey: ["admin post data"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin-dashboard/totalpost`);
      return response.data;
    },
  });
}
