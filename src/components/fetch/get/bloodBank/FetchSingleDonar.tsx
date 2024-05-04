import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  id: string;
}

export function FetchSingleDonar(id: string | string[]) {
  return useQuery({
    queryKey: ["Single donar", id],
    queryFn: async () => {
      const response = await axios.get(`/api/singledonar?id=${id}`);
      return response.data;
    },
  });
}
