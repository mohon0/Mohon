import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchActionButtonData() {
  return useQuery({
    queryKey: ["Action Button Data"],
    queryFn: async () => {
      const response = await axios.get(`/api/visibility`);
      return response.data;
    },
    staleTime: 1000 * 60 * 7,
  });
}
