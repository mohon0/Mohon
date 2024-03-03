"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchSingleUserData } from "@/components/fetch/get/profile/FetchSingleUserData";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface UserData {
  id: string;
  name: string;
  image: string;
  email: string;
  phoneNumber: string;
  applications: [
    {
      id: string;
    },
  ];
  comments: Array<{
    id: string;
    content: string;
  }>;
}

interface ErrorResponse {
  message: string;
}

export default function UserData() {
  const params = useParams();
  const userId = params.userId as string;

  const { isLoading, data, isError } = FetchSingleUserData(userId);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error Fetching User Info</div>
      ) : (
        <div>
          {data.userData && (
            <div className="mx-auto flex flex-col items-center justify-center gap-4 lg:gap-10">
              <Card className="p-4 lg:w-8/12">
                <div className="flex flex-col gap-4 md:flex-row lg:gap-10">
                  {data.userData.image ? (
                    <Image
                      src={data.userData.image}
                      alt=""
                      width={300}
                      height={300}
                      className="h-60 w-60 object-cover"
                    />
                  ) : data.userData.applications &&
                    data.userData.applications[0] &&
                    data.userData.applications[0].image &&
                    data.userData.applications[0].image !== null ? (
                    <Image
                      src={data.userData.applications[0].image}
                      alt=""
                      width={300}
                      height={300}
                      className="h-60 w-60 object-cover"
                    />
                  ) : (
                    <div className="flex h-60 w-60 items-center justify-center border text-muted-foreground">
                      No Image Found
                    </div>
                  )}
                  <div className="flex flex-col gap-3 md:mt-10">
                    <div className="text-2xl font-bold text-primary lg:text-3xl">
                      {data.userData.name}
                    </div>
                    <div>{data.userData.email}</div>
                    <div>{data.userData.phoneNumber}</div>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col-reverse gap-4 md:flex-row lg:gap-12">
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Comments</CardTitle>
                  </CardHeader>
                  {data.userData.comments &&
                  data.userData.comments.length > 0 ? (
                    data.userData.comments.map((comment: any) => (
                      <div key={comment.id}>
                        <p>{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </Card>
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Application</CardTitle>
                  </CardHeader>
                  {data.userData.applications &&
                  data.userData.applications.length > 0 ? (
                    <>
                      <Link
                        href={`/application-list/singleapplication/${data.userData.applications[0].id}`}
                      >
                        <Button>Application Details</Button>
                      </Link>
                    </>
                  ) : (
                    <p>User has not applied yet.</p>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
