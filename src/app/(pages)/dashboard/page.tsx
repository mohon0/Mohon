"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchActionDashboardData } from "@/components/fetch/get/dashboard/FetchDashboardData";
import formatDate from "@/components/helper/hooks/FormatedDate";
import ToolTipHookDown from "@/components/helper/hooks/TooltipHookDown";
import ApplicationModel from "@/components/page/application/ApplicationModel";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPowerOff,
  FaTwitter,
} from "react-icons/fa6";

export default function Dashboard() {
  const { status, data: session } = useSession();
  const { isLoading, data, isError } = FetchActionDashboardData();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return "Error loading Dashboard";
  }

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const admin = process.env.NEXT_PUBLIC_ADMIN;

  return (
    <div className="flex flex-col md:gap-10">
      {!isLoading && status === "authenticated" ? (
        <>
          <div className="flex flex-col items-center justify-center gap-20">
            <Card className="flex w-11/12 flex-col md:flex-row lg:w-10/12">
              <div className="flex flex-col items-center gap-4 md:w-4/12">
                {data.user.image ? (
                  <Image
                    src={data.user.image}
                    alt=""
                    className="h-52 w-full rounded-lg object-cover md:h-40 lg:h-80"
                    height={200}
                    width={200}
                  />
                ) : (
                  <div className="flex h-52 w-full items-center justify-center border text-2xl text-muted-foreground">
                    No Image Found
                  </div>
                )}

                <div className="flex flex-col gap-3 md:gap-6 lg:flex-row">
                  <Link href="/editprofile">
                    <Button size="lg">
                      <span className="flex items-center gap-4">
                        Edit Profile
                        <FaUserEdit size={20} />
                      </span>
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="lg">
                        <span className="flex items-center gap-4">
                          Log Out <FaPowerOff size={14} />
                        </span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will log you out of this browser.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                          Log Out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="flex flex-col items-start gap-20 md:flex-row">
                <div>
                  <CardHeader>
                    <div className="flex items-center gap-8">
                      <CardTitle className="text-2xl font-extrabold">
                        {data.user.name}
                      </CardTitle>
                      <Badge>
                        {admin === data.user.email ? "Admin" : "Member"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div>
                      <div className="flex items-center gap-4">
                        <span>Email:</span>
                        <span>{data.user.email}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>Mobile:</span>
                        <span>{data.user.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>Member Since:</span>
                        <span>{formatDate(data.user.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>Total Post:</span>
                        <span>{data.user._count.posts}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>Total Comment:</span>
                        <span>{data.user._count.comments}</span>
                      </div>
                    </div>
                    <div
                      className="mt-3 text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: data.user.bio }}
                    />
                  </CardContent>
                  <CardFooter className="flex flex-wrap">
                    {(data.user.facebook ||
                      data.user.twitter ||
                      data.user.linkedin ||
                      data.user.instagram ||
                      data.user.github) && <div>Connect with me:</div>}
                    <div className="flex flex-wrap gap-4 pl-4 text-muted-foreground hover:[&>*]:text-foreground">
                      {data.user.facebook && (
                        <Link
                          href={`https://${data.user.facebook}`}
                          target="_blank"
                          rel="noopener"
                        >
                          <ToolTipHookDown
                            text="Facebook"
                            icon={<FaFacebook size={20} />}
                          />
                        </Link>
                      )}
                      {data.user.twitter && (
                        <Link
                          href={`https://${data.user.twitter}`}
                          target="_blank"
                          rel="noopener"
                        >
                          <ToolTipHookDown
                            text="Twitter"
                            icon={<FaTwitter size={20} />}
                          />
                        </Link>
                      )}
                      {data.user.linkedin && (
                        <Link
                          href={`https://${data.user.linkedin}`}
                          target="_blank"
                          rel="noopener"
                        >
                          <ToolTipHookDown
                            text="LinkedIn"
                            icon={<FaLinkedin size={20} />}
                          />
                        </Link>
                      )}
                      {data.user.instagram && (
                        <Link
                          href={`https://${data.user.instagram}`}
                          target="_blank"
                          rel="noopener"
                        >
                          <ToolTipHookDown
                            text="Instagram"
                            icon={<FaInstagram size={20} />}
                          />
                        </Link>
                      )}
                      {data.user.github && (
                        <Link
                          href={`https://${data.user.github}`}
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
                    <Link className="md:hidden" href="/application">
                      <Button>Application</Button>
                    </Link>
                  </CardFooter>
                </div>

                <Link className="mt-7 hidden md:block" href="/application">
                  <Button>Application</Button>
                </Link>
              </div>
            </Card>

            <ApplicationModel />
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
