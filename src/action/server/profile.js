"use server";

import { collections, dbConnect } from "@/lib/db"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function updateProfile(formData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { success: false, error: "Unauthorized" };

  try {
    const name = formData.get("name");
    const location = formData.get("location");
    const imageFile = formData.get("image");
    let imageUrl = formData.get("currentImage");

    
    if (imageFile && imageFile.size > 0) {
      const buffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: new URLSearchParams({ image: base64Image }),
        }
      );

      const imgData = await imgbbRes.json();
      if (imgData.success) {
        imageUrl = imgData.data.url;
      }
    }


    const usersCollection = await dbConnect(collections.USERS);
    await usersCollection.updateOne(
      { email: session.user.email },
      {
        $set: {
          name: name,
          location: location,
          image: imageUrl,
          updatedAt: new Date(),
        },
      }
    );

    return { success: true, url: imageUrl };
  } catch (error) {
    console.error("Profile Update Error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}