import InputField from "@/components/common/input/InputField";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiPolkadot } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function Registration() {
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
            const response = await axios.post("/api/registration", values);
            toast.dismiss(loadingToastId);

            if (response.status !== 200) {
              toast.error(
                "Sign-up failed. Please check your email and password. Email may already exist",
              );
            } else {
              toast.success("Account created successfully");
              setTimeout(() => {
                router.push("/signin");
              }, 1000);
            }
          } catch (error) {
            toast.error("An error occurred. Please try again later.");
            console.error("Error submitting registration:", error);
            toast.dismiss(loadingToastId);
          }
        }}
      >
        <Form className="col-span-3 bg-blue-950 p-6   md:rounded-l-2xl">
          <section className="my-8 flex flex-col items-center justify-center gap-4">
            <h1 className="text-center text-3xl font-bold text-primary-200">
              Create New Account
            </h1>
            <span className="flex h-1 w-20 rounded-full bg-primary-200"></span>
            <div className="my-6 flex w-full flex-col gap-8 md:w-2/3 lg:w-1/2">
              <InputField
                name="name"
                type="text"
                id="name"
                placeholder="Name"
              />
              <InputField
                name="email"
                type="email"
                id="email"
                placeholder="Email"
              />
              <InputField
                name="password"
                type="password"
                id="password"
                placeholder="Password"
              />

              <button className="flex h-10 w-full items-center justify-center rounded-lg border border-primary-200 bg-black font-bold text-primary-100 hover:bg-gray-900">
                Registration
              </button>
            </div>
          </section>
          <p className="md:hidden">
            Already have an account?{" "}
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
