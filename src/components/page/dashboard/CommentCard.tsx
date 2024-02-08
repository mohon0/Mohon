import Loading from "@/components/common/loading/Loading";
import { FetchCommentsCount } from "@/components/fetch/admin/FetchCommentsCount";
import { Card } from "@/components/ui/card";
import { LiaComments } from "react-icons/lia";

export default function CommentCard() {
  const { isLoading, data, isError } = FetchCommentsCount();
  return (
    <>
      {isLoading ? (
        <div className="m-3">
          <Loading />
        </div>
      ) : isError ? (
        <p>Error loading posts. Please try again later.</p>
      ) : (
        <Card className="p-3">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-4xl font-bold">20</div>
              <div>Total Comments</div>
              <div className="flex flex-wrap gap-1">
                <span
                  className={
                    data.percentageChange > 0
                      ? "text-primary-200"
                      : "text-red-500"
                  }
                >
                  {data.percentageChange} %{" "}
                  {data.percentageChange > 0 ? "More" : "less"}
                </span>
                <span>Then Last Month</span>
              </div>
            </div>
            <div className="mx-auto flex items-center justify-center text-primary-200">
              <LiaComments size={60} />
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
