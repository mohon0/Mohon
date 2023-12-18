"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../ui/button";

export default function Payment() {
  const makePaymentRequest = async () => {
    try {
      toast.loading("Please wait...");
      const username = "your-username"; // Replace with your actual username
      const password = "your-password"; // Replace with your actual password

      const response = await fetch("/api/bkash/payment/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: username,
          password: password,
        },

        body: JSON.stringify({ amount: 10, orderId: "randomId" }),
      });
      toast.dismiss();

      if (!response.ok) {
        toast.error("Payment unsuccessful.");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      toast.success("Payment successful");

      const responseData = await response.json();
      console.log("Payment response:", responseData);
    } catch (error) {
      console.error("Error making payment request:", error);
    }
  };

  return (
    <div>
      <Button size="lg" variant="default" onClick={makePaymentRequest}>
        Pay With Bkash
      </Button>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
