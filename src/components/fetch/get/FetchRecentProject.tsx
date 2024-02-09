import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchRecentProject() {
  return useQuery({
    queryKey: ["recentProject"],
    queryFn: async () => {
      const response = await axios.get(
        `api/allpost?page=1&pageSize=5&category=projects`,
      );
      return response.data;
    },
  });
}
