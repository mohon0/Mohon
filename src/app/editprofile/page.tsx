"use client";
import FileInput from "@/components/common/input/FileInput";
import Input from "@/components/common/input/Input";
import Loading from "@/components/common/loading/Loading";
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

  useEffect(() => {
    fetch(`/api/editprofile`).then((response) => {
      response.json().then((userInfo) => {
        setName(userInfo.name);
        setLoading(false);
      });
    });
  }, []);

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-20 items-center justify-center">
          <div className="border-primary-200 bg-blue-950 border w-1/2 p-10 flex flex-col gap-10 rounded-xl">
            <div className="text-3xl font-bold flex items-center justify-center">
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
              <FileInput onChange={(ev) => setFiles(ev.target.files)} />
            </div>
            <button
              onClick={updateUser}
              className="border-primary-200 border bg-gray-950 px-4 py-2 rounded-lg hover:bg-gray-900"
            >
              Edit Profile
            </button>
          </div>
          <div className="border-primary-200 bg-blue-950 flex flex-col gap-10 border w-1/2 p-10 rounded-xl">
            <div className="text-3xl font-bold flex items-center justify-center">
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
              className="border-primary-200 border bg-gray-950 px-4 py-2 rounded-lg hover:bg-gray-900"
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
