import { loginUser } from "@/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { collections, dbConnect } from "./db";

export const authOptions = {
  providers: [
    //  Credentials
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
     * সাইন ইন করার সময় ইউজারকে ডাটাবেজে সেভ বা আপডেট করা
     */
    async signIn({ user, account }) {
      try {
        if (!user?.email) return false;

        const usersCollection = await dbConnect(collections.USERS);
        const now = new Date();

        // ইউজার থাকলে শুধু লগইন টাইম আপডেট হবে, না থাকলে নতুন ক্রিয়েট হবে
        const result = await usersCollection.updateOne(
          { email: user.email },
          {
            $setOnInsert: {
              email: user.email,
              role: "user",
              createdAt: now,
              location: "Savar, Dhaka", // ডিফল্ট লোকেশন
            },
            $set: {
              provider: account?.provider || "credentials",
              lastLoginAt: now,
              status: "active",
            },
          },
          { upsert: true }
        );

        // নতুন ইউজার নাকি পুরাতন তা ডিটেক্ট করা
        const action = result.upsertedCount > 0 ? "register" : "login";
        await usersCollection.updateOne(
          { email: user.email },
          { $set: { lastAuthAction: action } }
        );

        return true;
      } catch (error) {
        console.error("signIn DB update error:", error);
        return false;
      }
    },

    /**
     * JWT টোকেনে কাস্টম ডাটা (role, id, location, image) সেট করা
     */
    async jwt({ token, user, trigger, session }) {
      const usersCollection = await dbConnect(collections.USERS);

      // যদি ক্লায়েন্ট সাইড থেকে update() কল করা হয় (যেমন প্রোফাইল পিকচার চেঞ্জ করলে)
      if (trigger === "update" && session) {
        token.name = session.name || token.name;
        token.picture = session.image || token.picture;
        token.location = session.location || token.location;
      }

      // ইনিশিয়াল লগইন বা টোকেন রিফ্রেশ করার সময় DB থেকে ডাটা আনা
      if (user?.email || token?.email) {
        const dbUser = await usersCollection.findOne({
          email: user?.email || token.email,
        });

        if (dbUser) {
          token.id = dbUser._id?.toString();
          token.role = dbUser.role;
          token.location = dbUser.location;
          token.picture = dbUser.image || user?.image || token.picture;
          token.name = dbUser.name || user?.name || token.name;
        }
      }

      return token;
    },

    /**
     * সেশনে টোকেনের ডাটাগুলো এক্সপোজ করা যাতে useSession() দিয়ে পাওয়া যায়
     */
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
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};