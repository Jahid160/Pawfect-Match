"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  MapPin,
  Calendar,
  Camera,
  Edit3,
  Settings,
  LogOut,
  Award,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { updateUserCover, updateUserProfileImage } from "@/action/server/users";

const UserProfile = () => {
  const { data: session, update } = useSession();
  const user = session?.user;
  const [isUploading, setIsUploading] = useState(false);

  // Function to handle Profile Picture Upload
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    Swal.fire({
      title: "Updating Profile Picture...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        const newImageUrl = data.data.url;
        // Update database via server action
        const res = await updateUserProfileImage(user?.email, newImageUrl);

        if (res.success) {
          // Update NextAuth session to reflect changes immediately
          await update({
            ...session,
            user: { ...session?.user, image: newImageUrl },
          });

          Swal.fire({
            icon: "success",
            title: "Profile picture updated!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Error", "Could not update profile picture", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Function to handle Cover Photo Upload
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Swal.fire({
      title: "Updating Cover Photo...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        const newCoverUrl = data.data.url;
        // Update database via server action
        const res = await updateUserCover(user?.email, newCoverUrl);

        if (res.success) {
          // Update NextAuth session
          await update({
            ...session,
            user: { ...session?.user, coverImage: newCoverUrl },
          });

          Swal.fire({
            icon: "success",
            title: "Cover updated!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      console.error("Cover upload error:", error);
      Swal.fire("Error", "Could not update cover photo", "error");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <div className="relative bg-base-100 rounded-[3rem] shadow-xl shadow-neutral/5 overflow-hidden border border-base-300">
          
          {/* Dynamic Cover Background */}
          <div
            className="relative h-40 bg-cover bg-center border-b border-primary/10 group"
            style={{
              backgroundImage: user?.coverImage
                ? `url(${user.coverImage})`
                : "linear-gradient(to right, rgba(var(--p), 0.2), rgba(var(--p), 0.05))",
            }}
          >
            <label className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg text-neutral">
                <Camera size={14} /> UPDATE COVER
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverUpload}
              />
            </label>
          </div>

          <div className="px-10 pb-10">
            <div className="flex flex-col md:flex-row items-end gap-6 -mt-16">
              
              {/* Avatar Section */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white ring-8 ring-white overflow-hidden shadow-2xl relative">
                  <Image
                    src={user?.image || "https://i.ibb.co/L6S9Dkz/user-placeholder.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Profile Photo Upload Button */}
                <label className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform border-4 border-white cursor-pointer">
                  <Camera size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>

              {/* Name & Basic Info */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-neutral tracking-tight">
                    {user?.name || "User Name"}
                  </h1>
                  <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-black uppercase rounded-full border border-success/20">
                    Active
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-neutral/50">
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-primary" />
                    {user?.email}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-primary" />
                    Role: {user?.role || "Member"}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pb-2">
                <button className="flex items-center gap-2 px-6 py-3 bg-neutral text-white rounded-2xl font-bold text-sm hover:bg-primary transition-all">
                  <Edit3 size={16} /> Edit Profile
                </button>
                <button className="p-3 bg-base-200 text-neutral hover:text-error rounded-2xl transition-all border border-base-300">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm">
              <h3 className="text-xs font-black text-neutral/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <User size={14} /> Personal Details
              </h3>
              <div className="space-y-6">
                <DetailItem label="Full Name" value={user?.name} icon={User} />
                <DetailItem label="Account Role" value={user?.role} icon={Award} />
                <DetailItem label="Location" value="Dhaka, Bangladesh" icon={MapPin} />
                <DetailItem label="Joined" value="March 2026" icon={Calendar} />
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-primary/10">
              <button className="w-full flex items-center justify-between text-primary font-black text-sm uppercase tracking-widest px-4 py-2 hover:bg-white rounded-2xl transition-all">
                Logout Account <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Statistics and Activities */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <StatCard label="Total Requests" value="12" color="bg-primary" />
              <StatCard label="Adopted Pets" value="04" color="bg-success" />
            </div>
            
            <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm min-h-[300px]">
              <h3 className="text-xs font-black text-neutral/30 uppercase tracking-[0.2em] mb-6">
                Recent Activities
              </h3>
              <div className="flex flex-col items-center justify-center py-20 text-neutral/20 space-y-4">
                <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <p className="font-bold text-sm tracking-tight">
                  No recent activities found.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Info Rows
const DetailItem = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-4">
    <div className="p-2.5 bg-base-200 rounded-xl text-primary">
      <Icon size={16} />
    </div>
    <div>
      <p className="text-[10px] font-black text-neutral/30 uppercase tracking-tighter">
        {label}
      </p>
      <p className="font-bold text-neutral text-sm">{value || "Not Set"}</p>
    </div>
  </div>
);

// Helper Component for Stats
const StatCard = ({ label, value, color }) => (
  <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-[10px] font-black text-neutral/30 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-3xl font-black text-neutral mt-1">{value}</p>
    </div>
    <div className={`w-12 h-12 ${color} rounded-2xl opacity-10`}></div>
  </div>
);

export default UserProfile;