import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchApplicationData() {
  return useQuery({
    queryKey: ["Application Data"],
    queryFn: async () => {
      const response = await axios.get(`/api/application`);
      return response.data;
    },
  });
}
