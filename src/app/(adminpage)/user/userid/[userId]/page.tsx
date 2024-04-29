"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchSingleUserData } from "@/components/fetch/get/profile/FetchSingleUserData";
import formatDate from "@/components/helper/hooks/FormatedDate";
import ToolTipHookDown from "@/components/helper/hooks/TooltipHookDown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

export default function SingleUser() {
  const params = useParams();
  const userId = params.userId as string;
  const { status } = useSession();
  const { isLoading, data, isError } = FetchSingleUserData(userId);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return "Error loading Dashboard";
  }

  return (
    <div className="flex flex-col md:gap-10">
      {!isLoading && status === "authenticated" ? (
        <>
          <div className="flex flex-col items-center justify-center gap-20">
            <Card className="flex flex-col md:w-11/12 md:flex-row md:p-3 lg:w-11/12 lg:p-6">
              <div className="flex flex-col items-center gap-4 md:w-4/12">
                {data.userData.image ? (
                  <Image
                    src={data.userData.image}
                    alt=""
                    width={300}
                    height={300}
                    className="h-60 w-60 object-cover md:h-40 md:w-40 lg:h-60 lg:w-60"
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
                    className="h-60 w-60 object-cover md:h-40 md:w-40 lg:h-60 lg:w-60"
                  />
                ) : (
                  <div className="flex h-60 w-60 items-center justify-center border text-muted-foreground md:h-40 md:w-40 lg:h-60 lg:w-60">
                    No Image Found
                  </div>
                )}
                {data.userData.applications.length > 0 && (
                  <div>
                    <Link
                      href={`/application-list/singleapplication/${data.userData.applications[0].id}`}
                    >
                      <Button>Application Details</Button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="md:w-8/12">
                <CardHeader className="p-2 pt-6 lg:pt-0">
                  <div className="flex items-center gap-8">
                    <CardTitle className="font-extrabold md:text-2xl ">
                      {data.userData.name}
                    </CardTitle>
                    <Badge>
                      {data.userData.status && data.userData.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-2 ">
                  <div>
                    <div className="flex items-center gap-4">
                      <span>Email:</span>
                      <span>{data.userData.email}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Mobile:</span>
                      <span>{data.userData.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Member Since:</span>
                      <span>{formatDate(data.userData.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Total Post:</span>
                      <span>{data.userData._count.posts}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Total Comment:</span>
                      <span>{data.userData._count.comments}</span>
                    </div>
                  </div>
                  <div
                    className="mt-3 text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: data.userData.bio }}
                  />
                </CardContent>
                <CardFooter className="flex flex-wrap p-2">
                  {(data.userData.facebook ||
                    data.userData.twitter ||
                    data.userData.linkedin ||
                    data.userData.instagram ||
                    data.userData.github) && <div>Connect with me:</div>}
                  <div className="flex flex-wrap gap-4 text-muted-foreground lg:pl-4 hover:[&>*]:text-foreground">
                    {data.userData.facebook && (
                      <Link
                        href={`https://${data.userData.facebook}`}
                        target="_blank"
                        rel="noopener"
                      >
                        <ToolTipHookDown
                          text="Facebook"
                          icon={<FaFacebook size={20} />}
                        />
                      </Link>
                    )}
                    {data.userData.twitter && (
                      <Link
                        href={`https://${data.userData.twitter}`}
                        target="_blank"
                        rel="noopener"
                      >
                        <ToolTipHookDown
                          text="Twitter"
                          icon={<FaTwitter size={20} />}
                        />
                      </Link>
                    )}
                    {data.userData.linkedin && (
                      <Link
                        href={`https://${data.userData.linkedin}`}
                        target="_blank"
                        rel="noopener"
                      >
                        <ToolTipHookDown
                          text="LinkedIn"
                          icon={<FaLinkedin size={20} />}
                        />
                      </Link>
                    )}
                    {data.userData.instagram && (
                      <Link
                        href={`https://${data.userData.instagram}`}
                        target="_blank"
                        rel="noopener"
                      >
                        <ToolTipHookDown
                          text="Instagram"
                          icon={<FaInstagram size={20} />}
                        />
                      </Link>
                    )}
                    {data.userData.github && (
                      <Link
                        href={`https://${data.userData.github}`}
                        target="_blank"
                        rel="noopener"
                      >
                        <ToolTipHookDown
                          text="GitHub"
                          icon={<FaGithub size={20} />}
                        />
                      </Link>
                    )}
                  </div>
                </CardFooter>
              </div>
            </Card>
          </div>
        </>
      ) : status !== "authenticated" ? (
        <Card>
          <p>You are not logged in. Log in to access this page.</p>
          <Link href="/signin">
            <Button>Log in</Button>
          </Link>
        </Card>
      ) : (
        <Loading />
      )}
    </div>
  );
}
