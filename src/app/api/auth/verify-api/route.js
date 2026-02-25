import { collections, dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, otp } = await req.json();

  const usersCollection = await dbConnect(collections.USERS);

  const user = await usersCollection.findOne({ email });

  if (!user) {
    return NextResponse.json({ success: false });
  }

  if (user.otp !== otp || new Date() > user.otpExpiry) {
    return NextResponse.json({ success: false });
  }

  await usersCollection.updateOne(
    { email },
    {
      $set: { isVerified: true },
      $unset: { otp: "", otpExpiry: "" },
    }
  );

  return NextResponse.json({ success: true });
}