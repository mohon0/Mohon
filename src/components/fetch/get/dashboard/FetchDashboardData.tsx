import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchActionDashboardData() {
  return useQuery({
    queryKey: ["Dashboard Data"],
    queryFn: async () => {
      const response = await axios.get(`/api/dashboard`);
      return response.data;
    },
  });
}
