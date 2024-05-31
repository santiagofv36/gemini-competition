import { Tokens, User } from '@shared/models';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: User;
    tokens: Tokens;
  }
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    tokens: Tokens;
  }
}
