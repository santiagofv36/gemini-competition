import GoogleProvider from 'next-auth/providers/google';
// import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { User } from '@shared/index';
import { axios } from './api';
import { AxiosError } from 'axios';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
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
        const res = await axios.post<User>('/auth/login', {
          email,
          password,
        });

        if (res.status === 401) {
          return null;
        }

        return res.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.user) session.user = token.user as any;
      return session;
    },
    async signIn({ user, account }): Promise<any> {
      if (account && account.provider === 'google') {
        const res = await axios.get<User>('/user', {
          data: {
            email: user.email,
          },
        });
        /**
         * @param account{
          provider: string,
          type: string,
          providerAccountId: string,
          access_token: string,
          expires_at: number,
          scope: string,
          token_type: 'Bearer',
          id_token: string,
          }
         */

        if (Number(res?.data?.status) === 400) {
          try {
            const userRes = await axios.post<User>('/auth/signup', {
              email: user.email,
              name: user.name,
              password: 'Gmail-Automator,%998',
            });

            return userRes.data;
          } catch (e) {
            console.log(e);
            return null;
          }
        }

        return res.data;
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
