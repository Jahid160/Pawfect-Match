"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Smile,
  Syringe,
  Home,
  Scissors,
  Venus,
  Rabbit,
  Clock,
  Palette,
  Scale,
  Ruler,
  Share2,
  ShieldCheck,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Dog,
  Info,
  Stethoscope,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useSavedPets } from "@/hook/useSavedPets";
import { useSyncSavedPets } from "@/hook/useSyncSavedPets";
import { useSession } from "next-auth/react"; // সেশন চেক করার জন্য
import { useRouter } from "next/navigation"; // রিডাইরেক্ট করার জন্য

const PetProfile = ({ pet }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const gallery = useMemo(() => {
    if (!pet?.images || !Array.isArray(pet.images) || pet.images.length === 0) {
      return ["/placeholder-pet.jpg"];
    }
    return pet.images;
  }, [pet]);

  const [activeImage, setActiveImage] = useState(gallery[0]);
  const { savedPets, toggleSave } = useSavedPets();
  const isSaved = pet?._id && savedPets.includes(pet._id);
  useSyncSavedPets(savedPets);

  // নতুন ফাংশন: লগইন না থাকলে লগইন পেজে পাঠাবে
  const handleToggleSave = () => {
    if (!session) {
      // আপনি চাইলে এখানে callbackUrl দিতে পারেন যাতে লগইনের পর এখানে ফিরে আসে
      router.push(`/login?callbackUrl=/pet-profile/${pet._id}`);
      return;
    }
    toggleSave(pet._id);
  };

  if (!pet || Object.keys(pet).length === 0) {
    return <div className="p-10 text-center">Loading pet details...</div>;
  }

  const getStatIcon = (type) => {
    switch (type) {
      case "gender": return <Venus className="h-5 w-5" />;
      case "breed": return <Dog className="h-5 w-5" />;
      case "age": return <Clock className="h-5 w-5" />;
      case "color": return <Palette className="h-5 w-5" />;
      case "weight": return <Scale className="h-5 w-5" />;
      case "size": return <Ruler className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const getTraitIcon = (type) => {
    switch (type) {
      case "smile": return <Smile className="h-5 w-5" />;
      case "syringe": return <Syringe className="h-5 w-5" />;
      case "home": return <Home className="h-5 w-5" />;
      case "scissors": return <Scissors className="h-5 w-5" />;
      default: return <Heart className="h-5 w-5" />;
    }
  };

  const handlePrev = () => {
    const currentIndex = gallery.indexOf(activeImage);
    const prevIndex = currentIndex === 0 ? gallery.length - 1 : currentIndex - 1;
    setActiveImage(gallery[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = gallery.indexOf(activeImage);
    const nextIndex = currentIndex === gallery.length - 1 ? 0 : currentIndex + 1;
    setActiveImage(gallery[nextIndex]);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pet.petName || "Check out this pet for adoption!"}`,
          text: "Check this out!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      alert("Share API not supported. Copying link to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatBoolean = (value) => {
    if (value === true || value === "true") return "Yes";
    if (value === false || value === "false") return "No";
    if (value === "") return "Not specified";
    return value || "Not specified";
  };

  const formatDate = (dateValue) => {
    try {
      const date = typeof dateValue === "object" && dateValue?.$date ? new Date(dateValue.$date) : new Date(dateValue);
      if (isNaN(date.getTime())) return "Not available";
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return "Not available";
    }
  };

  const displayCount = isSaved ? pet.saveCount + 1 : pet.saveCount;

  const ageText = `${pet.ageYears || 0} year${Number(pet.ageYears) === 1 ? "" : "s"}${
    pet.ageMonths ? ` ${pet.ageMonths} month${Number(pet.ageMonths) === 1 ? "" : "s"}` : ""
  }`;

  const quickStats = [
    { label: "Gender", value: pet.gender || "Not specified", type: "gender" },
    { label: "Breed", value: pet.breed || "Not specified", type: "breed" },
    { label: "Age", value: ageText || "Not specified", type: "age" },
    { label: "Color", value: pet.color || "Not specified", type: "color" },
    { label: "Weight", value: pet.weight ? `${pet.weight} kg` : "Not specified", type: "weight" },
    { label: "Size", value: pet.size || "Not specified", type: "size" },
  ];

  const traits = [
    { label: pet.goodWithKids ? `Good with kids: ${pet.goodWithKids}` : "Good with kids not specified", type: "smile" },
    { label: `Vaccinated: ${formatBoolean(pet.vaccinated)}`, type: "syringe" },
    { label: `Indoor/Outdoor: ${pet.indoorOutdoor || "Not specified"}`, type: "home" },
    { label: `Neutered: ${formatBoolean(pet.neutered)}`, type: "scissors" },
  ];

  const healthMilestones = [
    { label: "Vaccination", done: !!pet.vaccinated, values: [formatBoolean(pet.vaccinated)] },
    { label: "Neutered", done: !!pet.neutered, values: [formatBoolean(pet.neutered)] },
    { label: "Microchipped", done: !!pet.microchipped, values: [formatBoolean(pet.microchipped)] },
    { label: "Health Status", done: !!pet.healthCondition, values: [pet.healthCondition || "Not specified"] },
  ];

  const description = pet.reasonForAdoption || pet.specialNeeds || pet.medicalHistory || `${pet.petName || "This pet"} is looking for a caring new home.`;

  return (
    <div className="min-h-screen bg-base-100 text-neutral antialiased">
      <nav className="mx-auto max-w-6xl px-6 pt-8">
        <Link href="/all-pets" className="group flex items-center gap-2 font-bold text-neutral/60 transition-all duration-300 hover:text-primary">
          <div className="rounded-full bg-base-200 p-2 shadow-sm transition-all group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
            <ArrowLeft size={20} />
          </div>
          <span className="text-sm tracking-wide">Return to listings</span>
        </Link>
      </nav>

      <header className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 pb-6 pt-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
            <ShieldCheck size={18} /> Verified Adoption Listing
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral">{pet.petName || "Unnamed Pet"}</h1>
          <div className="mt-2 flex items-center gap-2 font-medium text-neutral/60">
            <MapPin size={18} className="text-primary" />
            <span>{pet.location || "Location not specified"}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleShare} className="btn btn-circle btn-outline border-neutral/10 text-neutral shadow-sm hover:border-neutral/20 hover:bg-base-200">
            <Share2 size={20} />
          </button>
          
          {/* ✅ হার্ট বাটনে handleToggleSave ব্যবহার করা হয়েছে */}
          <button
            onClick={handleToggleSave}
            className="btn btn-circle btn-outline border-neutral/10 text-neutral shadow-sm hover:border-neutral/20 hover:bg-base-200"
          >
            <Heart size={20} className={isSaved ? "fill-red-500 text-red-500" : ""} />
          </button>
          <span>❤️ {displayCount}</span>
        </div>
      </header>

      {/* ... বাকি কোড সব একই থাকবে ... */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            {/* Pet gallery */}
            <section className="space-y-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-white/20 bg-base-200 shadow-2xl">
                <Image fill src={activeImage} alt={pet.petName || "Pet image"} className="object-cover" priority unoptimized />
                {gallery.length > 1 && (
                  <>
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral shadow-md transition hover:bg-primary hover:text-white">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNext} className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral shadow-md transition hover:bg-primary hover:text-white">
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {gallery.map((thumb, idx) => (
                  <button key={idx} onClick={() => setActiveImage(thumb)} className={`relative aspect-square overflow-hidden rounded-2xl border-4 transition-all duration-300 ${activeImage === thumb ? "scale-95 border-primary shadow-lg" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <Image fill src={thumb} alt={`${pet.petName || "Pet"} image ${idx + 1}`} className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            </section>
            
            {/* Health Journey & Description sections - kept original */}
            {/* ... */}
          </div>
          {/* Right column with Owner Info & Link - kept original */}
          {/* ... */}
        </div>
      </main>
    </div>
  );
};

export default PetProfile;