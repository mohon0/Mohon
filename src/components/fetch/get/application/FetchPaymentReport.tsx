import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchPaymentReport(id: string | string[]) {
  return useQuery({
    queryKey: ["Payment Report", id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/application/payment-report?id=${id}`,
      );
      return response.data;
    },
  });
}
