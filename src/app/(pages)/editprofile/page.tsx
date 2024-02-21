"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchProfileInfo } from "@/components/fetch/get/profile/FetchProfileInfo";
import AccountTab from "@/components/page/editprofile/AccountTab";
import MoreTab from "@/components/page/editprofile/MoreTab";
import PasswordTab from "@/components/page/editprofile/PasswordTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditProfile() {
  const { isLoading, data, isError } = FetchProfileInfo();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        "Error Loading page"
      ) : (
        <div className="mt-24 flex items-center justify-center">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <AccountTab
                name={data.name}
                email={data.email}
                phone={data.phoneNumber}
              />
            </TabsContent>
            <TabsContent value="password">
              <PasswordTab />
            </TabsContent>
            <TabsContent value="more">
              <MoreTab
                bio={data.bio}
                facebook={data.facebook}
                twitter={data.twitter}
                linkedin={data.linkedin}
                instagram={data.instagram}
                github={data.github}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
