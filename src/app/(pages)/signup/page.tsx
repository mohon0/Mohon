"use client";
import Input from "@/components/common/input/Input";
import SigninInput from "@/components/common/input/SigninInput";
import RegistrationValidation from "@/components/validation/RegistrationValidation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiPolkadot } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const handleEmailChange = (e: { target: { value: any } }) => {
    setData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const handleNameChange = (e: { target: { value: any } }) => {
    setData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };
  const handlePasswordChange = (e: { target: { value: any } }) => {
    setData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = RegistrationValidation({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const loadingToastId = toast.loading("Please wait a momment...", {
      autoClose: false,
      theme: "dark",
    });
    const response = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    toast.dismiss(loadingToastId);
    if (response.status !== 200) {
      toast.error(
        "Sign-up failed. Please check your email and password. email may already exits"
      );
    } else {
      toast.success("Account created successfully");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    }
  };
  if (session) {
    router.push("/dashboard");
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p>You are already logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center md:mt-12 lg:mt-28 ">
      <div className="grid md:grid-cols-5 grid-cols-1 rounded-2xl justify-around shadow-2xl md:w-10/12 w-11/12">
        <div className="col-span-3 p-6 bg-blue-950   md:rounded-l-2xl">
          <section className="flex gap-4 items-center justify-center flex-col my-8">
            <h1 className="font-bold text-primary-200 text-3xl text-center">
              Create New Account
            </h1>
            <span className="h-1 w-20 rounded-full bg-primary-200 flex"></span>
            <form
              className="flex flex-col gap-8 my-6 w-full md:w-2/3 lg:w-1/2"
              onSubmit={handleSubmit}
            >
              <SigninInput
                label="Name"
                id="name"
                error={errors.name}
                type="text"
                onChange={handleNameChange}
                value={data.name}
              />
              <SigninInput
                label="Email"
                id="email"
                error={errors.email}
                type="email"
                onChange={handleEmailChange}
                value={data.email}
              />
              <Input
                label="Password"
                id="password"
                error={errors.password}
                type="password"
                onChange={handlePasswordChange}
                value={data.password}
              />
              <button className="flex items-center justify-center w-full h-10 bg-black border rounded-lg text-primary-100 font-bold hover:bg-gray-900 border-primary-200">
                Registration
              </button>
            </form>
          </section>
          <p className="md:hidden">
            Already have an account?{" "}
            <Link href={"/signin"} className="text-xl font-bold">
              Login
            </Link>
          </p>
          <div className="flex items-center text-slate-50 justify-center mt-10 gap-4">
            <Link href={"/policy"}>Privacy Policy</Link>
            <SiPolkadot />
            <Link href={"/terms"}>Terms & Condtions</Link>
          </div>
        </div>
        <div className="hidden md:flex bg-gray-800 col-span-2  md:rounded-r-2xl gap-4 p-16 items-center justify-center text-center flex-col">
          <span className="font-bold text-3xl text-lightgray-100">
            Hi, There!
          </span>
          <span className="h-1 w-20 rounded-full bg-lightgray-100 flex"></span>
          <span className="text-darkgray-100 my-4">
            Already have an account?
          </span>
          <Link href="/signin">
            <button className="bg-btn-100 px-8 py-2 rounded-md text-sm bg-black border text-primary-200 hover:bg-gray-900 font-bold border-primary-200">
              Log In
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}