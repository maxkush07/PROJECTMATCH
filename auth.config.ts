import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import { loginSchema } from '@/validations/auth';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

      if (isAuthPage) {
        return !isLoggedIn;
      }

      return isLoggedIn;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);

        if (!validated.success) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: validated.data.email },
          include: { profile: true },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await verifyPassword(
          validated.data.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
