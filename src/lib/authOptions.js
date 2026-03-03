import { loginUser } from "@/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { collections, dbConnect } from "./db";

export const authOptions = {
  providers: [
    // 🔐 Credentials
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        return user || null;
      },
    }),

    //  Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    //  GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    /**
     * Runs on every successful authentication
     */
    async signIn({ user, account }) {
      try {
        if (!user?.email) return false;

        const usersCollection = await dbConnect(collections.USERS);
        const now = new Date();

        // Single atomic upsert (NO duplicate field conflicts)
        const result = await usersCollection.updateOne(
          { email: user.email },
          {
            // Only fields that NEVER change
            $setOnInsert: {
              email: user.email,
              role: "user",
              createdAt: now,
            },

            // Fields that can change anytime
            $set: {
              provider: account?.provider || "credentials",
              name: user?.name || null,
              image: user?.image || null,
              lastLoginAt: now,
              lastAuthAt: now,
            },
          },
          { upsert: true }
        );

        //  Detect register vs login
        const action =
          result.upsertedCount > 0 ? "register" : "login";

        await usersCollection.updateOne(
          { email: user.email },
          {
            $set: { lastAuthAction: action },
          }
        );

        return true;
      } catch (error) {
        console.error("signIn DB update error:", error);
        return false; // prevents 403 loop
      }
    },

    /**
     * Attach custom fields to JWT
     */
    async jwt({ token, user }) {
      if (user?.email) {
        const usersCollection = await dbConnect(collections.USERS);
        const dbUser = await usersCollection.findOne({
          email: user.email,
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser._id?.toString();
        }
      }

      return token;
    },

    /**
     * Expose fields to client session
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login", // optional custom login page
  },

  secret: process.env.NEXTAUTH_SECRET,
};