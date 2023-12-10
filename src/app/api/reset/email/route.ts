import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const email = body.email;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (user) {
      try {
        const verificationCode = generateVerificationCode();

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_SERVER,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        if (!email) {
          return new NextResponse("Fill out the required fields", {
            status: 400,
          });
        }

        const mailData = {
          from: process.env.SMTP_USER,
          to: email,
          subject: `Password Reset Verification Code`,
          text: `Your verification code for password reset: ${verificationCode} | Sent from: freelancermohon.online`,
          html: `<p>Your verification code for password reset: <strong>${verificationCode}</strong></p><p>Sent from: freelancermohon.online</p>`,
        };

        // Save the verification code in the database
        await prisma.user.update({
          where: { id: user.id },
          data: { verificationCode: verificationCode },
        });

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
        console.error("Error sending email:", error);
        return new NextResponse("Error sending email", { status: 500 });
      }
    } else {
      // Handle the case when the user does not exist
      console.log("User not found");
      return new NextResponse("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

function generateVerificationCode() {
  // Generate a random 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
}
