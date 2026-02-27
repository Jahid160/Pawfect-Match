import bcrypt from "bcryptjs";
import { dbConnect, collections } from "@/lib/db";

export async function POST(req) {
  const { token, password } = await req.json();

  try {
    const usersCollection = await dbConnect(collections.USERS);

    const user = await usersCollection.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.updateOne(
      { resetToken: token },
      { $set: { password: hashedPassword }, $unset: { resetToken: "", resetTokenExpiry: "" } }
    );

    return Response.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}