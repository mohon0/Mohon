"use client";
import Application from "@/components/application/Application";
import Notice from "@/components/application/Notice";
import ApplicationDataModel from "@/components/application/applied/ApplicationDataModel";
import Loading from "@/components/common/loading/Loading";
import { FetchActionButtonData } from "@/components/fetch/get/application/FetchActionButtonData";
import { FetchApplicationData } from "@/components/fetch/get/application/FetchApplicationData";
import { useSession } from "next-auth/react";

export default function Apply() {
  const { status, data: session } = useSession();

  const { isLoading, data, isError } = FetchActionButtonData();
  const {
    isLoading: isLoadingApplication,
    data: applicationData,
    isError: isErrorApplication,
  } = FetchApplicationData();

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : status === "unauthenticated" ? (
        "You are not authenticated"
      ) : isLoading ? (
        <Loading />
      ) : data.button === "Apply" ? (
        isLoadingApplication ? (
          <Loading />
        ) : isError || isErrorApplication ? (
          <div>Error fetching application data. Please try again later.</div>
        ) : applicationData === "No Application Found" ? (
          <div>
            <div className=" mb-10 mt-24 text-xl font-bold">
              <Notice />
            </div>
            <Application />
          </div>
        ) : (
          <ApplicationDataModel application={applicationData} />
        )
      ) : (
        "Application Date is over. Please try again later."
      )}
    </>
  );
}
