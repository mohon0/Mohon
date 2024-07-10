import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchHomePageRecentProject() {
  return useQuery({
    queryKey: ["Home Page Recent Projects"],
    queryFn: async () => {
      const response = await axios.get(
        `api/allpost?page=1&pageSize=20&category=projects`,
      );
      return response.data;
    },
  });
}
