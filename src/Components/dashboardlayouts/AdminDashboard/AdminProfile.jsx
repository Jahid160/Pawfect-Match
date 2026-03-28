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
  BadgeCheck,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { updateUserProfileImage,updateUserCover } from "@/action/server/users";
// import {
//   updateUserCover,
//   updateUserProfileImage,
// } from "@/action/server/users";

const AdminProfile = ({ adminData }) => {
  const admin = adminData?.user;
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(admin?.image || "");
  const [coverImage, setCoverImage] = useState(admin?.coverImage || "");

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !admin?.email) return;

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
        const res = await updateUserProfileImage(admin.email, newImageUrl);

        if (res.success) {
          setProfileImage(newImageUrl);

          Swal.fire({
            icon: "success",
            title: "Profile picture updated!",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire("Error", res.message || "Update failed", "error");
        }
      } else {
        Swal.fire("Error", "Image upload failed", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not update profile picture", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !admin?.email) return;

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
        const res = await updateUserCover(admin.email, newCoverUrl);

        if (res.success) {
          setCoverImage(newCoverUrl);

          Swal.fire({
            icon: "success",
            title: "Cover updated!",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire("Error", res.message || "Update failed", "error");
        }
      } else {
        Swal.fire("Error", "Image upload failed", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not update cover photo", "error");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative bg-base-100 rounded-[3rem] shadow-xl shadow-neutral/5 overflow-hidden border border-base-300">
          <div
            className="relative h-48 bg-cover bg-center border-b border-primary/10 group"
            style={{
              backgroundImage: coverImage
                ? `url(${coverImage})`
                : "linear-gradient(to right, rgba(var(--p), 0.25), rgba(var(--s), 0.15))",
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
            <div className="flex flex-col lg:flex-row items-end gap-6 -mt-16">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-36 h-36 rounded-[2.5rem] bg-white ring-8 ring-white overflow-hidden shadow-2xl relative">
                  <Image
                    src={
                      profileImage ||
                      "https://i.ibb.co/L6S9Dkz/user-placeholder.png"
                    }
                    alt="Admin Profile"
                    fill
                    className="object-cover"
                  />
                </div>

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

              {/* Basic Info */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl lg:text-4xl font-black text-neutral tracking-tight">
                    {admin?.name || "Admin Name"}
                  </h1>
                  <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-black uppercase rounded-full border border-success/20">
                    Super Admin
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm font-medium text-neutral/50">
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-primary" />
                    {admin?.email || "No Email"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-primary" />
                    Role: {admin?.role || "Admin"}
                  </div>
                </div>
              </div>

              {/* Buttons */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm">
              <h3 className="text-xs font-black text-neutral/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <User size={14} /> Admin Details
              </h3>

              <div className="space-y-6">
                <DetailItem label="Full Name" value={admin?.name} icon={User} />
                <DetailItem
                  label="Admin Role"
                  value={admin?.role || "Admin"}
                  icon={Award}
                />
                <DetailItem
                  label="Email Address"
                  value={admin?.email}
                  icon={Mail}
                />
                <DetailItem
                  label="Location"
                  value={admin?.location || "Dhaka, Bangladesh"}
                  icon={MapPin}
                />
                <DetailItem
                  label="Department"
                  value={admin?.department || "Management"}
                  icon={Briefcase}
                />
                <DetailItem
                  label="Joined"
                  value={admin?.joinedAt || "March 2026"}
                  icon={Calendar}
                />
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-primary/10">
              <button className="w-full flex items-center justify-between text-primary font-black text-sm uppercase tracking-widest px-4 py-2 hover:bg-white rounded-2xl transition-all">
                Logout Account <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard label="Total Users" value="250+" color="bg-primary" />
              <StatCard label="Blocked Users" value="08" color="bg-error" />
              <StatCard label="Total Orders" value="154" color="bg-success" />
              <StatCard label="System Status" value="Good" color="bg-info" />
            </div>

            <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm min-h-[320px]">
              <h3 className="text-xs font-black text-neutral/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <BadgeCheck size={14} /> Admin Activities
              </h3>

              <div className="space-y-4">
                <ActivityItem
                  title="Updated platform settings"
                  time="Today"
                />
                <ActivityItem
                  title="Reviewed user reports"
                  time="Yesterday"
                />
                <ActivityItem
                  title="Managed blocked accounts"
                  time="2 days ago"
                />
                <ActivityItem
                  title="Checked dashboard analytics"
                  time="3 days ago"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const ActivityItem = ({ title, time }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl border border-base-300 bg-base-50">
    <div>
      <p className="font-bold text-neutral text-sm">{title}</p>
      <p className="text-xs text-neutral/40 mt-1">{time}</p>
    </div>
    <div className="w-3 h-3 rounded-full bg-primary"></div>
  </div>
);

export default AdminProfile;
