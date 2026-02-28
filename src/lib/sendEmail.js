import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

export async function sendResetEmail(email, resetLink) {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  const info = await transporter.sendMail({
    from: `"Pawfect Match" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });

  return info;
}