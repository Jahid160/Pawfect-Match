import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/db";

export async function adminShelterAuth() {

     const session = await getServerSession(authOptions);
     if (!session) {
          throw new Error("Not authenticated");
     }

     const usersCollection = await dbConnect(collections.USERS);

     const dbUser = await usersCollection.findOne({
          email: session.user.email
     });
     console.log(dbUser);

     if (dbUser.role !== "shelter" && dbUser.role !== "admin") {
          throw new Error("User only");
     }

     return dbUser;
}