import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    username: string
  }

  interface Session {
    user: User & {
      username: string,
      id: string;
    } & Session['user']

    token: {
      username: string
    }
  }
}