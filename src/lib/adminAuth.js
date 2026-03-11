import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/db";

export async function verifyAdmin() {

  const session = await getServerSession(authOptions);
console.log("session",session);
  if (!session) {
    throw new Error("Not authenticated");
  }

  const usersCollection = await dbConnect(collections.USERS);

  const dbUser = await usersCollection.findOne({
    email: session.user.email
  });

  if (dbUser.role !== "admin") {
    throw new Error("Admin only");
  }

  return dbUser;
}