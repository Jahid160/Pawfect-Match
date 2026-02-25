"use server";
import { collections, dbConnect } from "@/lib/db";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name } = payload;

  if (!email || !password) {
    return { success: false };
  }

  const usersCollection = await dbConnect(collections.USERS);

  const isExist = await usersCollection.findOne({ email });
  if (isExist) {
    return { success: false };
  }

  const hashedPassword = await bcrypt.hash(password, 14);

  // Insert user first
  const result = await usersCollection.insertOne({
    provider: "credentials",
    name,
    email,
    password: hashedPassword,
    role: "user",
    isVerified: false,   // important
    createdAt: new Date(),
  });

  // 2️ Generate OTP
  const otp = generateOTP();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  // 3️ Store OTP in DB
  await usersCollection.updateOne(
    { _id: result.insertedId },
    { $set: { otp, otpExpiry: expiry } }
  );

  // 4️ Send OTP email
  await sendOTPEmail(email, otp);

  // 5️ Return response
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
