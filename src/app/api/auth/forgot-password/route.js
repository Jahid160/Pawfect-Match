
import crypto from "crypto";
import { dbConnect, collections } from "@/lib/db";
import { sendResetEmail } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    // 1. Parse request body
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return Response.json({ message: "Email is required" }, { status: 400 });
    }

    // 2. Connect to DB
    const usersCollection = await dbConnect(collections.USERS);
    const user = await usersCollection.findOne({ email });

    // 3. Security: If user doesn't exist, don't leak info
    // But we still log it internally for your debugging
    if (!user) {
      console.log(`Reset requested for non-existent email: ${email}`);
      return Response.json({
        message: "If the email exists, a reset link has been sent.",
      });
    }

    // 4. Generate Token and Expiry (using Date object for MongoDB compatibility)
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes from now

    // 5. Update User Document
    await usersCollection.updateOne(
      { email },
      { 
        $set: { 
          resetToken: token, 
          resetTokenExpiry: expiry 
        } 
      }
    );

    // 6. Construct Reset Link
    // Ensure NEXTAUTH_URL doesn't have a trailing slash in .env
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    console.log(`--- Email Attempt ---`);
    console.log(`To: ${email}`);
    console.log(`Link: ${resetLink}`);

    // 7. Send the Email
    // We wrap this in a try/catch specifically to see Nodemailer errors
    try {
      await sendResetEmail(email, resetLink);
      console.log("✅ Email sent successfully to:", email);
    } catch (mailError) {
      console.error("❌ Nodemailer Error:", mailError.message);
      // We still return a 200/Success to the user for security, 
      // but YOU will see the error in your terminal now.
      return Response.json({ 
        message: "If the email exists, a reset link has been sent." 
      });
    }

    return Response.json({
      message: "If the email exists, a reset link has been sent.",
    });

  } catch (err) {
    console.error("SYSTEM ERROR in forgot-password route:", err);
    return Response.json(
      { message: "An internal error occurred" }, 
      { status: 500 }
    );
  }
}