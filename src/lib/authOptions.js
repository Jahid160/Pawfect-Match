import { loginUser } from "@/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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

        const user = await loginUser(credentials);

        if (!user) return null;

        // BLOCK UNVERIFIED USERS HERE
        if (!user.isVerified) {
          throw new Error("Email not verified");
          // OR: return null;
        }

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        const usersCollection = await dbConnect(collections.USERS);
        const exists = await usersCollection.findOne({ email: user.email });
        if (exists) return true;

        await usersCollection.insertOne({
          provider: account?.provider || "credentials",
          email: user.email,
          name: user.name || "",
          image: user.image || "",
          role: "user",
          createdAt: new Date(),
        });

        return true;
      } catch (e) {
        console.log("signIn callback error:", e);
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
