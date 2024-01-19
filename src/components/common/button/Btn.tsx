import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { memo } from "react";

interface RepoData {
  id: string;
  button: string;
}

export function Btn() {
  const { isFetching, error, data } = useQuery<RepoData>({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get("/api/visibility").then((response) => response.data),
    staleTime: 600000,
  });

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <Link
        href={data?.button === "Apply" ? "/application" : "/contact"}
        className="relative px-6 py-2 text-primary-200 duration-300 overflow-hidden hover:bg-primary-200 hover:text-black font-semibold hover:shadow-cyanshadow"
      >
        <span className="absolute block top-0 left-0 w-full h-0.5 bg-gradient-midnight animate-animate1"></span>
        <span className="absolute block right-0 w-0.5 h-full bg-gradient-midnight animate-animate2"></span>
        <span className="absolute block bottom-0 right-0 h-0.5 w-full bg-gradient-midnight animate-animate3 "></span>
        <span className="absolute block -bottom-6 left-0 w-0.5 h-full bg-gradient-midnight animate-animate4"></span>
        {data?.button === "Apply" ? "Apply Now" : "Let's Talk"}
      </Link>
    </div>
  );
}

export default memo(Btn);
