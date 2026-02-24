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

     const newUser = {
          provider: "credentials",
          name,
          email,
          password: await bcrypt.hash(password, 14),
          role: "user",
          createdAt: new Date(),
     };

     const result = await usersCollection.insertOne(newUser);

     return {
          acknowledged: result.acknowledged,
          insertedId: result.insertedId?.toString(),
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

     return user;
};

