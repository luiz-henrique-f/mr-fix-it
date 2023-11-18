import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
})


export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      credentials: {
        username: { type: "text", placeholder: "jsmith" },
        password: { type: "password", placeholder: 'Pa$$w0rd' }
      },
      async authorize(credentials, req) {
        const { username, password } = loginUserSchema.parse(credentials)
        const user = await prisma.user.findUnique({
          where: { username: username }
        });

        console.log(user)

        if (!user) return null;

        // const isPasswordValid = await bcrypt.compare(password, user.password)

        // console.log(isPasswordValid)

        // if (!isPasswordValid) return null;

        return user;

      }
    })
  ],
  secret: 'IamVeryHandsome',
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.id;

      return session
    },
    jwt({ token, account, user }) {
      if(account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }

      return token;
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
  }
});