import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { User } from '@shared/index';
import { axios } from './api';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            'openid profile email https://www.googleapis.com/auth/gmail.readonly',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ token, session }) {
      const { user } = token as any;

      try {
        const res = await axios.get<User>('/auth/current-user', {
          headers: {
            Authorization: `Bearer ${user.bearer_token}`,
          },
        });

        session.user = res.data;
        session.error = '';
      } catch (e) {
        session.error = 'Session expired';
      }

      return session;
    },
    async signIn({ user, account }): Promise<any> {
      if (account && account.provider === 'google') {
        const res = await axios.get<User>('/user', {
          data: {
            email: user.email,
          },
        });

        if (Number(res?.data?.status) === 400) {
          try {
            const userRes = await axios.post<User>('/auth/signup', {
              email: user.email,
              name: user.name,
              password: 'Gmail-Automator,%998',
              google_token: account.access_token,
            });

            const tokenRes = await axios.post<{ token: string }>(
              '/auth/login',
              {
                email: user.email,
                password: 'Gmail-Automator,%998',
              }
            );

            user.google_token = userRes.data.google_token;
            user.bearer_token = tokenRes.data.token;

            return userRes.data;
          } catch (e: any) {
            console.log(e.response.data.message);
            return null;
          }
        }

        await axios.post<User>('/user/assign-google-token', {
          email: user.email,
          google_token: account.access_token,
        });

        const token = await axios.post<{ token: string }>('/auth/login', {
          email: user.email,
          password: 'Gmail-Automator,%998',
        });

        user.bearer_token = token.data.token;
        user.google_token = res.data.google_token;

        return res.data;
      }
    },
  },
  events: {
    async signOut({ token }) {
      const { user } = token as any;
      try {
        await axios.delete('/auth/logout', {
          headers: {
            Authorization: `Bearer ${user.bearer_token}`,
          },
        });
      } catch (e) {
        console.log(e);
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
