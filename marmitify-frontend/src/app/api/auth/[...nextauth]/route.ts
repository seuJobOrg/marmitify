import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email: credentials!.email,
            password: credentials!.password,
          });

          const { access_token, user } = res.data;
          if (access_token && user) {
            return { 
              access_token,
              ...user
            };
          }
          return null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // @ts-ignore
      if (user?.access_token) {
      // @ts-ignore
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback:", session, token);
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
});

export { handler as GET, handler as POST };
