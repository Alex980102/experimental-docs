import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string | number | null | undefined | unknown;
    } & DefaultSession['user'];
  }

  interface User {
    id: string | number | null | undefined | unknown; 
  }
}

// FIXME: Se deben de almacenar los usuarios en una base de datos
const users = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    username: 'admin',
    password: 'password',
  },
  {
    id: '2',
    name: 'User1',
    email: 'user1@example.com',
    username: 'user1',
    password: 'password1',
  },
  {
    id: '3',
    name: 'User2',
    email: 'user2@example.com',
    username: 'user2',
    password: 'password2',
  },
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = users.find(
          (user) =>
            user.username === credentials?.username && user.password === credentials.password
        );
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
} as NextAuthOptions);