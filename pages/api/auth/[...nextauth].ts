import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extiende el tipo de la sesión para incluir el campo 'id'
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

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          id: '1', // Cambiado a cadena
          name: 'Admin',
          email: 'admin@example.com',
          username: 'admin',
          password: 'password'
        };

        if (credentials?.username === user.username && credentials.password === user.password) {
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