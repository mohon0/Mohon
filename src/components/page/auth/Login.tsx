"use client";
import InputField from "@/components/common/input/InputField";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address").required(),
          password: Yup.string()
            .min(6, "Password must be 6 characters long")
            .max(15, "Password can not be more than 15 characters")
            .required(),
        })}
        onSubmit={async (values) => {
          try {
            setSubmitting(true);
            toast.loading("Please wait...");
            const response = await signIn("credentials", {
              ...values,
              redirect: false,
            });
            toast.dismiss();
            if (response?.error) {
              toast.error("Incorrect email or password");
            } else {
              toast.success("Successful sign-in");
              setTimeout(() => {
                router.back();
              }, 1000);
            }
          } catch (error) {
            toast.dismiss();
            toast.error("Sign in failed");
            console.error(error);
          }
          setSubmitting(false);
        }}
      >
        <Form className="my-8 flex flex-col items-center justify-center gap-4">
          <h1 className="text-center text-3xl font-bold text-primary-200 md:text-4xl lg:text-5xl">
            Log in to Continue
          </h1>
          <span className="flex h-1 w-20 rounded-full bg-primary-200"></span>

          <section className="my-6 flex w-full flex-col gap-8 md:w-2/3 lg:w-1/2">
            <InputField
              name="email"
              placeholder="Input Your Email"
              id="email"
              type="email"
            />
            <div>
              <InputField
                name="password"
                placeholder="Input Your Password"
                id="password"
                type="password"
              />

              <div className="flex items-center justify-end">
                <Link
                  href="/resetpassword"
                  className="text-sm text-primary-200"
                >
                  Forget Password
                </Link>
              </div>
            </div>
            <button
              className="rounded-lg border border-primary-200 bg-black px-4 py-2 text-primary-200 hover:bg-gray-950"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Logging in..." : "Log In"}
            </button>
            <p className="text-center md:hidden">
              Don&apos;t have an account?
              <Link href={"/signup"} className="pl-2 text-xl font-bold">
                Register
              </Link>
            </p>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              theme="dark"
            />
          </section>
        </Form>
      </Formik>
    </>
  );
}
