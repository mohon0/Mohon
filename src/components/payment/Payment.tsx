"use client";
import { Button } from "../ui/button";

export default function Payment() {
  const makePaymentRequest = async () => {
    try {
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
    </div>
  );
}
