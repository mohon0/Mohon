import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchUserCount() {
  return useQuery({
    queryKey: ["admin user data"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin-dashboard/totaluser`);
      return response.data;
    },
  });
}
