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


        const ip =
          // headersList.get("x-forwarded-for")?.split(",")[0] ||
          "103.205.69.67";
        // 2. Fetch Location data using the IP
        let location = "Localhost";

        // Only fetch if it's NOT a local address
        if (ip !== "::1" && ip !== "127.0.0.1") {
          try {
            // Using ip-api.com (Alternative provider)
            const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
            const geoData = await geoRes.json();

            if (geoData && geoData.status === "success") {
              location = `${geoData.city}, ${geoData.country}`;
            } else {
              // If the API fails or returns 'fail' for a reserved IP
              location = geoData.message || "Unknown Location";
            }
          } catch (err) {
            console.error("Geo API Error:", err);
            location = "Service Unavailable";
          }
        }
        const usersCollection = await dbConnect(collections.USERS);
        const now = new Date();

        await usersCollection.updateOne(
          { email: user.email },
          {
            $setOnInsert: {
              email: user.email,
              name: user.name,
              image: user.image,
              role: "user",
              createdAt: now,
              status: "active",
            },

            $set: {
              provider: account?.provider || "credentials",
              lastLoginAt: now,
              ipAddress: ip,
              location: location,
            },
          },
          { upsert: true },
        );

        return true;
      } catch (error) {
        console.error("signIn DB update error:", error);
        return false;
      }
    },

    async jwt({ token, user, trigger, session }) {

      if (trigger === "update" && session?.user) {
        if (session.user.image) token.picture = session.user.image;
        if (session.user.name) token.name = session.user.name;
        if (session.user.role) token.role = session.user.role;
        return token;
      }


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
        return token;
      }


      if (token?.email) {
        const usersCollection = await dbConnect(collections.USERS);
        const dbUser = await usersCollection.findOne(
          { email: token.email },
          { projection: { role: 1 } }
        );
        if (dbUser && dbUser.role !== token.role) {
          token.role = dbUser.role;
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
