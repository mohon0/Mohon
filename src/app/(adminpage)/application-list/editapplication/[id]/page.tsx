"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchSingleApplication } from "@/components/fetch/get/application/FetchSingleApplication";
import EditApplication from "@/components/page/application/EditApplication";
import { useParams } from "next/navigation";
export default function EditSingleApplication() {
  const params = useParams();
  const id = params.id;
  const { isLoading, data, isError } = FetchSingleApplication({ id });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        "Error fetching application"
      ) : (
        <EditApplication id={params.id} />
      )}
    </>
  );
}
