"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FaCamera, FaEdit, FaGoogle, FaMapMarkerAlt, FaTerminal, FaClock } from "react-icons/fa";
import { MdVerified, MdHistory } from "react-icons/md";
import Swal from "sweetalert2";
import { updateAdminImage } from "@/action/server/admin";

const AdminProfileClient = ({ initialSession, dbData }) => {
  const { data: session, update } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  
  // Use session image if updated, otherwise fallback to initial
  const displayImage = session?.user?.image || initialSession?.user?.image;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    Swal.fire({ 
        title: "Uploading Profile...", 
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false 
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const imgData = await response.json();

      if (imgData.success) {
        const newUrl = imgData.data.url;
        const res = await updateAdminImage(initialSession.user.email, newUrl);

        if (res.success) {
          // Sync NextAuth Client state
          await update({
            ...session,
            user: { ...session?.user, image: newUrl },
          });
          
          Swal.fire({ icon: "success", title: "Profile Updated", timer: 1500, showConfirmButton: false });
        }
      }
    } catch (error) {
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="relative h-64 w-full bg-neutral">
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1605379399642-870262d3d051" 
          alt="Cover" fill className="object-cover opacity-30" priority
        />
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="lg:col-span-2 bg-base-100 rounded-3xl shadow-xl p-8 border border-base-300"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative shrink-0">
                <div className="p-1 rounded-3xl bg-gradient-to-tr from-primary to-secondary">
                  <Image 
                    src={displayImage || "https://github.com/shadcn.png"} 
                    alt="Admin" width={160} height={160} 
                    className="rounded-[1.4rem] object-cover border-4 border-base-100 w-40 h-40" 
                  />
                </div>
                <label className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <FaEdit size={14} className={isUploading ? "animate-spin" : ""} />
                  <input type="file" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                </label>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-primary font-bold text-[10px] py-3 px-4 gap-2 uppercase">
                    <MdVerified /> {initialSession.user.role}
                  </span>
                  <span className="badge badge-outline font-bold text-[10px] py-3 px-4 gap-2 border-base-300 uppercase">
                    <FaMapMarkerAlt className="text-primary" /> {dbData?.location || "Savar, Dhaka"}
                  </span>
                </div>

                <div>
                  <h2 className="text-4xl font-black tracking-tight">{initialSession.user.name}</h2>
                  <p className="text-primary font-bold text-sm flex items-center gap-2 mt-1 italic">
                    <FaTerminal /> System Administrator
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-base-200 mt-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-base-200 rounded-xl text-primary"><FaClock /></div>
                      <div>
                        <p className="text-[9px] uppercase font-black opacity-40 mb-1">Last Login</p>
                        <p className="font-bold text-xs">
                          {dbData?.lastLoginAt ? new Date(dbData.lastLoginAt).toLocaleString() : "Just Now"}
                        </p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-base-200 rounded-xl text-primary"><FaGoogle className="text-red-500" /></div>
                      <div>
                        <p className="text-[9px] uppercase font-black opacity-40 mb-1">Auth Provider</p>
                        <p className="font-bold text-xs uppercase">{dbData?.provider || "Google"}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Section */}
          <div className="space-y-6">
            <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
              <div className="flex justify-between items-center text-xs border-b border-base-200 pb-3 mb-3">
                <span className="opacity-50 font-bold uppercase">Status</span>
                <span className="badge badge-success badge-sm font-bold uppercase text-[9px]">
                  {dbData?.status || "Active"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-50 font-bold uppercase">Admin ID</span>
                <span className="font-mono font-bold">#{dbData?._id?.slice(-6).toUpperCase() || "ADMIN"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminProfileClient;