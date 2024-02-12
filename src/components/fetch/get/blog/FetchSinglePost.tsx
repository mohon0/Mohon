import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  category: string;
  slug: string;
}

export function FetchSinglePost({ category, slug }: props) {
  return useQuery({
    queryKey: ["Single Post", category, slug],
    queryFn: async () => {
      const response = await axios.get(`/api/${category}/${slug}`);
      return response.data;
    },
  });
}
