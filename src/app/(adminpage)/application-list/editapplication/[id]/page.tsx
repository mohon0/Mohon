"use client";
import { useParams } from "next/navigation";
import React from "react";
import { FetchSingleApplication } from "@/components/fetch/get/application/FetchSingleApplication";
import Loading from "@/components/common/loading/Loading";
export default function EditApplication() {
  const params = useParams();
  const id = params.id;
  const { isLoading, data, isError } = FetchSingleApplication({ id });
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        "Error loading application"
      ) : (
        <div>hello</div>
      )}
    </div>
  );
}
