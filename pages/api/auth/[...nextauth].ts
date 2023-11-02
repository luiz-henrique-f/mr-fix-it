import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: 'IamVeryHandsome',
  callbacks: {
    async redirect({ url, baseUrl }) {
      return '/createProfessional'
    },
    session: async ({ session, user }) => {
      return {
        ...session,
        user: user,
      };
    },
  },
});