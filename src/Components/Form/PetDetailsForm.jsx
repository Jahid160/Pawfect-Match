"use client";

import { useState } from "react";
import {
  PawPrint,
  Heart,
  Stethoscope,
  Smile,
  Camera,
  User,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Upload,
  MapPin,
  Phone,
  Mail,
  Star,
  Zap,
  Shield,
  Activity,
  Home,
  Trees,
  Baby,
  Dog,
  Clock,
  DollarSign,
  AlertCircle,
  Sparkles,
  RotateCcw,
  CircleCheck,
} from "lucide-react";

const steps = [
  { id: 1, label: "Basic Info", icon: PawPrint },
  { id: 2, label: "Health", icon: Stethoscope },
  { id: 3, label: "Personality", icon: Smile },
  { id: 4, label: "Photos", icon: Camera },
  { id: 5, label: "Contact", icon: User },
];

const speciesOptions = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Hamster",
  "Fish",
  "Turtle",
  "Other",
];
const sizeOptions = ["Tiny", "Small", "Medium", "Large", "Extra Large"];
const temperamentOptions = [
  "Friendly",
  "Shy",
  "Playful",
  "Calm",
  "Energetic",
  "Protective",
];

/* ── Reusable pill-style radio ── */
function Pill({ value, current, onChange, icon: Icon, label, wide }) {
  const active = current === value;
  return (
    <label
      onClick={() => onChange(value)}
      className={[
        "flex-1 flex items-center justify-center gap-2 cursor-pointer select-none",
        "border-2 rounded-xl py-3 px-4 text-sm font-semibold transition-all duration-200",
        wide ? "min-w-[120px]" : "min-w-[72px]",
        active
          ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
          : "border-base-300 bg-base-100 text-neutral/60 hover:border-primary/60 hover:text-primary hover:bg-primary/5",
      ].join(" ")}
    >
      {Icon && <Icon size={14} className={active ? "text-white/80" : ""} />}
      <span>{label || value}</span>
    </label>
  );
}

/* ── Input with leading icon ── */
function IconInput({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      <Icon
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
      />
      <input
        {...props}
        className={`input input-bordered w-full pl-10 focus:input-primary bg-base-200/60 focus:bg-base-100 transition-colors ${className}`}
      />
    </div>
  );
}

/* ── Section divider label ── */
function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[1.5px] uppercase text-primary whitespace-nowrap">
        <Icon size={11} />
        {children}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
    </div>
  );
}

export default function PetAdoptionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [form, setForm] = useState({
    petName: "",
    species: "",
    breed: "",
    ageYears: "",
    ageMonths: "",
    gender: "",
    color: "",
    markings: "",
    size: "",
    weight: "",
    vaccinated: "",
    neutered: "",
    microchipped: "",
    healthCondition: "",
    medicalHistory: "",
    specialNeeds: "",
    goodWithKids: "",
    goodWithPets: "",
    activityLevel: "",
    indoorOutdoor: "",
    houseTrained: "",
    basicCommands: "",
    reasonForAdoption: "",
    timeWithOwner: "",
    adoptionFee: "",
    location: "",
    ownerName: "",
    phone: "",
    email: "",
    ownerType: "",
  });

  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const toggleT = (t) =>
    setSelectedTemperaments((p) =>
      p.includes(t) ? p.filter((x) => x !== t) : [...p, t],
    );
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages((p) =>
      [...p, ...files.map((f) => URL.createObjectURL(f))].slice(0, 6),
    );
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
        <div className="card bg-base-100 shadow-2xl max-w-sm w-full rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-primary/70 p-10 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center animate-bounce">
              <CircleCheck size={40} className="text-white" />
            </div>
            <h2 className="font-extrabold text-3xl text-white tracking-tight">
              Submitted!
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              <span className="font-bold text-white">
                {form.petName || "Your pet"}
              </span>
              's profile is under review. We'll publish it soon so they can find
              their forever home. 🐾
            </p>
          </div>
          <div className="p-6">
            <button
              className="btn btn-neutral btn-block rounded-xl gap-2"
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setForm({});
                setPreviewImages([]);
                setSelectedTemperaments([]);
              }}
            >
              <RotateCcw size={15} /> Add Another Pet
            </button>
          </div>
        </div>
      </div>
    );
  }

  const StepIcon = steps[currentStep - 1].icon;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      {/* ── Page Header ── */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="badge badge-primary badge-outline gap-1.5 mb-4 font-semibold tracking-widest text-[11px] uppercase px-4 py-3">
          <PawPrint size={11} /> PawFind Adoption Portal
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-neutral tracking-tight leading-[1.1] mb-3">
          List Your Pet
          <br />
          <span className="text-primary">for Adoption</span>
        </h1>
        <p className="text-base-content/50 text-base">
          Help your furry companion find their perfect forever home.
        </p>
      </div>

      {/* ── Step Indicators ── */}
      <div className="flex items-center justify-center max-w-2xl mx-auto mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = currentStep > s.id;
          const active = currentStep === s.id;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-1 relative">
                <button
                  type="button"
                  onClick={() => done && setCurrentStep(s.id)}
                  className={[
                    "w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 relative",
                    done
                      ? "bg-primary border-primary text-white cursor-pointer hover:scale-105"
                      : "",
                    active
                      ? "bg-neutral border-neutral text-white scale-110 shadow-xl"
                      : "",
                    !done && !active
                      ? "bg-base-100 border-base-300 text-base-content/30"
                      : "",
                  ].join(" ")}
                >
                  {done ? <Check size={15} /> : <Icon size={15} />}
                </button>
                <span
                  className={`text-[10px] font-bold tracking-wide uppercase hidden sm:block ${active ? "text-neutral" : done ? "text-primary" : "text-base-content/30"}`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-px flex-1 mx-1 mb-4 sm:mb-5 transition-all ${done ? "bg-primary/50" : "bg-base-300"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Form Card ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="card bg-base-100 shadow-2xl max-w-2xl mx-auto rounded-3xl overflow-hidden"
      >
        {/* Card Header */}
        <div className="bg-primary px-8 py-7 flex items-center gap-5 relative overflow-hidden">
          <div className="absolute -top-12 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
            <StepIcon size={26} />
          </div>
          <div>
            <p className="text-white text-[11px] font-bold tracking-[1.5px] uppercase mb-1">
              Step {currentStep} of {steps.length} —{" "}
              {steps[currentStep - 1].label}
            </p>
            <h2 className="text-white font-black text-2xl tracking-tight">
              {
                [
                  "Tell us about your pet",
                  "Health & medical details",
                  "Personality & lifestyle",
                  "Photos & location",
                  "Your contact info",
                ][currentStep - 1]
              }
            </h2>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 space-y-6">
          {/* ════ STEP 1: Basic Info ════ */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <SectionLabel icon={Sparkles}>Identification</SectionLabel>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <PawPrint size={12} className="text-primary" />
                      Pet Name *
                    </span>
                  </label>
                  <IconInput
                    icon={PawPrint}
                    placeholder="e.g. Buddy"
                    value={form.petName}
                    onChange={(e) => update("petName", e.target.value)}
                    required
                  />
                </div>

                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <Dog size={12} className="text-primary" />
                      Species *
                    </span>
                  </label>
                  <select
                    className="select select-bordered bg-base-200/60 focus:select-primary w-full"
                    value={form.species}
                    onChange={(e) => update("species", e.target.value)}
                    required
                  >
                    <option value="">Select species</option>
                    {speciesOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <Star size={12} className="text-primary" />
                      Breed
                    </span>
                  </label>
                  <input
                    className="input input-bordered bg-base-200/60 focus:input-primary w-full"
                    placeholder="e.g. Golden Retriever"
                    value={form.breed}
                    onChange={(e) => update("breed", e.target.value)}
                  />
                </div>

                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <Activity size={12} className="text-primary" />
                      Size
                    </span>
                  </label>
                  <select
                    className="select select-bordered bg-base-200/60 focus:select-primary w-full"
                    value={form.size}
                    onChange={(e) => update("size", e.target.value)}
                  >
                    <option value="">Select size</option>
                    {sizeOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold">Gender *</span>
                </label>
                <div className="flex gap-3">
                  <Pill
                    value="Male"
                    current={form.gender}
                    onChange={(v) => update("gender", v)}
                    label="♂ Male"
                  />
                  <Pill
                    value="Female"
                    current={form.gender}
                    onChange={(v) => update("gender", v)}
                    label="♀ Female"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <Clock size={12} className="text-primary" />
                      Age
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      placeholder="Years"
                      className="input input-bordered bg-base-200/60 focus:input-primary w-1/2"
                      value={form.ageYears}
                      onChange={(e) => update("ageYears", e.target.value)}
                    />
                    <input
                      type="number"
                      min="0"
                      max="11"
                      placeholder="Months"
                      className="input input-bordered bg-base-200/60 focus:input-primary w-1/2"
                      value={form.ageMonths}
                      onChange={(e) => update("ageMonths", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <Activity size={12} className="text-primary" />
                      Weight (kg)
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g. 12.5"
                    className="input input-bordered bg-base-200/60 focus:input-primary w-full"
                    value={form.weight}
                    onChange={(e) => update("weight", e.target.value)}
                  />
                </div>

                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold">
                      Primary Color
                    </span>
                  </label>
                  <input
                    className="input input-bordered bg-base-200/60 focus:input-primary w-full"
                    placeholder="e.g. Golden Brown"
                    value={form.color}
                    onChange={(e) => update("color", e.target.value)}
                  />
                </div>

                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold">
                      Distinctive Markings
                    </span>
                  </label>
                  <input
                    className="input input-bordered bg-base-200/60 focus:input-primary w-full"
                    placeholder="e.g. White patch on chest"
                    value={form.markings}
                    onChange={(e) => update("markings", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ════ STEP 2: Health ════ */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <SectionLabel icon={Shield}>Health Status</SectionLabel>

              {[
                { label: "Vaccinated?", field: "vaccinated" },
                { label: "Neutered / Spayed?", field: "neutered" },
                { label: "Microchipped?", field: "microchipped" },
              ].map(({ label, field }) => (
                <div className="form-control gap-1.5" key={field}>
                  <label className="label py-0">
                    <span className="label-text font-semibold">{label}</span>
                  </label>
                  <div className="flex gap-2">
                    {[
                      { v: "Yes", Icon: Check },
                      { v: "No", Icon: X },
                      { v: "Unknown", Icon: AlertCircle },
                    ].map(({ v, Icon }) => (
                      <Pill
                        key={v}
                        value={v}
                        current={form[field]}
                        onChange={(val) => update(field, val)}
                        icon={Icon}
                        label={v}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="divider my-1 text-xs opacity-40">
                Medical Details
              </div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold flex items-center gap-1.5">
                    <Stethoscope size={12} className="text-primary" />
                    Current Health Condition
                  </span>
                </label>
                <select
                  className="select select-bordered bg-base-200/60 focus:select-primary w-full"
                  value={form.healthCondition}
                  onChange={(e) => update("healthCondition", e.target.value)}
                >
                  <option value="">Select condition</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair - Minor Issues</option>
                  <option>Needs Veterinary Care</option>
                </select>
              </div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold">
                    Medical History
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered bg-base-200/60 focus:textarea-primary h-24 resize-none"
                  placeholder="Past surgeries, illnesses, treatments..."
                  value={form.medicalHistory}
                  onChange={(e) => update("medicalHistory", e.target.value)}
                />
              </div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold">
                    Special Needs / Dietary Requirements
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered bg-base-200/60 focus:textarea-primary h-20 resize-none"
                  placeholder="Ongoing medications or special diet..."
                  value={form.specialNeeds}
                  onChange={(e) => update("specialNeeds", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ════ STEP 3: Personality ════ */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <SectionLabel icon={Smile}>Temperament</SectionLabel>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold">
                    Select all that apply
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {temperamentOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleT(t)}
                      className={`btn btn-sm rounded-full font-semibold transition-all duration-200 gap-1.5 ${
                        selectedTemperaments.includes(t)
                          ? "btn-primary shadow-md shadow-primary/25"
                          : "btn-ghost border border-base-300 hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {selectedTemperaments.includes(t) && <Check size={11} />}
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divider my-1 text-xs opacity-40">
                Compatibility
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Good with Kids?",
                    field: "goodWithKids",
                    icon: Baby,
                  },
                  {
                    label: "Good with Other Pets?",
                    field: "goodWithPets",
                    icon: PawPrint,
                  },
                  {
                    label: "House Trained?",
                    field: "houseTrained",
                    icon: Home,
                  },
                  {
                    label: "Knows Basic Commands?",
                    field: "basicCommands",
                    icon: Star,
                  },
                ].map(({ label, field, icon: Icon }) => (
                  <div className="form-control gap-1.5" key={field}>
                    <label className="label py-0">
                      <span className="label-text font-semibold flex items-center gap-1.5">
                        <Icon size={12} className="text-primary" />
                        {label}
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <Pill
                        value="Yes"
                        current={form[field]}
                        onChange={(v) => update(field, v)}
                        icon={Check}
                        label="Yes"
                      />
                      <Pill
                        value="No"
                        current={form[field]}
                        onChange={(v) => update(field, v)}
                        icon={X}
                        label="No"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold flex items-center gap-1.5">
                    <Zap size={12} className="text-primary" />
                    Activity Level
                  </span>
                </label>
                <div className="flex gap-3">
                  <Pill
                    value="Low"
                    current={form.activityLevel}
                    onChange={(v) => update("activityLevel", v)}
                    label="🐢 Low"
                  />
                  <Pill
                    value="Medium"
                    current={form.activityLevel}
                    onChange={(v) => update("activityLevel", v)}
                    label="🐕 Medium"
                  />
                  <Pill
                    value="High"
                    current={form.activityLevel}
                    onChange={(v) => update("activityLevel", v)}
                    label="⚡ High"
                  />
                </div>
              </div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold flex items-center gap-1.5">
                    <Home size={12} className="text-primary" />
                    Indoor / Outdoor
                  </span>
                </label>
                <div className="flex gap-3">
                  <Pill
                    value="Indoor"
                    current={form.indoorOutdoor}
                    onChange={(v) => update("indoorOutdoor", v)}
                    label="🏠 Indoor"
                  />
                  <Pill
                    value="Outdoor"
                    current={form.indoorOutdoor}
                    onChange={(v) => update("indoorOutdoor", v)}
                    label="🌿 Outdoor"
                  />
                  <Pill
                    value="Both"
                    current={form.indoorOutdoor}
                    onChange={(v) => update("indoorOutdoor", v)}
                    label="🔄 Both"
                  />
                </div>
              </div>

              <div className="divider my-1 text-xs opacity-40">
                Adoption Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold">
                      Reason for Adoption
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered bg-base-200/60 focus:textarea-primary h-24 resize-none"
                    placeholder="Why are you rehoming this pet?"
                    value={form.reasonForAdoption}
                    onChange={(e) =>
                      update("reasonForAdoption", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-3">
                  <div className="form-control gap-1.5">
                    <label className="label py-0">
                      <span className="label-text font-semibold flex items-center gap-1.5">
                        <Clock size={12} className="text-primary" />
                        Time with Owner
                      </span>
                    </label>
                    <input
                      className="input input-bordered bg-base-200/60 focus:input-primary w-full"
                      placeholder="e.g. 2 years"
                      value={form.timeWithOwner}
                      onChange={(e) => update("timeWithOwner", e.target.value)}
                    />
                  </div>
                  <div className="form-control gap-1.5">
                    <label className="label py-0">
                      <span className="label-text font-semibold flex items-center gap-1.5">
                        <DollarSign size={12} className="text-primary" />
                        Adoption Fee (BDT)
                      </span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="input input-bordered bg-base-200/60 focus:input-primary w-full"
                      placeholder="0 for free"
                      value={form.adoptionFee}
                      onChange={(e) => update("adoptionFee", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ STEP 4: Photos ════ */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <SectionLabel icon={Camera}>Pet Photos</SectionLabel>

              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-primary/30 rounded-2xl p-10 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 bg-base-200/40">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Upload size={26} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-neutral">
                    Click to upload photos
                  </p>
                  <p className="text-xs text-base-content/40 mt-1">
                    JPG, PNG, WEBP — Max 5MB each · Up to 6 photos
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {previewImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative group rounded-xl overflow-hidden aspect-square bg-base-200"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImages((p) =>
                            p.filter((_, idx) => idx !== i),
                          )
                        }
                        className="absolute top-2 right-2 btn btn-xs btn-circle btn-neutral opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={11} />
                      </button>
                      {i === 0 && (
                        <span className="absolute bottom-2 left-2 badge badge-primary badge-xs font-bold tracking-wider uppercase">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="divider my-1 text-xs opacity-40">Location</div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold flex items-center gap-1.5">
                    <MapPin size={12} className="text-primary" />
                    City / Area *
                  </span>
                </label>
                <IconInput
                  icon={MapPin}
                  placeholder="e.g. Dhaka, Chittagong"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* ════ STEP 5: Contact ════ */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <SectionLabel icon={User}>Owner Type</SectionLabel>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text font-semibold">You are a *</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Individual Owner", "Shelter / NGO", "Rescue Group"].map(
                    (t) => (
                      <Pill
                        key={t}
                        value={t}
                        current={form.ownerType}
                        onChange={(v) => update("ownerType", v)}
                        label={t}
                        wide
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="divider my-1 text-xs opacity-40">
                Contact Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <User size={12} className="text-primary" />
                      Full Name *
                    </span>
                  </label>
                  <IconInput
                    icon={User}
                    placeholder="Your full name"
                    value={form.ownerName}
                    onChange={(e) => update("ownerName", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control gap-1.5">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <Phone size={12} className="text-primary" />
                      Phone Number *
                    </span>
                  </label>
                  <IconInput
                    icon={Phone}
                    type="tel"
                    placeholder="+880 1XXXXXXXXX"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="form-control gap-1.5 sm:col-span-2">
                  <label className="label py-0">
                    <span className="label-text font-semibold flex items-center gap-1.5">
                      <Mail size={12} className="text-primary" />
                      Email Address *
                    </span>
                  </label>
                  <IconInput
                    icon={Mail}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="divider my-1 text-xs opacity-40">Summary</div>

              <div className="bg-base-200/70 border border-base-300 rounded-2xl p-5">
                <h3 className="flex items-center gap-2 font-bold text-neutral mb-4 text-base">
                  <PawPrint size={16} className="text-primary" /> Submission
                  Overview
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Pet Name", form.petName],
                    ["Species", form.species],
                    ["Breed", form.breed || "—"],
                    ["Gender", form.gender || "—"],
                    [
                      "Age",
                      form.ageYears
                        ? `${form.ageYears}y ${form.ageMonths || 0}m`
                        : "—",
                    ],
                    ["Location", form.location || "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 mb-0.5">
                        {k}
                      </p>
                      <p className="text-sm font-bold text-neutral">
                        {v || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-base-200">
          <button
            type="button"
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            className={`btn btn-ghost rounded-xl gap-2 ${currentStep === 1 ? "invisible" : ""}`}
          >
            <ChevronLeft size={16} /> Back
          </button>

          <div className="flex gap-1.5 items-center">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep === s.id
                    ? "w-5 bg-neutral"
                    : currentStep > s.id
                      ? "w-1.5 bg-primary/50"
                      : "w-1.5 bg-base-300"
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={() =>
                setCurrentStep((s) => Math.min(steps.length, s + 1))
              }
              className="btn btn-primary rounded-xl gap-2 px-6"
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary rounded-xl gap-2 px-6 shadow-lg shadow-primary/30"
            >
              <PawPrint size={15} /> Submit Listing
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
