"use client";
import InputField from "@/components/common/input/InputField";
import { Button } from "@/components/ui/button";
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
        initialValues={{ identifier: "", password: "" }}
        validationSchema={Yup.object({
          identifier: Yup.string()
            .test(
              "valid-identifier",
              "Invalid email or phone number",
              function (value) {
                if (!value) return false;
                const isEmail = Yup.string().email().isValidSync(value);
                const isPhoneNumber = Yup.string()
                  .matches(/^(\+)?(88)?01[0-9]{9}$/, "Invalid phone number")
                  .isValidSync(value);
                return isEmail || isPhoneNumber;
              },
            )
            .required("Email or Phone number is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={async (values) => {
          try {
            setSubmitting(true);
            toast.loading("Please wait...");

            // Login with either email or phone number based on validation
            const response = await signIn("credentials", {
              ...values,
              redirect: false,
            });

            toast.dismiss();

            if (response?.error) {
              toast.error("Incorrect email, phone number, or password");
            } else {
              toast.success("Successful sign-in");
              setTimeout(() => {
                router.back();
              }, 1000);
            }
          } catch (error) {
            toast.dismiss();
            toast.error("Sign in failed");
          }
          setSubmitting(false);
        }}
      >
        <Form className="col-span-3 p-6 md:rounded-l-2xl">
          <section className="my-8 flex flex-col items-center justify-center gap-4">
            <h1 className="text-center text-2xl font-bold text-primary-200">
              Log in to Continue
            </h1>
            <span className=" h-0.5 w-28 rounded-full bg-primary-200"></span>

            <div className="my-6 flex w-full flex-col gap-1 md:w-2/3">
              <InputField
                name="identifier"
                placeholder="Input Your Email or Phone Number"
                id="identifier"
                type="text"
                label="Email or Phone Number"
              />
              <div>
                <InputField
                  name="password"
                  placeholder="Input Your Password"
                  id="password"
                  type="password"
                  label="Password"
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
              <Button className="mt-5" disabled={submitting} type="submit">
                {submitting ? "Logging in..." : "Log In"}
              </Button>
            </div>
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
