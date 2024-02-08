import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchApplicationCount() {
  return useQuery({
    queryKey: ["admin application data"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin-dashboard/totalapplication`);
      return response.data;
    },
  });
}
