"use server";
import { collections, dbConnect } from "@/lib/db";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  try {
    const { email, password, name } = payload;

    if (!email || !password) {
      return { error: "MISSING_FIELDS" };
    }

    const usersCollection = await dbConnect(collections.USERS);

    //  Check existing email (case-insensitive recommended)
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return { error: "EMAIL_EXISTS" };
    }

    const newUser = {
      provider: "credentials",
      name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12),
      role: "user",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return {
      success: true,
      insertedId: result.insertedId?.toString(),
    };
  } catch (error) {
    //  Handle duplicate key error (unique index protection)
    if (error.code === 11000) {
      return { error: "EMAIL_EXISTS" };
    }

    console.error("Registration error:", error);
    return { error: "SERVER_ERROR" };
  }
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) return null;

  //  FIRST get the collection
  const usersCollection = await dbConnect(collections.USERS);

  //  THEN call findOne
  const user = await usersCollection.findOne({ email });

  if (!user) return null;

  const isMatched = await bcrypt.compare(password, user.password);

  if (isMatched) return user;

  return null;
};