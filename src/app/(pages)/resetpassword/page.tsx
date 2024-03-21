"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PasswordResetProps {}

export default function PasswordResetPage(props: PasswordResetProps) {
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const router = useRouter();
  const { status, data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      toast.loading("Please wait...");
      const response = await axios.post("/api/reset/email", {
        email: userEmail,
      });
      toast.dismiss();

      if (response.status === 200) {
        toast.success("Email sent successfully");
        setShowVerification(true);
      } else {
        toast.error("Email sent failed");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Email sent failed");
    }
  };

  const handleVerificationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast.loading("Please wait...");
      const response = await axios.get(
        `/api/reset/code?code=${code}&email=${userEmail}`,
      );
      toast.dismiss();

      if (response.status === 200) {
        toast.success("Verification successful");
        setShowPasswordReset(true);
      } else {
        toast.error("Verification failed");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    }
  };

  const handlePasswordResetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please check and try again.");
      return;
    }

    try {
      toast.loading("Please wait...");

      const response = await axios.put("/api/reset/password", {
        email: userEmail,
        password: newPassword,
        code: code,
      });

      toast.dismiss();

      if (response.status === 200) {
        toast.success("Password reset successful!");
        router.push("/signin");
      } else {
        toast.error("Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Password reset failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" mx-2 mt-32 flex items-center justify-center">
      <div className="w-96 rounded-md border p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold ">Password Reset</h2>

        {showPasswordReset ? (
          <>
            <p className="mb-4 text-sm">Enter your new password.</p>
            <form
              className="flex flex-col gap-4"
              onSubmit={handlePasswordResetSubmit}
            >
              <label htmlFor="newPassword" className="text-sm font-semibold">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit">Reset Password</Button>
            </form>
          </>
        ) : showVerification ? (
          <>
            <p className="mb-4 text-sm">
              Enter the verification code sent to your email.
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleVerificationSubmit}
            >
              <label
                htmlFor="verificationCode"
                className="text-sm font-semibold"
              >
                Verification Code
              </label>
              <Input
                type="text"
                id="verificationCode"
                value={code}
                name="verificationCode"
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
              />

              <Button type="submit">Verify Code</Button>
            </form>
          </>
        ) : (
          <>
            <p className="mb-4 text-sm">
              Please enter the email associated with your account. We will send
              you a verification code to reset your password.
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
              <label htmlFor="email" className="text-sm font-semibold">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Your email address"
              />

              <Button type="submit">Send Verification Code</Button>
            </form>
          </>
        )}
      </div>
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
    </div>
  );
}
