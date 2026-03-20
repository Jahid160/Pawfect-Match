import { loginUser } from "@/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { collections, dbConnect } from "./db";

export const authOptions = {
  providers: [
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
        if (!user?.email) return false;

        const usersCollection = await dbConnect(collections.USERS);
        const now = new Date();

        // ইউজার ইনফো আপডেট বা ইনসার্ট একবারে করা (Atomicity)
        await usersCollection.updateOne(
          { email: user.email },
          {
            $setOnInsert: {
              email: user.email,
              name: user.name,
              image: user.image,
              role: "user",
              createdAt: now,
              location: "Savar, Dhaka",
              status: "active",
            },
            $set: {
              provider: account?.provider || "credentials",
              lastLoginAt: now,
              // সোশ্যাল লগইনের ক্ষেত্রে ইমেজ আপডেট রাখা ভালো
              ...(account?.provider !== "credentials" && { image: user.image }),
            },
          },
          { upsert: true }
        );

        return true;
      } catch (error) {
        console.error("signIn DB update error:", error);
        return false;
      }
    },

    async jwt({ token, user, trigger, session }) {
      // ১. যদি ক্লায়েন্ট থেকে update() কল করা হয় (প্রোফাইল আপডেট)
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }

      // ২. যদি প্রথমবার লগইন হয় (user অবজেক্ট থাকবে)
      if (user) {
        const usersCollection = await dbConnect(collections.USERS);
        const dbUser = await usersCollection.findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser._id?.toString();
          token.role = dbUser.role;
          token.location = dbUser.location;
          token.picture = dbUser.image || user.image;
          token.name = dbUser.name || user.name;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.location = token.location;
        session.user.image = token.picture;
        session.user.name = token.name;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};