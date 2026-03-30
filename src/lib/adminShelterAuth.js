import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/db";

export async function adminShelterAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    throw new Error("Authentication required. Please log in.");
  }

  const usersCollection = await dbConnect(collections.USERS);

  const dbUser = await usersCollection.findOne({
    email: session.user.email,
  });
  if (!dbUser) {
    throw new Error("User record not found in database.");
  }

  const allowedRoles = ["admin", "shelter"];
  if (!allowedRoles.includes(dbUser.role)) {
    throw new Error("Access denied: You do not have the required permissions.");
  }

  return dbUser;
}
