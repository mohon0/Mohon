import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { amount, orderId } = await req.json();

    try {
      const authResponse = await fetch(`${process.env.bkash_grant_token_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          app_key: process.env.bkash_api_key,
          app_secret: process.env.bkash_secret_key,
        }),
      });

      if (!authResponse.ok) {
        throw new Error("Failed to obtain bKash token");
      }

      const authData = await authResponse.json();
      const id_token = authData.id_token;

      const api = process.env.bkash_create_payment_url || "";
      if (!api) {
        console.error("bKash create payments URL is not defined");
        return new NextResponse(
          "Error: bKash create payments URL is not defined",
          { status: 500 }
        );
      }

      const key = process.env.bkash_api_key || "";

      const paymentResponse = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: id_token,
          "x-app-key": key,
        },
        body: JSON.stringify({
          mode: "0011",
          payerReference: "woe",
          callbackURL: "http://localhost:3000/api/bkash/payment/callback",
          amount: "30",
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: "34342",
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Failed to create bKash payment");
      }

      console.log(paymentResponse);
      return new NextResponse("success");
    } catch (error) {
      console.error("Error creating bKash payment:", error);
      return new NextResponse(`Error creating bKash payment: ${error}`, {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return new NextResponse("Error", { status: 400 });
  }
}
