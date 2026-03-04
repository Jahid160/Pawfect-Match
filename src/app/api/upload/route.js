import { NextResponse } from "next/server";

export async function POST(req) {
     try {
          const formData = await req.formData();
          const file = formData.get("image");

          const buffer = await file.arrayBuffer();
          const base64Image = Buffer.from(buffer).toString("base64");

          const imgbbRes = await fetch(
               `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
               {
                    method: "POST",
                    body: new URLSearchParams({
                         image: base64Image,
                    }),
               }
          );

          const data = await imgbbRes.json();
          // console.log("ImgBB response:", data);

          if (!data.success) {
               return NextResponse.json(
                    { success: false, error: data.error?.message },
                    { status: 400 }
               );
          }

          return NextResponse.json({
               success: true,
               url: data.data.url,
          });
     } catch (error) {
          console.error("ImgBB upload error:", error);
          return NextResponse.json(
               { success: false, error: "Upload failed" },
               { status: 500 }
          );
     }
}