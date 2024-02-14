import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  id: string | string[];
}

export function FetchSingleApplication({ id }: props) {
  return useQuery({
    queryKey: ["Single Application", id],
    queryFn: async () => {
      const response = await axios.get(`/api/singleapplication?id=${id}`);
      return response.data;
    },
  });
}
