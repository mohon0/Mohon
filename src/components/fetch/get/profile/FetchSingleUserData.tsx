import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchSingleUserData(userId: string) {
  return useQuery({
    queryKey: ["Single User Data", userId],
    queryFn: async () => {
      const response = await axios.get(`/api/user/singleuser?userId=${userId}`);
      return response.data;
    },
  });
}
