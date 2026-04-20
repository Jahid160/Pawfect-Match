import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { collections, dbConnect } from "./db";

export async function shelterVerifyAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const usersCollection = await dbConnect(collections.USERS);

  const dbUser = await usersCollection.findOne({
    email: session.user.email,
  });

  if (!dbUser) {
    throw new Error("User record not found in the system.");
  }

  if (dbUser.role !== "shelter") {
    throw new Error("Access Denied: Shelter privileges required.");
  }

  return dbUser;
}
