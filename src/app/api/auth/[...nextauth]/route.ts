import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    token?: string;
    id?: string;
    user: {
      name?: string;
      email?: string;
      id: string;
      username?: string;
      token?: string;
      image?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token/`,
          {
            username: credentials?.email,
            password: credentials?.password,
          }
        );

        if (res.data) {
          const res1 = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/?email=${credentials?.email}`,
            {
              headers: {
                Authorization: `Token ${res.data.token}`,
              },
            }
          );
          return {
            token: res.data?.results?.token,
            ...res1.data?.results?.[0],
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === "google") {
          try {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/dj-rest-auth/google/`,
              {
                access_token: account.access_token,
              }
            );
            const res1 = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/?email=${user?.email}`,
              {
                headers: {
                  Authorization: `Token ${res.data.key}`,
                },
              }
            );
            return {
              ...token,
              id: res1.data?.results?.[0].id || user.id,
              accessToken: res.data?.key || res.data?.token,
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
            };
          } catch (error) {
            console.error("Google auth failed:", error);
            return token;
          }
        }

        if (account?.provider === "credentials") {
          return {
            ...token,
            id: user.id,
            accessToken: user?.token,
            name: user?.username,
            email: user.email,
            provider: account.provider,
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.token = token.accessToken as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
