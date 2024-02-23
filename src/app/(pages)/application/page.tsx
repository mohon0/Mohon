"use client";
import Application from "@/components/application/Application";
import Notice from "@/components/application/Notice";
import ApplicationDataModel from "@/components/application/applied/ApplicationDataModel";
import Loading from "@/components/common/loading/Loading";
import { FetchActionButtonData } from "@/components/fetch/get/application/FetchActionButtonData";
import { FetchApplicationData } from "@/components/fetch/get/application/FetchApplicationData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ApplicationPage() {
  const { status } = useSession();
  const router = useRouter();
  const {
    isLoading: isLoadingButton,
    data: buttonData,
    isError: isErrorButton,
  } = FetchActionButtonData();

  const {
    isLoading: isLoadingApplication,
    data: applicationData,
    isError: isErrorApplication,
  } = FetchApplicationData();

  if (status === "loading" || isLoadingButton || isLoadingApplication) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
    return <p>You are not authenticated. Redirecting...</p>;
  }

  if (isErrorButton || isErrorApplication) {
    return "Error loading data";
  }

  if (buttonData.button === "Apply") {
    if (applicationData === "No Application Found") {
      return (
        <div>
          <div className="mb-10 mt-24 text-xl font-bold">
            <Notice />
          </div>
          <Application />
        </div>
      );
    }

    return <ApplicationDataModel application={applicationData} />;
  }

  return "Application Date is Over";
}
