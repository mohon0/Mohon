"use client";
import InputField from "@/components/common/input/InputField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiPolkadot } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function Registration() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(5, "Name Must be at least 5 characters")
            .max(20, "Name can not be more than 20 characters")
            .required(),
          email: Yup.string().email("Invalid email address").required(),
          password: Yup.string()
            .min(6, "Password must be 6 characters long")
            .max(15, "Password can not be more than 15 characters")
            .required(),
        })}
        onSubmit={async (values) => {
          const loadingToastId = toast.loading("Please wait a moment...", {
            autoClose: false,
            theme: "dark",
          });

          try {
            setSubmitting(true);
            const response = await axios.post("/api/registration", values);
            toast.dismiss(loadingToastId);

            if (response.status !== 200) {
              setSubmitting(false);
              toast.error(
                "Sign-up failed. Please check your email and password. Email may already exist",
              );
            } else {
              setSubmitting(false);
              toast.success("Account created successfully");
              setTimeout(() => {
                router.push("/signin");
              }, 1000);
            }
          } catch (error) {
            setSubmitting(false);
            toast.error("An error occurred. Please try again later.");
            console.error("Error submitting registration:", error);
            toast.dismiss(loadingToastId);
          }
        }}
      >
        <Form className="col-span-3 p-6 md:rounded-l-2xl">
          <section className="my-8 flex flex-col items-center justify-center gap-4">
            <h1 className="text-center text-2xl font-bold text-primary-200">
              Create New Account
            </h1>
            <span className=" h-0.5 w-28 rounded-full bg-primary-200"></span>
            <div className="my-6 flex w-full flex-col gap-1 md:w-2/3">
              <InputField
                name="name"
                type="text"
                id="name"
                label="Name"
                placeholder="Input Your Name"
              />
              <InputField
                name="email"
                type="email"
                id="email"
                label="Email"
                placeholder="Input Your Email"
              />
              <InputField
                name="password"
                type="password"
                id="password"
                label="Password"
                placeholder="Input Your Password"
              />

              <Button className="mt-5" disabled={submitting} type="submit">
                {submitting ? "Registering..." : "Registration"}
              </Button>
            </div>
          </section>
          <p className="md:hidden">
            Already have an account?
            <Link href={"/signin"} className="text-xl font-bold">
              Login
            </Link>
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 text-slate-50">
            <Link href={"/policy"}>Privacy Policy</Link>
            <SiPolkadot />
            <Link href={"/terms"}>Terms & Condtions</Link>
          </div>
          <ToastContainer position="top-center" theme="dark" />
        </Form>
      </Formik>
    </>
  );
}
