import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchApplicationChart() {
  return useQuery({
    queryKey: ["admin application chart"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin-dashboard/applicationchart`);
      return response.data;
    },
  });
}
