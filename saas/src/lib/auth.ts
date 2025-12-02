import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { z } from "zod";

import { prisma } from "./prisma";
import { env } from "./env";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { type: "email" },
      password: { type: "password" }
    },
    async authorize(rawCredentials) {
      const parsed = credentialsSchema.safeParse(rawCredentials);
      if (!parsed.success) {
        throw new Error("Invalid credentials");
      }

      const { email, password } = parsed.data;
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user || !user.password) {
        throw new Error("No account found");
      }

      const isValid = await compare(password, user.password);
      if (!isValid) {
        throw new Error("Incorrect password");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name
      };
    }
  })
];

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  );
}

if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHub({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    })
  );
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
        session.user.plan = token.plan as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? "USER";
      }

      if (token.sub) {
        const subscription = await prisma.subscription.findUnique({
          where: { userId: token.sub }
        });
        token.plan = subscription?.plan ?? "FREE";
      }
      return token;
    }
  },
  pages: {
    signIn: "/auth/sign-in"
  },
  trustHost: true,
  secret: env.NEXTAUTH_SECRET
});


