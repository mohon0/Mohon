import { NextRequest, NextResponse } from "next/server";
import * as nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const { name, email, message } = await req.json();

    if (!message || !name || !email) {
      return new NextResponse("Fill out the required fields", { status: 400 });
    }

    const mailData = {
      from: email,
      to: email,
      subject: `Message from ${name}`,
      text: `${message} | Sent from: ${email}`,
      html: `<div>${message}</div><p>Sent from: ${email}</p>`,
    };

    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err: Error | null, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info.accepted);
        }
      });
    });

    return new NextResponse("Message sent successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error sending mail", { status: 500 });
  }
}
