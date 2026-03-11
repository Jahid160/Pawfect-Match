"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  MapPin,
  Mail,
  ShieldCheck,
  Camera,
  Loader2,
  FileText,
  ExternalLink,
  PlusCircle,
  History,
  Save,
} from "lucide-react";
import { FaPaw } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "@/action/server/profile"; // আপনার পাথ অনুযায়ী ইমপোর্ট করুন

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      setProfileData({
        name: session?.user?.name || "User Name",
        email: session?.user?.email,
        image: session?.user?.image || "https://i.ibb.co/placeholder.png",
        location: session?.user?.location || "Savar, Dhaka",
        stats: { adopted: 2, pending: 1, favorites: 14 },
        adoptedPets: [
          {
            id: 1,
            name: "Buddy",
            breed: "Golden Retriever",
            date: "Jan 2025",
            img: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=200",
          },
          {
            id: 2,
            name: "Misty",
            breed: "Persian Cat",
            date: "June 2024",
            img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200",
          },
        ],
        documents: [
          { name: "Buddy_Vaccination.pdf", size: "1.2 MB" },
          { name: "Adoption_Contract_Final.pdf", size: "0.8 MB" },
        ],
      });
    }
  }, [session, status]);

  // --- ইমেজ এবং প্রোফাইল আপডেট হ্যান্ডলার ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", profileData.name);
    formData.append("location", profileData.location);

    setIsUploading(true);
    const loadingToast = toast.loading("Uploading image to ImgBB...");

    try {
      const result = await updateProfile(formData);

      if (result.success) {
        // Next-Auth সেশন আপডেট করা (Client-side sync)
        await update({
          ...session,
          user: { ...session?.user, image: result.url },
        });

        setProfileData((prev) => ({ ...prev, image: result.url }));
        toast.success("Profile picture updated!", { id: loadingToast });
      } else {
        toast.error(result.error || "Upload failed", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
  };

  if (status === "loading")
    return (
      <div className="h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 pb-20 font-sans">
      <Toaster position="top-center" />
      
      {/* Ambient Header */}
      <div className="h-64 w-full bg-base-100 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[100%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: USER CARD --- */}
          <aside className="lg:col-span-4">
            <div className="bg-base-100 rounded-[3rem] p-8 shadow-xl border border-base-300">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className={`w-40 h-40 rounded-[2.5rem] overflow-hidden ring-8 ring-base-100 shadow-2xl transition-all ${isUploading ? "opacity-50" : ""}`}>
                    <img
                      src={profileData?.image}
                      className="w-full h-full object-cover"
                      alt="User"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <Loader2 className="animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  
                  <label className="absolute bottom-1 right-1 bg-neutral text-neutral-content p-3 rounded-2xl border-4 border-base-100 shadow-lg hover:bg-primary transition-all cursor-pointer">
                    <Camera size={18} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      disabled={isUploading}
                    />
                  </label>
                </div>

                <h2 className="mt-6 text-2xl font-black text-neutral">
                  {profileData?.name}
                </h2>
                <div className="badge badge-secondary gap-2 mt-2 font-bold py-3">
                  <ShieldCheck size={14} className="text-white" /> Verified Member
                </div>

                <div className="grid grid-cols-3 gap-2 w-full mt-8">
                  <div className="bg-base-200 p-3 rounded-2xl text-center">
                    <p className="text-lg font-black text-neutral">{profileData?.stats.adopted}</p>
                    <p className="text-[9px] font-bold text-neutral/40 uppercase">Adopted</p>
                  </div>
                  <div className="bg-base-200 p-3 rounded-2xl text-center">
                    <p className="text-lg font-black text-neutral">{profileData?.stats.pending}</p>
                    <p className="text-[9px] font-bold text-neutral/40 uppercase">Pending</p>
                  </div>
                  <div className="bg-base-200 p-3 rounded-2xl text-center">
                    <p className="text-lg font-black text-neutral">{profileData?.stats.favorites}</p>
                    <p className="text-[9px] font-bold text-neutral/40 uppercase">Saved</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-3">
                <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-default">
                  <Mail className="text-primary" size={18} />
                  <span className="text-xs font-bold text-neutral/60 truncate">{profileData?.email}</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-default">
                  <MapPin className="text-primary" size={18} />
                  <span className="text-xs font-bold text-neutral/60">{profileData?.location}</span>
                </div>
              </div>

              <button className="btn btn-primary w-full mt-8 rounded-2xl h-14 font-black">
                Edit Profile Info
              </button>
            </div>
          </aside>

          {/* --- RIGHT: ADOPTION CONTENT --- */}
          <main className="lg:col-span-8 space-y-6">
            <section className="bg-base-100 rounded-[3rem] p-8 border border-base-300 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-neutral flex items-center gap-2">
                  <FaPaw className="text-primary" /> My Adopted Family
                </h3>
                <button className="btn btn-sm btn-ghost text-primary gap-1 font-bold italic underline">
                  View Gallery
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData?.adoptedPets.map((pet) => (
                  <motion.div
                    key={pet.id}
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-4 p-4 bg-base-200 rounded-3xl border border-base-300"
                  >
                    <img src={pet.img} className="w-20 h-20 rounded-2xl object-cover shadow-md" alt={pet.name} />
                    <div>
                      <h4 className="font-black text-neutral">{pet.name}</h4>
                      <p className="text-xs font-bold text-neutral/40">{pet.breed}</p>
                      <p className="text-[10px] mt-1 bg-white inline-block px-2 py-0.5 rounded-lg text-primary font-black">
                        Since {pet.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                <div className="border-2 border-dashed border-base-300 rounded-3xl flex items-center justify-center p-4 hover:border-primary group cursor-pointer transition-all">
                  <div className="flex items-center gap-3 text-neutral/30 group-hover:text-primary transition-colors">
                    <PlusCircle size={24} />
                    <span className="font-bold text-sm">Find New Friend</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Vault */}
              <div className="bg-base-100 rounded-[3rem] p-8 border border-base-300 shadow-sm">
                <h3 className="text-lg font-black text-neutral mb-5 flex items-center gap-2">
                  <FileText size={20} className="text-primary" /> Document Vault
                </h3>
                <div className="space-y-3">
                  {profileData?.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-base-200 rounded-2xl group hover:bg-neutral hover:text-white transition-all cursor-pointer">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText size={16} className="text-primary shrink-0" />
                        <span className="text-[11px] font-bold truncate">{doc.name}</span>
                      </div>
                      <ExternalLink size={14} className="opacity-40" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-base-100 rounded-[3rem] p-8 border border-base-300 shadow-sm">
                <h3 className="text-lg font-black text-neutral mb-5 flex items-center gap-2">
                  <History size={20} className="text-primary" /> Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { text: "Application for Luna Approved", date: "2 days ago", type: "success" },
                    { text: "Shelter Visit scheduled", date: "Tomorrow", type: "info" },
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.type === "success" ? "bg-success" : "bg-primary"}`} />
                      <div>
                        <p className="text-xs font-bold text-neutral leading-tight">{act.text}</p>
                        <p className="text-[10px] text-neutral/40 font-bold">{act.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
