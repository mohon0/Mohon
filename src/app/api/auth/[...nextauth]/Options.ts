import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: {
          label: "Email or Phone Number",
          type: "text",
          placeholder: "email or phone number",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials.password) {
          return null;
        }

        let user;
        if (credentials.identifier.includes("@")) {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.identifier,
            },
          });
        } else {
          user = await prisma.user.findUnique({
            where: {
              phoneNumber: credentials.identifier,
            },
          });
        }

        if (!user) {
          return null;
        }
        if (user.password) {
          const passwordMatch = await bcrypt.compareSync(
            credentials.password,
            user.password,
          );
          if (!passwordMatch) {
            return null;
          }
        }

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({
      session,
      token,
    }: {
      session: Session;
      token: string | JWT;
    }) => ({
      ...session,
      user: {
        ...session.user,
        id: typeof token === "string" ? token : token.sub,
      },
    }),
  },

  session: {
    strategy: "jwt" as "jwt",
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
