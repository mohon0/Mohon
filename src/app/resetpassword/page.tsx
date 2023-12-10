"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
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

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      toast.loading("Please wait...");
      const response = await fetch("/api/reset/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      toast.dismiss();

      if (response.ok) {
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
      const response = await fetch(
        `/api/reset/code?code=${code}&email=${userEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.dismiss();

      if (response.ok) {
        toast.success("Verification successful");
        setShowPasswordReset(true);
      } else {
        toast.error("Verification failed");
      }
    } catch (error) {
      setShowPasswordReset(false);
    }
  };

  const handlePasswordResetSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate resetting the password
    // In a real scenario, this would be an API call to your server
    console.log("Password reset successful!");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 shadow-md rounded-md w-96 border">
        <h2 className="text-2xl font-bold mb-6 ">Password Reset</h2>

        {showPasswordReset ? (
          <>
            <p className="text-sm mb-4">Enter your new password.</p>
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
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
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
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Reset Password
              </Button>
            </form>
          </>
        ) : showVerification ? (
          <>
            <p className="text-sm mb-4">
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
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />

              <Button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Verify Code
              </Button>
            </form>
          </>
        ) : (
          <>
            <p className="text-sm mb-4">
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
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />

              <Button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Send Verification Code
              </Button>
            </form>
          </>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
