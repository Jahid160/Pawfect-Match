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
console.log(pet);
  const [activeImage, setActiveImage] = useState(gallery[0]);


  const { isSaved, count, handleToggle } = useSavedState(pet, toggleSaveAction);

  if (!pet?._id) {
  return <div className="p-10 text-center">Loading pet details...</div>;
}

  const getStatIcon = (type) => {
    switch (type) {
      case "gender": return <Venus className="w-5 h-5" />;
      case "breed": return <Dog className="w-5 h-5" />;
      case "age": return <Clock className="w-5 h-5" />;
      case "color": return <Palette className="w-5 h-5" />;
      case "weight": return <Scale className="w-5 h-5" />;
      case "size": return <Ruler className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getTraitIcon = (type) => {
    switch (type) {
      case "smile": return <Smile className="w-5 h-5" />;
      case "syringe": return <Syringe className="w-5 h-5" />;
      case "home": return <Home className="w-5 h-5" />;
      case "scissors": return <Scissors className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5" />;
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
    <div className="bg-base-100 min-h-screen text-neutral antialiased">
      <nav className="mx-auto px-6 pt-8 max-w-6xl">
        <Link
          href="/all-pets"
          className="group flex items-center gap-2 font-bold text-neutral/60 hover:text-primary transition-all duration-300"
        >
          <div className="bg-base-200 group-hover:bg-primary shadow-sm group-hover:shadow-md p-2 rounded-full group-hover:text-white transition-all group-hover:-translate-x-1">
            <ArrowLeft size={20} />
          </div>
          <span className="text-sm tracking-wide">Return to listings</span>
        </Link>
      </nav>

      <header className="flex md:flex-row flex-col justify-between md:items-end gap-4 mx-auto px-6 pt-6 pb-6 max-w-6xl">
        <div>
          <div className="flex items-center gap-2 mb-2 font-bold text-primary text-sm uppercase tracking-widest">
            <ShieldCheck size={18} /> Verified Adoption Listing
          </div>
          <h1 className="font-extrabold text-neutral text-5xl tracking-tight">
            {pet.petName || "Unnamed Pet"}
          </h1>
          <div className="flex items-center gap-2 mt-2 font-medium text-neutral/60">
            <MapPin size={18} className="text-primary" />
            <span>{pet.location || "Location not specified"}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="hover:bg-base-200 shadow-sm border-neutral/10 hover:border-neutral/20 btn-outline text-neutral btn btn-circle"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={() => handleToggle(pet._id)}
              className="hover:bg-base-200 shadow-sm border-neutral/10 hover:border-neutral/20 btn-outline text-neutral btn btn-circle"
            >
              <Heart
                size={20}
                className={isSaved ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center bg-base-200 px-4 py-2 rounded-2xl min-w-[60px]">
            <span className="text-xl">❤️</span>
            <span className="font-black text-sm">{count}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto px-6 pb-24 max-w-6xl">
        <div className="gap-12 grid grid-cols-1 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            {/* Pet gallery */}
            <section className="space-y-6">
              <div className="relative bg-base-200 shadow-2xl border border-white/20 rounded-[2.5rem] aspect-[16/10] overflow-hidden">
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
                      className="top-1/2 left-4 z-10 absolute flex justify-center items-center bg-white/90 hover:bg-primary shadow-md rounded-full w-11 h-11 text-neutral hover:text-white transition -translate-y-1/2"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="top-1/2 right-4 z-10 absolute flex justify-center items-center bg-white/90 hover:bg-primary shadow-md rounded-full w-11 h-11 text-neutral hover:text-white transition -translate-y-1/2"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              <div className="gap-4 grid grid-cols-4">
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
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-primary rounded-full w-1.5 h-8"></div>
                  <h3 className="font-bold text-2xl italic">Health Journey</h3>
                </div>
                <span className="font-bold text-neutral/40 text-xs uppercase tracking-widest">
                  Last Updated: {formatDate(pet.createdAt)}
                </span>
              </div>

              <div className="before:absolute relative before:inset-0 space-y-4 before:bg-gradient-to-b before:from-primary before:via-base-300 before:to-transparent md:before:mx-auto before:ml-5 before:w-0.5 before:h-full md:before:translate-x-0 before:-translate-x-px">
                {healthMilestones.map((item, idx) => (
                  <div
                    key={idx}
                    className={`group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse ${item.done ? "is-completed" : "opacity-70"}`}
                  >
                    <div
                      className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-base-100 shadow transition-colors duration-300 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${item.done ? "bg-primary text-white" : "bg-base-200 text-neutral/30"}`}
                    >
                      {item.done ? <ShieldCheck size={16} /> : <div className="bg-current rounded-full w-2 h-2" />}
                    </div>
                    <div className="bg-white shadow-sm hover:shadow-md p-5 border border-neutral/5 rounded-[2rem] w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] transition-all">
                      <div className="flex justify-between items-center mb-2">
                        <time className="font-black text-primary text-sm uppercase tracking-tighter">
                          {item.label}
                        </time>
                        {item.done ? (
                          <span className="gap-1 font-bold text-[9px] text-white uppercase badge badge-success badge-sm">
                            Verified
                          </span>
                        ) : (
                          <span className="font-bold text-[9px] uppercase badge badge-ghost badge-sm">
                            Pending
                          </span>
                        )}
                      </div>
                      <div className="font-medium text-neutral/80">
                        <div className="flex flex-wrap gap-2">
                          {item.values.map((v, i) => (
                            <span
                              key={i}
                              className="bg-base-200 px-3 py-1 rounded-full font-bold text-[11px]"
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

              <div className="bg-white shadow-sm p-6 border border-neutral/5 rounded-[2rem]">
                <h3 className="flex items-center gap-2 mb-3 font-bold text-lg">
                  <Stethoscope className="text-primary" size={20} /> Medical History
                </h3>
                <p className="text-neutral/70 leading-relaxed">
                  {pet.medicalHistory || "No medical history provided."}
                </p>

                <h3 className="mt-6 mb-3 font-bold text-lg">Special Needs</h3>
                <p className="text-neutral/70 leading-relaxed">
                  {pet.specialNeeds || "No special needs mentioned."}
                </p>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-8 lg:col-span-5">
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col justify-center items-center bg-white shadow-sm hover:shadow-md p-5 border border-neutral/5 rounded-3xl text-center transition-shadow"
                >
                  <div className="flex justify-center items-center bg-primary/10 mb-3 rounded-2xl w-10 h-10 text-primary">
                    {getStatIcon(stat.type)}
                  </div>
                  <span className="opacity-40 font-bold text-[10px] uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="mt-1 font-black text-neutral text-sm">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white shadow-xl border border-neutral/5 rounded-[2rem] overflow-hidden">
              <div className="bg-secondary/20 p-6 border-secondary/20 border-b">
                <h2 className="flex items-center gap-2 font-black text-neutral text-xl">
                  <Rabbit size={24} className="text-primary" /> About {pet.petName}
                </h2>
              </div>
              <div className="space-y-6 p-8">
                <p className="font-medium text-neutral/70 leading-relaxed">
                  {description}
                </p>
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  {traits.map((trait, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-base-200/50 p-3 rounded-2xl"
                    >
                      <div className="text-primary">
                        {getTraitIcon(trait.type)}
                      </div>
                      <span className="font-bold text-neutral/80 text-xs">
                        {trait.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-xl p-6 border border-neutral/5 rounded-[2rem]">
              <h3 className="mb-5 font-bold text-neutral text-xl">Owner Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User size={18} className="mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">{pet.ownerName || "Not specified"}</p>
                    <p className="text-neutral/60 text-sm">{pet.ownerType || "Owner"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-1 text-primary" />
                  <p className="text-neutral/80 text-sm">{pet.phone || "Not specified"}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-1 text-primary" />
                  <p className="text-neutral/80 text-sm break-all">{pet.email || "Not specified"}</p>
                </div>
              </div>
            </div>

            <div className="relative bg-neutral shadow-2xl p-10 rounded-[2rem] overflow-hidden text-center">
              <div className="top-0 left-0 absolute bg-primary w-full h-1.5"></div>
              <div className="z-10 relative space-y-6">
                <h3 className="font-bold text-white text-2xl leading-tight">
                  Interested in making <br /> {pet.petName || "this pet"} part of your family?
                </h3>
                <Link
                  href={`/adoptionfrom?petId=${pet._id}`}
                  className="shadow-lg border-none rounded-2xl w-full h-16 text-white hover:scale-[1.02] transition-all btn btn-primary btn-lg"
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