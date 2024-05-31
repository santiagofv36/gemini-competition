import NextAuth from 'next-auth/next';
// import GoogleProvider from 'next-auth/providers/google';
// import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { NextAuthOptions } from 'next-auth';
import axios from 'axios';
import { User } from '@shared/index';

async function refreshToken(token: JWT) {
  const res = await axios.post<User>(
    process.env.NEXT_PUBLIC_API_URL + '/auth/refresh',
    {
      refreshToken: token.tokens.refreshToken,
    }
  );

  return {
    ...token,
    ...res.data,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // GithubProvider({
    //     clientId: process.env.GITHUB_CLIENT_ID,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email, password } = credentials;
        const res = await axios.post<User>(
          process.env.NEXT_PUBLIC_API_URL + '/auth/login',
          {
            email,
            password,
          }
        );

        if (res.status === 401) {
          return null;
        }

        return res.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token?.tokens?.expiresIn) {
        return token;
      }

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.tokens = token.tokens;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
