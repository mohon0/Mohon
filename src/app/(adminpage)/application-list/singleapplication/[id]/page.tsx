"use client";

import Loading from "@/components/common/loading/Loading";
import { FetchSingleApplication } from "@/components/fetch/get/application/FetchSingleApplication";
import SingleApplication from "@/components/singleApplication/SingleApplication";
import { useParams } from "next/navigation";

export default function Application() {
  const params = useParams();
  const id = params.id;
  const { isLoading, data, isError } = FetchSingleApplication({ id });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        "Error loading application"
      ) : (
        <SingleApplication application={data.application} />
      )}
    </div>
  );
}