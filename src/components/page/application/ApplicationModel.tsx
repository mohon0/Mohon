"use client";
import Loading from "@/components/common/loading/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchApplicationData } from "../../fetch/get/application/FetchApplicationData";
import { Button } from "../../ui/button";

function formatDate(isoDateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const date: Date = new Date(isoDateString);
  return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
}

export default function ApplicationModel() {
  const { status } = useSession();

  const { isLoading, data, isError, refetch } = FetchApplicationData();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    <p>Error Loading page.</p>;
  }

  const confirmDelete = async () => {
    try {
      toast.loading("Please wait while deleting this application");
      const response = await axios.delete(`/api/application?id=${data.id}`);

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Application deleted successfully");
        refetch();
      } else {
        toast.dismiss();
        toast.error("Error deleting post");
      }
    } catch (error) {
      toast.error("Error deleting application");
    }
  };

  return (
    <div>
      {!isLoading && status === "authenticated" ? (
        data && data !== "No Application Found" ? (
          <>
            <div className="mx-2 space-y-4">
              <p className="text-xl font-bold">
                Your application has already been submitted
              </p>

              <Card>
                <CardContent className="mt-4">
                  <div className="mb-3 flex justify-between">
                    <Image
                      src={data.image}
                      alt=""
                      width={200}
                      height={200}
                      className="h-20 w-20 rounded-full object-cover"
                    />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="lg">
                          <span className="flex items-center gap-4">
                            Delete
                          </span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Application data will be deleted from the database.
                            And you will not be refunded.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={confirmDelete}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <p className="text-primary-100 mb-2 text-xl font-bold">
                    Name: {data.firstName} {data.lastName}
                  </p>
                  <p>
                    <span className="text-primary-200 font-bold">Course: </span>
                    <span>{data.course}</span>{" "}
                  </p>
                  <p>
                    <span className="text-primary-200 font-bold">Type: </span>
                    <span>{data.duration}</span>
                  </p>
                  <p>
                    <span className="text-primary-200 font-bold">Date: </span>
                    <span>{formatDate(data.createdAt)}</span>
                  </p>
                  <p>
                    <span className="font-bold text-secondary-foreground">
                      Status:{" "}
                    </span>
                    <span
                      className={
                        data.status === "Pending"
                          ? "font-bold text-yellow-500"
                          : data.status === "Approved"
                            ? "font-bold text-green-500"
                            : data.status === "Rejected"
                              ? "font-bold text-red-500"
                              : "font-bold"
                      }
                    >
                      {data.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold text-secondary-foreground">
                      Certificate:{" "}
                    </span>
                    <span
                      className={
                        data.certificate === "At Office"
                          ? "font-bold text-cyan-500"
                          : data.certificate === "Pending"
                            ? "font-bold text-yellow-500"
                            : data.certificate === "Fail"
                              ? "font-bold text-destructive"
                              : data.certificate === "Received"
                                ? "font-bold text-primary"
                                : ""
                      }
                    >
                      {data.certificate}
                    </span>
                  </p>
                  <Link
                    href={`/application-list/singleapplication/${data.id}`}
                    className="mt-6 flex w-full"
                  >
                    <Button variant="secondary" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          ""
        )
      ) : status !== "authenticated" ? (
        <div className="flex flex-col gap-10 text-center text-2xl font-bold">
          <p>You are not logged in. Log in to access this page.</p>
          <Link href="/signin" className="rounded border bg-blue-950 px-8 py-2">
            Log in
          </Link>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
