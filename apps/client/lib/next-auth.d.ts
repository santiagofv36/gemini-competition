import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    google_token: string;
    bearer_token: string;
  }

  interface Session {
    error: string;
  }
}
