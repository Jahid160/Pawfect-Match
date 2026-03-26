"use client";

import React, { useMemo, useState } from "react";
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
import { toggleSaveAction } from "@/action/server/savePetsAction";
import { useSavedState } from "@/hook/useSavedPets";

const PetProfile = ({ pet }) => {
  const gallery = useMemo(() => {
    if (!pet?.images || !Array.isArray(pet.images) || pet.images.length === 0) {
      return ["/placeholder-pet.jpg"];
    }
    return pet.images;
  }, [pet]);

  const [activeImage, setActiveImage] = useState(gallery[0]);

  // নতুন রিয়েল-টাইম ডাটাবেস ভিত্তিক হুক
  const { isSaved, count, handleToggle } = useSavedState(pet, toggleSaveAction);

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
      const date =
        typeof dateValue === "object" && dateValue?.$date
          ? new Date(dateValue.$date)
          : new Date(dateValue);
      if (isNaN(date.getTime())) return "Not available";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Not available";
    }
  };

  const ageText = `${pet.ageYears || 0} year${Number(pet.ageYears) === 1 ? "" : "s"}${pet.ageMonths ? ` ${pet.ageMonths} month${Number(pet.ageMonths) === 1 ? "" : "s"}` : ""
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
    {
      label: pet.goodWithKids
        ? `Good with kids: ${pet.goodWithKids}`
        : "Good with kids not specified",
      type: "smile",
    },
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

  const description =
    pet.reasonForAdoption ||
    pet.specialNeeds ||
    pet.medicalHistory ||
    `${pet.petName || "This pet"} is looking for a caring new home.`;

  return (
    <div className="min-h-screen bg-base-100 text-neutral antialiased">
      <nav className="mx-auto max-w-6xl px-6 pt-8">
        <Link
          href="/all-pets"
          className="group flex items-center gap-2 font-bold text-neutral/60 transition-all duration-300 hover:text-primary"
        >
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
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral">
            {pet.petName || "Unnamed Pet"}
          </h1>
          <div className="mt-2 flex items-center gap-2 font-medium text-neutral/60">
            <MapPin size={18} className="text-primary" />
            <span>{pet.location || "Location not specified"}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="btn btn-circle btn-outline border-neutral/10 text-neutral shadow-sm hover:border-neutral/20 hover:bg-base-200"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={() => handleToggle(pet._id)}
              className="btn btn-circle btn-outline border-neutral/10 text-neutral shadow-sm hover:border-neutral/20 hover:bg-base-200"
            >
              <Heart
                size={20}
                className={isSaved ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-base-200 px-4 py-2 min-w-[60px]">
            <span className="text-xl">❤️</span>
            <span className="text-sm font-black">{count}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            {/* Pet gallery */}
            <section className="space-y-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-white/20 bg-base-200 shadow-2xl">
                <Image
                  fill
                  src={activeImage}
                  alt={pet.petName || "Pet image"}
                  className="object-cover"
                  priority
                  unoptimized
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral shadow-md transition hover:bg-primary hover:text-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral shadow-md transition hover:bg-primary hover:text-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(thumb)}
                    className={`relative aspect-square overflow-hidden rounded-2xl border-4 transition-all duration-300 ${activeImage === thumb ? "scale-95 border-primary shadow-lg" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <Image
                      fill
                      src={thumb}
                      alt={`${pet.petName || "Pet"} image ${idx + 1}`}
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Health Journey */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5 rounded-full bg-primary"></div>
                  <h3 className="text-2xl font-bold italic">Health Journey</h3>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral/40">
                  Last Updated: {formatDate(pet.createdAt)}
                </span>
              </div>

              <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-primary before:via-base-300 before:to-transparent md:before:mx-auto md:before:translate-x-0">
                {healthMilestones.map((item, idx) => (
                  <div
                    key={idx}
                    className={`group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse ${item.done ? "is-completed" : "opacity-70"}`}
                  >
                    <div
                      className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-base-100 shadow transition-colors duration-300 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${item.done ? "bg-primary text-white" : "bg-base-200 text-neutral/30"}`}
                    >
                      {item.done ? <ShieldCheck size={16} /> : <div className="h-2 w-2 rounded-full bg-current" />}
                    </div>
                    <div className="w-[calc(100%-3rem)] rounded-[2rem] border border-neutral/5 bg-white p-5 shadow-sm transition-all hover:shadow-md md:w-[calc(50%-2.5rem)]">
                      <div className="mb-2 flex items-center justify-between">
                        <time className="text-sm font-black uppercase tracking-tighter text-primary">
                          {item.label}
                        </time>
                        {item.done ? (
                          <span className="badge badge-success badge-sm gap-1 text-[9px] font-bold uppercase text-white">
                            Verified
                          </span>
                        ) : (
                          <span className="badge badge-ghost badge-sm text-[9px] font-bold uppercase">
                            Pending
                          </span>
                        )}
                      </div>
                      <div className="font-medium text-neutral/80">
                        <div className="flex flex-wrap gap-2">
                          {item.values.map((v, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-base-200 px-3 py-1 text-[11px] font-bold"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[2rem] border border-neutral/5 bg-white p-6 shadow-sm">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
                  <Stethoscope className="text-primary" size={20} /> Medical History
                </h3>
                <p className="leading-relaxed text-neutral/70">
                  {pet.medicalHistory || "No medical history provided."}
                </p>

                <h3 className="mb-3 mt-6 text-lg font-bold">Special Needs</h3>
                <p className="leading-relaxed text-neutral/70">
                  {pet.specialNeeds || "No special needs mentioned."}
                </p>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-8 lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center rounded-3xl border border-neutral/5 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {getStatIcon(stat.type)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                    {stat.label}
                  </span>
                  <span className="mt-1 text-sm font-black text-neutral">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-neutral/5 bg-white shadow-xl">
              <div className="border-b border-secondary/20 bg-secondary/20 p-6">
                <h2 className="flex items-center gap-2 text-xl font-black text-neutral">
                  <Rabbit size={24} className="text-primary" /> About {pet.petName}
                </h2>
              </div>
              <div className="space-y-6 p-8">
                <p className="leading-relaxed font-medium text-neutral/70">
                  {description}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {traits.map((trait, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-2xl bg-base-200/50 p-3"
                    >
                      <div className="text-primary">
                        {getTraitIcon(trait.type)}
                      </div>
                      <span className="text-xs font-bold text-neutral/80">
                        {trait.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl border border-neutral/5">
              <h3 className="mb-5 text-xl font-bold text-neutral">Owner Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User size={18} className="mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">{pet.ownerName || "Not specified"}</p>
                    <p className="text-sm text-neutral/60">{pet.ownerType || "Owner"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-1 text-primary" />
                  <p className="text-sm text-neutral/80">{pet.phone || "Not specified"}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-1 text-primary" />
                  <p className="break-all text-sm text-neutral/80">{pet.email || "Not specified"}</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-neutral p-10 text-center shadow-2xl">
              <div className="absolute left-0 top-0 h-1.5 w-full bg-primary"></div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold leading-tight text-white">
                  Interested in making <br /> {pet.petName || "this pet"} part of your family?
                </h3>
                <Link
                  href={`/adoptionfrom?petId=${pet._id}`}
                  className="btn btn-primary btn-lg h-16 w-full rounded-2xl border-none text-white shadow-lg transition-all hover:scale-[1.02]"
                >
                  Start Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PetProfile;