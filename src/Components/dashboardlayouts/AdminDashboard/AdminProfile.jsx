"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaEdit,
  FaGoogle,
  FaMapMarkerAlt,
  FaTerminal,
  FaClock,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdVerified, MdHistory, MdUpdate } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "@/Components/Loading";
import {
  getSingleUser,
  updateUserProfileImage,
  updateUserCover,
  getAdminData,
} from "@/action/server/users";

const AdminProfile = () => {
  const { data: session, update } = useSession();
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user?.email) {
      const fetchFullProfile = async () => {
        try {
          const res = await getAdminData(user.email);

          if (res.success && res.user) {
            setDbData(res.user);
          } else {
            console.error("User fetch failed:", res.message);
          }
        } catch (err) {
          console.error("Network or Server Error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchFullProfile();
    } else if (session === null) {
      setLoading(false);
    }
  }, [user?.email, session]);

  console.log("Current Admin Data:", dbData);

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    Swal.fire({
      title: `Updating ${type}...`,
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body: formData },
      );
      const data = await response.json();

      if (data.success) {
        const newUrl = data.data.url;
        const res =
          type === "profile"
            ? await updateUserProfileImage(user?.email, newUrl)
            : await updateUserCover(user?.email, newUrl);

        if (res.success) {
          if (type === "profile")
            await update({
              ...session,
              user: { ...session?.user, image: newUrl },
            });
          setDbData((prev) => ({
            ...prev,
            [type === "profile" ? "image" : "coverImage"]: newUrl,
          }));
          Swal.fire({
            icon: "success",
            title: "Updated!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      Swal.fire("Error", "Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200 pb-12 font-sans">
      {/* 1. Cover Photo Section (using updatedAt as dynamic key) */}
      <div className="relative h-72 w-full bg-neutral group overflow-hidden">
        <Image
          src={
            dbData?.coverImage ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
          }
          alt="Cover"
          fill
          className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent" />

        <label className="absolute top-6 right-8 z-30 btn btn-sm btn-glass gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <FaCamera /> Change Cover
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e, "cover")}
          />
        </label>
      </div>

      <div className="container mx-auto px-4 lg:px-12 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Main Identity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-base-100 rounded-[2.5rem] shadow-2xl p-6 lg:p-10 border border-base-300"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              {/* Profile Image with Dynamic Status Color */}
              <div className="relative">
                <div
                  className={`p-1.5 rounded-[2.5rem] bg-gradient-to-tr ${dbData?.status === "active" ? "from-green-400 to-emerald-600" : "from-gray-400 to-gray-600"}`}
                >
                  <Image
                    src={dbData?.image || user?.image}
                    alt="Profile"
                    width={180}
                    height={180}
                    className="rounded-[2.3rem] object-cover border-8 border-base-100 w-44 h-44 shadow-inner"
                  />
                </div>
                <label className="absolute -bottom-2 -right-2 p-3.5 bg-primary text-white rounded-2xl shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all">
                  <FaEdit size={18} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleUpload(e, "profile")}
                  />
                </label>
              </div>

              {/* Data Mapping: Name, Role, Location */}
              <div className="flex-1 text-center md:text-left space-y-5">
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="badge badge-primary py-4 px-5 font-black text-[11px] tracking-widest uppercase shadow-lg shadow-primary/20">
                    <MdVerified className="mr-2 text-lg" />{" "}
                    {dbData?.role || "ADMIN"}
                  </span>
                  <span className="badge badge-ghost border-base-300 py-4 px-5 font-bold text-[11px] tracking-widest uppercase">
                    <FaMapMarkerAlt className="mr-2 text-primary" />{" "}
                    {dbData?.location || "Not Set"}
                  </span>
                  <span className="badge badge-outline py-4 px-5 font-bold text-[11px] tracking-widest uppercase">
                    <FaGoogle className="mr-2 text-red-500" />{" "}
                    {dbData?.provider}
                  </span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-5xl font-black text-base-content tracking-tighter">
                    {dbData?.name}
                  </h1>

                </div>

                {/* Database Meta Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-base-200 mt-6">
                  <InfoBlock
                    icon={<FaClock />}
                    label="Last Login Attempt"
                    value={new Date(dbData?.lastLoginAt).toLocaleString()}
                  />
                  <InfoBlock
                    icon={<MdHistory />}
                    label="Last Auth Action"
                    value={dbData?.lastAuthAction}
                    highlight
                  />
                  <InfoBlock
                    icon={<FaCalendarAlt />}
                    label="Account Created"
                    value={new Date(dbData?.createdAt).toLocaleDateString()}
                  />
                  <InfoBlock
                    icon={<MdUpdate />}
                    label="System Last Sync"
                    value={new Date(dbData?.updatedAt).toLocaleTimeString()}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: System Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral text-neutral-content p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <FaShieldAlt className="absolute -right-6 -bottom-6 text-[12rem] opacity-5 group-hover:rotate-12 transition-transform duration-700" />
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                  Security Clearance
                </p>
                <h3 className="text-5xl font-black mt-3 italic tracking-tighter">
                  LEVEL_01
                </h3>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-success">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  SYSTEM_STATUS: {dbData?.status?.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest opacity-40 mb-6">
                Database Identifiers
              </h4>
              <div className="flex justify-between items-center bg-base-200 p-4 rounded-2xl">
                <span className="text-[10px] font-black opacity-60">
                  ADMIN_ID
                </span>
                <span className="font-mono text-xs font-bold">
                  #{dbData?._id?.slice(-8).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center bg-base-200 p-4 rounded-2xl">
                <span className="text-[10px] font-black opacity-60">
                  EMAIL_HASH
                </span>
                <span className="font-mono text-[10px] truncate ml-4 w-32">
                  {dbData?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Block
const InfoBlock = ({ icon, label, value, highlight }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-3 bg-base-200 rounded-2xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className="text-[9px] uppercase font-black opacity-40 leading-none mb-1.5 tracking-wider">
        {label}
      </p>
      <p
        className={`font-bold text-sm truncate ${highlight ? "text-primary uppercase" : "text-base-content"}`}
      >
        {value || "---"}
      </p>
    </div>
  </div>
);

export default AdminProfile;
