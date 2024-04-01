"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchApplicationData } from "@/components/fetch/get/application/FetchApplicationData";
import { FetchActionButtonData } from "@/components/fetch/get/visibility/FetchActionButtonData";
import Application from "@/components/page/application/Application";
import Notice from "@/components/page/application/Notice";
import ApplicationDataModel from "@/components/page/application/applied/ApplicationDataModel";
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
  if (status === "unauthenticated") {
    router.push("/signin");
    return <p>You are not authenticated. Redirecting...</p>;
  }

  const {
    isLoading: isLoadingApplication,
    data: applicationData,
    isError: isErrorApplication,
  } = FetchApplicationData();

  if (status === "loading" || isLoadingButton || isLoadingApplication) {
    return <Loading />;
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
