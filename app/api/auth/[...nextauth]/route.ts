import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { type JWT } from "next-auth/jwt";
import { type Session } from "next-auth";

interface CustomToken extends JWT {
  accessToken?: string;
  id?: string;
}

interface CustomSession extends Session {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account }) {
      const customToken = token as CustomToken;
      if (account) {
        customToken.accessToken = account.access_token;
      }
      return customToken;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      const customToken = token as CustomToken;
      if (customSession.user) {
        customSession.user.id = customToken.id;
      }
      return customSession;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };