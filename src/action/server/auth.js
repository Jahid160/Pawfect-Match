"use server";
import { collections, dbConnect } from "@/lib/db";
import { sendOTPEmail } from "@/lib/sendEmail";
import bcrypt from "bcryptjs";

export const generateOTP = async () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const postUser = async (payload) => {
  const { email, password, name } = payload;
  if (!email || !password) return { success: false };

  const usersCollection = await dbConnect(collections.USERS);

  const isExist = await usersCollection.findOne({ email });
  if (isExist) return { success: false, message: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 14);

  const otp = await generateOTP(); // ✅ FIXED
  const otpHash = await bcrypt.hash(otp, 10);
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  const result = await usersCollection.insertOne({
    provider: "credentials",
    name,
    email,
    password: hashedPassword,
    role: "user",
    isVerified: false,
    otpHash,
    otpExpiry,
    createdAt: new Date(),
  });

  await sendOTPEmail(email, otp);

  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId?.toString(),
    requiresVerification: true,
  };
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) return null;

  const usersCollection = await dbConnect(collections.USERS);
  const user = await usersCollection.findOne({ email });

  if (!user) return null;

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) return null;

  if (!user.isVerified) {
    throw new Error("Email not verified");
  }

  return user;
};
