"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaCalendarAlt,
  FaPaw,
  FaEdit,
  FaCheckCircle,
  FaCamera,
} from "react-icons/fa";
import {
  getSingleShelter,
  updateShelterCover,
} from "@/action/server/Shelteruser";
import { useRouter } from "next/navigation";

import { Poppins } from "next/font/google";
import { myEntryPets } from "@/action/server/pets";
import Swal from "sweetalert2";
import { getSingleUser, updateUserProfileImage } from "@/action/server/users";
import { MdBlock } from "react-icons/md";
import { useSession } from "next-auth/react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const ShelterProfile = ({ email }) => {
  const { data: session, update } = useSession();
  const [shelterData, setShelterData] = useState(null);
  const [userImg, setUserImg] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!email) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [shelterRes, petsRes, userRes] = await Promise.all([
          getSingleShelter(email),
          myEntryPets(email),
          getSingleUser(email),
        ]);
        if (shelterRes.success) setShelterData(shelterRes.data);

        if (petsRes.success) setPets(petsRes.pets);

        if (userRes.success) setUserImg(userRes.user);
      } catch (error) {
        console.error("Data fetching failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [email]);

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
        },
      );

      const data = await response.json();

      if (data.success) {
        const newImageUrl = data.data.url;
        const res = await updateUserProfileImage(email, newImageUrl);
        if (res.success) {
          await update({
            user: {
              ...session?.user,
              image: newImageUrl,
            },
          });

          setUserImg({ image: newImageUrl });

          Swal.fire({
            icon: "success",
            title: "Profile picture updated!",
            timer: 1500,
            showConfirmButton: false,
          });
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Profile upload error:", error);
      Swal.fire("Error", "Could not update profile picture", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    Swal.fire({
      title: "Uploading Image...",
      text: "Please wait while we update your cover photo.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
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
        },
      );

      const data = await response.json();

      if (data.success) {
        const newImageUrl = data.data.url;
        const res = await updateShelterCover(shelterData.email, newImageUrl);

        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Cover photo updated successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
          setShelterData((prev) => ({ ...prev, shelterPhoto: newImageUrl }));

          router.refresh();
        }
      } else {
        throw new Error(data.error?.message || "ImgBB upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsUploading(false); // আপলোড শেষ
    }
  };

  const displayedPets = showAll ? pets : pets.slice(0, 8);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  if (loading) return <Loading />;

  return (
    <div className={`${poppins.className} min-h-screen bg-base-200 pb-12`}>
      {/* 1. Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-80 w-full bg-base-300 overflow-hidden group"
      >
        {/* Background Image */}
        {shelterData.shelterPhoto ? (
          <Image
            src={shelterData.shelterPhoto}
            alt="Shelter Cover"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary" />
        )}

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

        {/* Edit Cover Photo Button  */}
        <div className="absolute top-4 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <label
            className={`flex items-center gap-2 bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm font-bold transition-all active:scale-95 cursor-pointer ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaCamera
              className={`${isUploading ? "animate-bounce" : "text-lg"}`}
            />
            <span>{isUploading ? "Uploading..." : "Upload Cover Photo"}</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleCoverUpload}
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Shelter Name on Cover */}
        <div className="container mx-auto h-full flex items-end pb-24 px-8 relative z-10">
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent -z-10" />

          <motion.h1
            {...fadeIn}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tight 
                   drop-shadow-[0_4px_12px_rgba(0,0,0,1)] selection:bg-primary"
          >
            {shelterData.shelterName}
          </motion.h1>
        </div>
      </motion.div>
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 2. Profile Card Section (Left/Main) */}
          <motion.div
            {...fadeIn}
            className="lg:col-span-2 bg-base-100 rounded-3xl shadow-xl p-8 border border-base-300 relative overflow-hidden"
          >
            {/* Background subtle pattern or accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full z-0" />

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              {/* Profile Image Section */}
              <div className="relative group shrink-0">
                {/* কন্ডিশনাল রেন্ডারিং: ইমেজ থাকলে ইমেজ দেখাবে, না থাকলে আইকন দেখাবে */}
                {userImg?.image ? (
                  <Image
                    src={userImg.image}
                    alt="Shelter Profile Picture"
                    width={192}
                    height={192}
                    className="rounded-2xl object-cover ring-4 ring-base-100 shadow-xl w-48 h-48"
                    priority
                  />
                ) : (
                  <div className="w-48 h-48 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 ring-4 ring-base-100 shadow-xl overflow-hidden text-slate-400 group-hover:bg-slate-200 transition-colors">
                    <div className="bg-slate-200 p-4 rounded-full">
                      <FaCamera size={30} className="text-slate-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter italic">
                      No Image Profile
                    </span>
                  </div>
                )}

                <label className="absolute -bottom-2 -right-2 p-2.5 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-base-100 cursor-pointer">
                  <FaEdit size={14} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                  />
                </label>
              </div>

              <div className="flex-1 space-y-5">
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`badge gap-2 py-3.5 px-4 text-white font-bold uppercase tracking-wider text-[10px] 
    ${shelterData.status === "Suspended" ? "bg-red-600 border-red-700 shadow-[0_0_10px_rgba(220,38,38,0.5)]" : "bg-green-600 border-green-700"} 
    transition-all duration-300`}
                  >
                    {shelterData.status === "Suspended" ? (
                      <>
                        <MdBlock size={14} className="animate-pulse" />{" "}
                        {shelterData.status}
                      </>
                    ) : (
                      <>
                        <FaCheckCircle /> {shelterData.status}
                      </>
                    )}
                  </span>
                  <span className="badge badge-outline py-3.5 px-4 border-base-300 font-bold uppercase text-[10px] text-base-content/70">
                    {shelterData.shelterType}
                  </span>
                  {/* Location Badge added from JSON */}
                  <span className="badge badge-ghost gap-1.5 py-3.5 px-4 border-base-200 font-bold uppercase text-[10px]">
                    <FaMapMarkerAlt className="text-primary" />{" "}
                    {shelterData.city}
                  </span>
                </div>

                {/* Name and Basic Title */}
                <div>
                  <h2 className="text-3xl font-black text-base-content tracking-tight">
                    {shelterData.fullName}
                  </h2>
                  <p className="text-primary font-bold text-sm flex items-center gap-2 mt-1">
                    <FaPaw /> Lead Administrator at {shelterData.shelterName}
                  </p>
                </div>

                {/* Motivation Quote */}
                <p className="text-base-content/70 leading-relaxed font-medium bg-base-200/50 p-4 rounded-xl border-l-4 border-primary">
                  " {shelterData.motivation}"
                </p>

                {/* Comprehensive Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-4 border-t border-base-200">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Operating Since
                      </p>
                      <p className="font-bold">{shelterData.operatingSince}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FaBuilding />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Shelter Capacity
                      </p>
                      <p className="font-bold">
                        {shelterData.capacity} Animals
                      </p>
                    </div>
                  </div>
                  {/* Rescue Experience Highlight */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                      <FaCheckCircle />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Rescue Experience
                      </p>
                      <p className="font-bold">
                        {shelterData.hasRescueExp === "Yes"
                          ? "Expert Rescuer"
                          : "New Member"}
                      </p>
                    </div>
                  </div>
                  {/* Vet Contact Info */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-success/10 rounded-lg text-success">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Vet Support
                      </p>
                      <p className="font-bold">
                        {shelterData.hasVetContact === "Yes"
                          ? "Verified Contact"
                          : "Not Linked"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience Summary - Extra Info */}
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase opacity-40 mb-2">
                    Background & Skills
                  </p>
                  <p className="text-xs text-base-content/60 leading-tight ">
                    {shelterData.petExperience.substring(0, 120)}...
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Stats & Contact Section (Right Side) */}
          <div className="space-y-6">
            {/* Stats Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-primary text-white p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center"
            >
              <FaPaw className="text-5xl mb-4 opacity-40" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl font-extrabold"
              >
                {shelterData.petCount}
              </motion.span>
              <p className="text-lg font-semibold mt-2 uppercase tracking-wide">
                Animals in Care
              </p>
              <progress
                className="progress progress-secondary w-full mt-4"
                value={shelterData.petCount}
                max={parseInt(shelterData.capacity) || 100}
              ></progress>
              <p className="text-xs mt-3 font-medium opacity-90">
                Space Utilization:{" "}
                {(
                  (shelterData.petCount /
                    (parseInt(shelterData.capacity) || 1)) *
                  100
                ).toFixed(1)}
                %
              </p>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              {...fadeIn}
              className="bg-base-100 p-6 rounded-3xl shadow-md border border-base-300"
            >
              <h3 className="text-lg font-bold mb-4 border-b pb-2 border-base-200 uppercase tracking-tight">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-primary shrink-0" />
                  <span className="text-sm font-medium">
                    {shelterData.shelterAddress}, {shelterData.shelterCity}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-primary shrink-0" />
                  <span className="text-sm font-medium">
                    {shelterData.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary shrink-0" />
                  <span className="text-sm font-medium">
                    {shelterData.email}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4. Pet Listing Grid */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8 border-b border-base-300 pb-4">
            <h3 className="text-2xl font-extrabold tracking-tight">
              Animals Currently in Care
            </h3>
            {displayedPets.length > 0 && (
              <button
                onClick={() => setShowAll(true)}
                className="btn btn-primary btn-sm rounded-full px-6 font-bold uppercase text-xs"
              >
                View All
              </button>
            )}
          </div>

          {displayedPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedPets.map((pet, index) => (
                <Link
                  href={`/all-pets/${pet._id}`}
                  key={pet._id}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-300 overflow-hidden group"
                  >
                    <figure className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={
                          Array.isArray(pet.images) && pet.images.length > 0
                            ? pet.images[0]
                            : "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={pet.petName}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </figure>
                    <div className="card-body p-5 text-center">
                      <h4 className="card-title justify-center text-primary font-bold tracking-tight">
                        {pet.petName}
                      </h4>
                      <p className="text-xs font-semibold text-base-content/60 uppercase tracking-widest">
                        age: {pet.ageYears}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-base-300 rounded-3xl bg-base-200/50"
            >
              <div className="bg-base-100 p-6 rounded-full shadow-inner mb-4">
                <span className="text-5xl text-base-content/20">🐾</span>
              </div>
              <h4 className="text-xl font-bold text-base-content/70">
                No Pets Available Right Now
              </h4>
              <p className="text-base-content/50 text-sm mt-2 max-w-xs text-center">
                Currently, there are no animals in care for this shelter. Please
                check back later or explore other shelters.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterProfile;
