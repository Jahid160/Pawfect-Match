import crypto from "crypto";
import { dbConnect, collections } from "@/lib/db";
import { sendResetEmail } from "@/lib/sendEmail";

export async function POST(req) {
  const { email } = await req.json();

  try {
    const usersCollection = await dbConnect(collections.USERS);

    const user = await usersCollection.findOne({ email });

    if (!user) {
      // Security: do not reveal if email exists
      return Response.json({
        message: "If the email exists, a reset link has been sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 1000 * 60 * 15; // 15 minutes

    await usersCollection.updateOne(
      { email },
      { $set: { resetToken: token, resetTokenExpiry: expiry } }
    );

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    await sendResetEmail(email, resetLink);

    return Response.json({
      message: "If the email exists, a reset link has been sent.",
    });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}