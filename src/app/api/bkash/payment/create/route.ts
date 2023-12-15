import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { amount, orderId } = await req.json();

    try {
      const response = await fetch(`${process.env.bkash_grant_token_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.bkash_username || "", // Provide a default value or handle the undefined case
          password: process.env.bkash_password || "", // Provide a default value or handle the undefined case
        },
        body: JSON.stringify({
          app_key: process.env.bkash_api_key,
          app_secret: process.env.bkash_secret_key,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to obtain bKash token");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Error obtaining bKash token:", error);
      return new NextResponse("Error obtaining bKash token", { status: 500 });
    }

    console.log(amount, orderId);
    return new NextResponse("API is working", { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return new NextResponse("Error", { status: 400 });
  }
}
