import Link from "next/link";
import { FetchActionButtonData } from "../fetch/get/visibility/FetchActionButtonData";
import { Button } from "../ui/button";

export default function ActionButton() {
  const { data, isError } = FetchActionButtonData();
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Link href={data?.button === "Apply" ? "/application" : "/contact"}>
          <Button
            className="flex items-center gap-2 bg-background"
            variant="ghost"
          >
            {data?.button === "Apply" ? "Apply Now" : "Let's Talk"}
            <span className="h-2 w-2 animate-ping rounded-full bg-primary"></span>
          </Button>
        </Link>
      </div>
    </>
  );
}
