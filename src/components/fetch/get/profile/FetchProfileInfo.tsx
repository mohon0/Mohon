import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchProfileInfo() {
  return useQuery({
    queryKey: ["Profile Data"],
    queryFn: async () => {
      const response = await axios.get(`/api/editprofile`);
      return response.data;
    },
  });
}
