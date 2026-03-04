
import nodemailer from "nodemailer";

export async function sendResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Your new App Password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Pawfect Match" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });
    console.log("✅ Email sent successfully!");
    return info;
  } catch (error) {
    console.error("❌ Send Email Error:", error);
    throw error;
  }
}