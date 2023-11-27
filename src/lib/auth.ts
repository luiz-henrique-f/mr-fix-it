import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt, { compare } from 'bcrypt'

const prisma = new PrismaClient();

// const loginUserSchema = z.object({
//   username: z.string(),
//   password: z.string(),
// })


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: 'IamVeryHandsome',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: "text", placeholder: "jsmith" },
        password: { type: "password", placeholder: 'Pa$$w0rd' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const existingUser = await prisma.user.findUnique({
          where: { username: credentials?.username },
        })
        if (!existingUser) {
          return null
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
        }

        // const { username, password } = loginUserSchema.parse(credentials)
        // const user = await prisma.user.findUnique({
        //   where: { username: username }
        // });

        // console.log(user)

        // if (!user) return null;

        // // const isPasswordValid = await bcrypt.compare(password, user.password)

        // // console.log(isPasswordValid)

        // // if (!isPasswordValid) return null;

        // return user;

      }
    })
  ],
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
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       return {
  //         ...token,
  //         username: user.username,
  //       }
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         username: token.username,

  //       },
  //     }

  //     // return session
  //   },
  // },
  //   jwt({ token, account, user }) {
  //   if(account) {
  //     token.accessToken = account.access_token;
  //     token.id = user.id;
  //   }

  //       return token;
  // }
};