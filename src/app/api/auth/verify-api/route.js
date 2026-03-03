// import bcrypt from "bcryptjs";
// import { collections, dbConnect } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req) {
// const { email, otp } = await req.json();

// if (!email || !otp) {
// return NextResponse.json({ success: false, message: "Missing email/otp" }, { status: 400 });
// }

// const usersCollection = await dbConnect(collections.USERS);
// const user = await usersCollection.findOne({ email });

// if (!user) {
// return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
// }

// if (!user.otpHash || !user.otpExpiry) {
// return NextResponse.json({ success: false, message: "No OTP found" }, { status: 400 });
// }

// if (new Date() > new Date(user.otpExpiry)) {
// return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 });
// }

// const ok = await bcrypt.compare(otp, user.otpHash);
// if (!ok) {
// return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
// }

// await usersCollection.updateOne(
// { email },
// {
// $set: { isVerified: true },
// $unset: { otpHash: "", otpExpiry: "" },
// }
// );

// return NextResponse.json({ success: true, message: "Verified successfully" });
// }