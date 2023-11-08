"use client";
import FileInput from "@/components/common/input/FileInput";
import Input from "@/components/common/input/Input";
import Loading from "@/components/common/loading/Loading";
import EditProfileValidation from "@/components/validation/EditProfileValidation";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const id = searchParams.get("userid");
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    if (!session) {
      return;
    }

    if (id) {
      fetch(`/api/editprofile?${id}`)
        .then((response) => response.json())
        .then((userInfo) => {
          setName(userInfo.name);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
    }
  }, [session, id, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = EditProfileValidation({ name });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (id) {
      formData.append("id", id);
    }

    if (files) {
      formData.append("image", files![0]);
    }
    if (oldPassword) {
      formData.append("password", oldPassword);
    }

    if (newPassword) {
      formData.append("newPassword", newPassword);
    }
    const updateProfile = () => {
      toast.loading("Please wait while we update your profile");
      return new Promise((resolve, reject) => {
        if (id) {
          fetch(`api/editprofile`, {
            method: "PUT",
            body: formData,
            credentials: "include",
          })
            .then((response) => response.json())
            .then((data) => {
              toast.dismiss();

              resolve(data);
              // Redirect to /dashboard after successful update
              router.push("/dashboard");
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(
                "Couldn't update your profile. Please try again letter."
              );
              reject(error);
            });
        }
      });
    };

    updateProfile()
      .then((data) => {})
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Error updating profile. Please try again later.");
      });
  };

  return (
    <div className="flex mt-32 items-center justify-center flex-col max-w-4xl md:mx-10 mx-1 lg:mx-auto rounded-lg bg-blue-950  m-10 p-5 shadow-md ">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex gap-6 md:gap-20 my-10">
            <button
              onClick={() => setIsChangingPassword(false)}
              className={`px-4 py-2 bg-slate-800 text-white border-b-2 ${
                !isChangingPassword ? "border-primary-200" : "border-blue-950"
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setIsChangingPassword(true)}
              className={`px-4 py-2 bg-slate-800 text-white border-b-2 ${
                isChangingPassword ? "border-primary-200" : "border-blue-950"
              }`}
            >
              Change Password
            </button>
          </div>
          {isChangingPassword ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 w-full"
            >
              <Input
                label="Old Password"
                id="oldPassword"
                type="text"
                value={oldPassword}
                onChange={(ev) => setOldPassword(ev.target.value)}
                error={errors.old}
              />
              <Input
                label="New Password"
                id="newPassword"
                type="text"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
                error={errors.new}
              />

              <div className="mt-10 flex items-center">
                <button className="px-6 py-2 rounded-lg text-black bg-primary-200 hover:bg-primary-100">
                  Change Password
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 w-full"
            >
              <Input
                label="Name"
                id="name"
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                error={errors.name}
              />

              <FileInput onChange={(ev) => setFiles(ev.target.files)} />

              <div className="mt-10 flex items-center">
                <button className="px-6 py-2 rounded-lg text-black bg-primary-200 hover:bg-primary-100">
                  Update Profile
                </button>
              </div>
            </form>
          )}
        </>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
