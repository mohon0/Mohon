"use client";
import FileInput from "@/components/common/input/FileInput";
import Input from "@/components/common/input/Input";
import Loading from "@/components/common/loading/Loading";
import { FetchProfileInfo } from "@/components/fetch/get/profile/FetchProfileInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const id = session?.user?.id;

  const { isLoading, data, isError } = FetchProfileInfo();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setName(data.name);
    }
  }, [data, isError, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return "There is an error";
  }

  async function updateUser() {
    const id = session?.user?.id;
    const formData = new FormData();
    formData.set("name", name);
    if (id) {
      formData.append("id", id);
    }
    if (files) {
      formData.append("image", files![0]);
    }

    try {
      toast.loading("Please wait...");
      const response = await fetch("api/editprofile", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Profile updated successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  }

  async function changePassword() {
    const formData = new FormData();
    formData.set("password", password);
    formData.set("newPassword", newPassword);
    if (id) {
      formData.append("id", id);
    }
    toast.loading("Please wait while we change your password");

    const response = await fetch("api/editpassword", {
      method: "PUT",
      body: formData,
      credentials: "include",
    });
    if (response.ok) {
      toast.dismiss();
      toast.success("Passwords were successfully changed");
      setNewPassword("");
      setPassword("");
    } else {
      toast.dismiss();
      toast.error(response.statusText);
    }
  }

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = ev.target.files?.[0];

    if (selectedFile) {
      const fileSize = selectedFile.size; // size in bytes
      const maxSize = 500 * 1024; // 500 KB in bytes

      if (fileSize > maxSize) {
        toast.error("File size exceeds 500 KB limit");
        // Optionally reset the file input
        ev.target.value = "";
        return;
      }

      setFiles(ev.target.files);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center gap-20">
          <div className="flex w-11/12 flex-col gap-10 rounded-xl border border-primary-200 bg-blue-950 p-10 md:w-9/12 lg:w-1/2">
            <div className="flex items-center justify-center text-3xl font-bold">
              Edit Profile
            </div>
            <div className="flex flex-col gap-10">
              <Input
                label="Name"
                id="name"
                type="text"
                error=""
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <FileInput onChange={handleFileChange} />
            </div>
            <button
              onClick={updateUser}
              className="rounded-lg border border-primary-200 bg-gray-950 px-4 py-2 hover:bg-gray-900"
            >
              Edit Profile
            </button>
          </div>
          <div className="flex w-11/12 flex-col gap-10 rounded-xl border border-primary-200 bg-blue-950 p-10 md:w-9/12 lg:w-1/2">
            <div className="flex items-center justify-center text-3xl font-bold">
              Change Password
            </div>
            <div className="flex flex-col gap-10">
              <Input
                type="password"
                value={password}
                error=""
                id="password"
                label="Old Password"
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <Input
                type="password"
                value={newPassword}
                error=""
                id="password"
                label="New Password"
                onChange={(ev) => setNewPassword(ev.target.value)}
              />
            </div>
            <button
              onClick={changePassword}
              className="rounded-lg border border-primary-200 bg-gray-950 px-4 py-2 hover:bg-gray-900"
            >
              Change Password
            </button>
          </div>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
