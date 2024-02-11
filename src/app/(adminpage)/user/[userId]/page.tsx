"use client";
import Loading from "@/components/common/loading/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
  id: string;
  name: string;
  image: string;
  email: string;
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
  const { status, data: session } = useSession();
  const params = useParams();
  const userId = params.userId as string;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status !== "authenticated") {
        setIsLoading(false);
        return;
      }

      const apiUrl = `/api/user/singleuser?userId=${userId}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userInfo = await response.json();
        setUserData(userInfo.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError({ message: "Error " });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [status, userId]);

  console.log(userData);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {userData && (
            <div className="mx-2">
              <div className="flex flex-col items-center justify-center gap-10">
                <div
                  className="flex w-full flex-col items-center justify-center gap-6 border md:w-2/3
                    lg:w-1/4"
                >
                  {userData.image ? (
                    <Image
                      src={userData.image}
                      alt=""
                      width={300}
                      height={300}
                      className=" h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-80 w-full items-center justify-center border-b text-xl text-gray-500">
                      No Image Found
                    </div>
                  )}
                  <div className="m-4">
                    <p className="text-center text-2xl font-bold text-primary-200">
                      {userData.name}
                    </p>
                    <p className="text-center text-gray-400">
                      {userData.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
                  <div className="border p-2 md:p-4">
                    <div>Comments</div>
                    <div>
                      {userData.comments && userData.comments.length > 0 ? (
                        userData.comments.map((comment) => (
                          <div key={comment.id}>
                            <p>{comment.content}</p>
                          </div>
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="flex w-full flex-col items-center justify-center gap-6 border p-2 md:p-4">
                    <div>Application</div>
                    <div>
                      {userData.applications &&
                      userData.applications.length > 0 ? (
                        <>
                          <Link
                            href={`/application-list/singleapplication/${userData.applications[0].id}`}
                          >
                            <p className="rounded-lg bg-primary-200 p-2 text-black">
                              Application Details
                            </p>
                          </Link>
                        </>
                      ) : (
                        <p>User has not applied yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
