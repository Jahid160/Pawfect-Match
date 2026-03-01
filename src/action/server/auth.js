"use server";
import { collections, dbConnect } from "@/lib/db";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name } = payload;

  if (!email || !password) {
    return { success: false };
  }

  // ✅ FIRST get the collection
  const usersCollection = await dbConnect(collections.USERS);

  const newUser = {
    provider: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 14),
    role: "user",
  };

  // ✅ THEN call insertOne
  const result = await usersCollection.insertOne(newUser);

  return {
    ...result,
    insertedId: result.insertedId?.toString(),
  };
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) return null;

  // ✅ FIRST get the collection
  const usersCollection = await dbConnect(collections.USERS);

  // ✅ THEN call findOne
  const user = await usersCollection.findOne({ email });

  if (!user) return null;

  const isMatched = await bcrypt.compare(password, user.password);

  if (isMatched) return user;

  return null;
};