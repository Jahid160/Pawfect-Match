import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./db";
export const authOptions = {
  // secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        return await loginUser(credentials);
      },
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        const db = dbConnect(collections.USERS);
        const exists = await db.findOne({ email: user.email });
        if (exists) return true;

        await db.insertOne({
          provider: account?.provider,
          email: user.email,
          name: user.name,
          image: user.image,
          role: "user",
        });
        return true;
      } catch {
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.role = user.role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
