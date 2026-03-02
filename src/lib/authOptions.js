
import { loginUser } from "@/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { collections, dbConnect } from "./db";
// import { loginUser } from "@/action/server/auth";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        // Return null if user data could not be retrieved
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
    // ...add more providers here
  ],
  callbacks: {



    async signIn({ user, account }) {
      const usersCollection = await dbConnect(collections.USERS);

      const isExist = await usersCollection.findOne({
        email: user.email,
      });

      if (isExist) {
        return true;
      }

      const newUser = {
        provider: account?.provider,
        email: user.email,
        name: user.name,
        image: user.image,
        role: "user",
      };

      const result = await usersCollection.insertOne(newUser);

      return result.acknowledged;
    },

    async session({ session, token, user }) {
      if (token) {
        session.role = token?.role;
        session.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("account data in token", token);
      if (user) {
        if (account.provider == "google") {


          const usersCollection = await dbConnect(collections.USERS);

          const dbUser = await usersCollection.findOne({
            email: user.email,
          });

          token.role = dbUser?.role;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role;
          token.email = user?.email;
        }
      }
      return token;
    },
  },
};
