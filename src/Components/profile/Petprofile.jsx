"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  Weight,
  PawPrint,
  Heart,
  ShieldCheck,
  Info,
  Stethoscope,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const InfoCard = ({ icon: Icon, title, value }) => {
  if (!value && value !== 0) return null;

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-orange-500">
        <Icon size={18} />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  );
};

const Badge = ({ children }) => (
  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
    {children}
  </span>
);

const Section = ({ title, children }) => (
  <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
    {children}
  </div>
);

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

export default function PetProfile({ pet }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!pet || Object.keys(pet).length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4">
        <div className="rounded-3xl bg-white p-10 text-center shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">Pet not found</h2>
          <p className="mt-2 text-gray-600">
            The pet profile you are looking for does not exist.
          </p>
          <Link
            href="/pets"
            className="mt-6 inline-flex items-center rounded-full bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            Back to Pets
          </Link>
        </div>
      </div>
    );
  }

  const {
    petName,
    species,
    breed,
    ageYears,
    ageMonths,
    gender,
    color,
    markings,
    size,
    weight,
    vaccinated,
    neutered,
    microchipped,
    healthCondition,
    medicalHistory,
    specialNeeds,
    goodWithKids,
    activityLevel,
    indoorOutdoor,
    houseTrained,
    reasonForAdoption,
    timeWithOwner,
    adoptionFee,
    location,
    ownerName,
    phone,
    email,
    ownerType,
    temperaments = [],
    images = [],
    createdAt,
  } = pet || {};

  const safeImages =
    images?.length > 0 ? images : ["/placeholder-pet.jpg"];

  const currentImage = safeImages[selectedImage];

  const handlePrev = () => {
    setSelectedImage((prev) =>
      prev === 0 ? safeImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === safeImages.length - 1 ? 0 : prev + 1
    );
  };

  const ageText = `${ageYears || 0} year${Number(ageYears) === 1 ? "" : "s"} ${
    ageMonths ? `${ageMonths} month${Number(ageMonths) === 1 ? "" : "s"}` : ""
  }`.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Link
          href="/pets"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Pets
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left side */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
              <div className="relative h-[320px] w-full sm:h-[420px]">
                <Image
                  src={currentImage}
                  alt={petName || "Pet image"}
                  fill
                  className="object-cover transition duration-300"
                  unoptimized
                />

                {safeImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-orange-500 hover:text-white"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-orange-500 hover:text-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {safeImages.length > 1 && (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {safeImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition ${
                      selectedImage === index
                        ? "border-orange-500 ring-2 ring-orange-200"
                        : "border-orange-100 hover:border-orange-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${petName || "Pet"} ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap gap-2">
                {species && <Badge>{species}</Badge>}
                {size && <Badge>{size}</Badge>}
                {healthCondition && <Badge>{healthCondition}</Badge>}
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                {petName || "Unnamed Pet"}
              </h1>

              <p className="mt-2 text-lg text-gray-600">
                {breed || "Breed not specified"}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500" />
                    <span>{location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  <span>{ageText || "Age not specified"}</span>
                </div>
              </div>

              {temperaments?.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-gray-800">
                    Temperaments
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {temperaments.map((item, index) => (
                      <Badge key={index}>{item}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Section title="Quick Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard icon={PawPrint} title="Species" value={species} />
                <InfoCard icon={Sparkles} title="Breed" value={breed} />
                <InfoCard icon={Calendar} title="Age" value={ageText} />
                <InfoCard icon={Info} title="Gender" value={gender || "Not specified"} />
                <InfoCard icon={Sparkles} title="Color" value={color} />
                <InfoCard icon={Info} title="Markings" value={markings} />
                <InfoCard icon={Weight} title="Weight" value={weight ? `${weight} kg` : ""} />
                <InfoCard icon={Heart} title="Size" value={size} />
              </div>
            </Section>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Section title="Health & Care">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={ShieldCheck}
                  title="Vaccinated"
                  value={formatBoolean(vaccinated)}
                />
                <InfoCard
                  icon={ShieldCheck}
                  title="Neutered"
                  value={formatBoolean(neutered)}
                />
                <InfoCard
                  icon={ShieldCheck}
                  title="Microchipped"
                  value={formatBoolean(microchipped)}
                />
                <InfoCard
                  icon={Stethoscope}
                  title="Health Condition"
                  value={healthCondition}
                />
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Medical History
                  </h3>
                  <p className="text-sm leading-7 text-gray-600">
                    {medicalHistory || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Special Needs
                  </h3>
                  <p className="text-sm leading-7 text-gray-600">
                    {specialNeeds || "Not specified"}
                  </p>
                </div>
              </div>
            </Section>

            <Section title="Behavior & Lifestyle">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={Heart}
                  title="Good With Kids"
                  value={formatBoolean(goodWithKids)}
                />
                <InfoCard
                  icon={Sparkles}
                  title="Activity Level"
                  value={activityLevel || "Not specified"}
                />
                <InfoCard
                  icon={Info}
                  title="Indoor / Outdoor"
                  value={indoorOutdoor || "Not specified"}
                />
                <InfoCard
                  icon={Info}
                  title="House Trained"
                  value={formatBoolean(houseTrained)}
                />
              </div>
            </Section>

            <Section title="Adoption Details">
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Reason for Adoption
                  </h3>
                  <p>{reasonForAdoption || "Not specified"}</p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Time With Owner
                  </h3>
                  <p>{timeWithOwner || "Not specified"}</p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Adoption Fee
                  </h3>
                  <p>{adoptionFee ? `${adoptionFee} BDT` : "Not specified"}</p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Posted On
                  </h3>
                  <p>{formatDate(createdAt)}</p>
                </div>
              </div>
            </Section>
          </div>

          <div>
            <div className="sticky top-24 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Owner Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="mt-1 text-orange-500" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {ownerName || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {ownerType || "Owner"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 text-orange-500" size={18} />
                  <div>
                    <p className="text-sm text-gray-700">{phone || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 text-orange-500" size={18} />
                  <div>
                    <p className="break-all text-sm text-gray-700">
                      {email || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  {phone ? (
                    <a
                      href={`tel:${phone}`}
                      className="mb-3 block w-full rounded-full bg-orange-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
                    >
                      Call Owner
                    </a>
                  ) : null}

                  {email ? (
                    <a
                      href={`mailto:${email}?subject=Interested in adopting ${petName || "your pet"}`}
                      className="block w-full rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-center font-semibold text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
                    >
                      Email Owner
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
