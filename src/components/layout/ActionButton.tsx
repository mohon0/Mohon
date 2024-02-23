import Link from "next/link";
import LoadingSpinner from "../common/loading/LoadingSpinner";
import { FetchActionButtonData } from "../fetch/get/application/FetchActionButtonData";

interface RepoData {
  id: string;
  button: string;
}

export default function ActionButton() {
  const { isLoading, data, isError } = FetchActionButtonData();

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        "error"
      ) : (
        <div className="flex items-center justify-center">
          <Link
            href={data?.button === "Apply" ? "/application" : "/contact"}
            className="relative overflow-hidden bg-background px-6 py-2 font-semibold duration-300 hover:bg-primary hover:shadow-cyanshadow"
          >
            <span className="absolute left-0 top-0 block h-0.5 w-full animate-animate1 bg-gradient-midnight"></span>
            <span className="absolute right-0 block h-full w-0.5 animate-animate2 bg-gradient-midnight"></span>
            <span className="absolute bottom-0 right-0 block h-0.5 w-full animate-animate3 bg-gradient-midnight "></span>
            <span className="absolute -bottom-6 left-0 block h-full w-0.5 animate-animate4 bg-gradient-midnight"></span>
            {data?.button === "Apply" ? "Apply Now" : "Let's Talk"}
          </Link>
        </div>
      )}
    </>
  );
}
