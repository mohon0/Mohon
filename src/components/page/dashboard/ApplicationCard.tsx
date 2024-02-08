import Loading from "@/components/common/loading/Loading";
import { FetchApplicationCount } from "@/components/fetch/admin/FetchApplicationCount";
import { Card } from "@/components/ui/card";
import { CgNotes } from "react-icons/cg";

export default function ApplicationCard() {
  const { isLoading, data, isError } = FetchApplicationCount();

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
              <div className="text-4xl font-bold">{data.totalApplications}</div>
              <div>Total Application</div>
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
              <CgNotes size={60} />
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
