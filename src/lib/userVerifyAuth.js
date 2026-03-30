import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/db";

export async function userVerifyAuth() {

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const usersCollection = await dbConnect(collections.USERS);

  const dbUser = await usersCollection.findOne({
    email: session.user.email
  });

  if (!dbUser) {
    throw new Error("User record not found in the system.");
  }

  if (dbUser.role !== "user") {
    throw new Error("Access Denied: User privileges required.");
  }

  return dbUser;
}