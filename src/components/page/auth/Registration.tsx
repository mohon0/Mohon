"use client";
import InputField from "@/components/common/input/InputField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiPolkadot } from "react-icons/si";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function Registration() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{ name: "", identifier: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(5, "Name must be at least 5 characters")
            .max(40, "Name cannot be more than 40 characters")
            .required("Name is required"),
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

          password: Yup.string()
            .min(6, "Password must be 6 characters long")
            .max(15, "Password cannot be more than 15 characters")
            .required("Password is required"),
        })}
        onSubmit={async (values) => {
          try {
            toast.loading("Please wait a moment...");
            setSubmitting(true);
            const response = await axios.post("/api/registration", values);

            if (response.status === 200) {
              toast.dismiss();
              toast.success("Account created successfully");
              setTimeout(() => {
                router.push("/signin");
              }, 1000);
            } else {
              toast.dismiss();
              toast.error(response.data);
            }
          } catch (error: any) {
            toast.dismiss();
            toast.error(error.response.data);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="col-span-3 p-6 md:rounded-l-2xl">
          <section className="my-8 flex flex-col items-center justify-center gap-4">
            <h1 className="text-center text-2xl font-bold text-primary">
              Create New Account
            </h1>
            <span className=" h-0.5 w-28 rounded-full bg-primary"></span>
            <div className="my-6 flex w-full flex-col gap-1 md:w-2/3">
              <InputField
                name="name"
                type="text"
                id="name"
                label="Name"
                placeholder="Input Your Name"
              />
              <InputField
                name="identifier"
                type="text"
                id="identifier"
                label="Email or Phone Number"
                placeholder="Input Your Email or Phone Number"
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
        </Form>
      </Formik>
    </>
  );
}
