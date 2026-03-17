"use client";
import { createShelterUser } from "@/action/server/Shelteruser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

const steps = [
  { id: 1, title: "Personal Info", icon: "👤" },
  { id: 2, title: "Shelter Info", icon: "🏠" },
  { id: 3, title: "Experience", icon: "⭐" },
  { id: 4, title: "Documents", icon: "📄" },
];

export default function ShelterApplicationForm() {
  const { data: session, } = useSession()
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    nidNumber: "",
    shelterName: "",
    shelterAddress: "",
    shelterCity: "",
    shelterType: "",
    capacity: "",
    operatingSince: "",
    hasPets: "",
    petExperience: "",
    hasRescueExp: "",
    rescueDetails: "",
    hasVetContact: "",
    motivation: "",
    nidPdf: null,
    shelterPhoto: null,
    registrationCert: null,
    agreeTerms: false,
  });


  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email,
      }));
    }
  }, [session]);
  const update = (field, value) => {

    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const validateStep = (step) => {
    const e = {};
    if (step === 1) {
      if (!formData.fullName.trim()) e.fullName = "Full name is required";
      if (!formData.phone.trim()) e.phone = "Phone number is required";
      if (!formData.email.trim()) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        e.email = "Enter a valid email address";
      if (!formData.address.trim()) e.address = "Address is required";
      if (!formData.city.trim()) e.city = "City is required";
      if (!formData.nidNumber.trim()) e.nidNumber = "NID number is required";
    }
    if (step === 2) {
      if (!formData.shelterName.trim())
        e.shelterName = "Shelter name is required";
      if (!formData.shelterType) e.shelterType = "Please select shelter type";
      if (!formData.shelterAddress.trim())
        e.shelterAddress = "Shelter address is required";
      if (!formData.shelterCity.trim())
        e.shelterCity = "Shelter city is required";
      if (!formData.capacity || +formData.capacity < 1)
        e.capacity = "Enter a valid capacity";
    }
    if (step === 3) {
      if (!formData.hasPets) e.hasPets = "Please select an option";
      if (!formData.petExperience.trim())
        e.petExperience = "Please describe your experience";
      if (!formData.hasRescueExp) e.hasRescueExp = "Please select an option";
      if (!formData.hasVetContact) e.hasVetContact = "Please select an option";
      if (!formData.motivation.trim())
        e.motivation = "Please share your motivation";
    }
    if (step === 4) {
      if (!formData.nidPhoto) e.nidPhoto = "NID PDF is required";
      if (!formData.shelterPhoto) e.shelterPhoto = "Shelter photo is required";
      if (formData.shelterType === "ngo" && !formData.registrationCert)
        e.registrationCert = "Registration certificate is required for NGOs";
      if (!formData.agreeTerms) e.agreeTerms = "You must agree to the terms";
    }
    return e;
  };

  const handleNext = () => {
    const errs = validateStep(currentStep);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTimeout(() => {
        const first = document.querySelector("[data-error='true']");
        if (first)
          first.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setErrors({});
    setCurrentStep((s) => Math.min(s + 1, 4));
  };

  const cloudName = "dyb72qpqm";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateStep(4);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const uploadToCloudinary = async (file) => {
        if (!file) return null;
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "paw_fect_preset");
        data.append("cloud_name", cloudName);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          { method: "POST", body: data },
        );
        const fileData = await res.json();
        return fileData.secure_url;
      };

      const nidUrl = await uploadToCloudinary(formData.nidPhoto);
      const shelterUrl = await uploadToCloudinary(formData.shelterPhoto);
      const certUrl = formData.registrationCert
        ? await uploadToCloudinary(formData.registrationCert)
        : null;

      const finalData = {
        ...formData,
        nidPhoto: nidUrl,
        shelterPhoto: shelterUrl,
        registrationCert: certUrl,
        submittedAt: new Date().toISOString(),
        status: "Pending",
      };

      const response = await createShelterUser(finalData);
      if (response.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: response.message,
        });
      }
    } catch (err) {
      console.error("Upload failed", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      nidNumber: "",
      shelterName: "",
      shelterAddress: "",
      shelterCity: "",
      shelterType: "",
      capacity: "",
      operatingSince: "",
      hasPets: "",
      petExperience: "",
      hasRescueExp: "",
      rescueDetails: "",
      hasVetContact: "",
      motivation: "",
      nidPhoto: null,
      shelterPhoto: null,
      registrationCert: null,
      agreeTerms: false,
    });
    setErrors({});
    setCurrentStep(1);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="card bg-base-100 shadow-2xl max-w-md w-full rounded-3xl overflow-hidden">
          {/* Top banner */}
          <div className="bg-primary px-8 py-10 flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-5xl animate-bounce">
              🎉
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-1">
                Application Submitted!
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Your shelter role application has been sent to the admin.
                <br />
                You will be notified via email/SMS once reviewed.
              </p>
            </div>
            <div className="badge badge-lg bg-white/20 text-white border-white/30 font-semibold px-5 py-3">
              ⏱ Review within 3–5 Business Days
            </div>
          </div>

          {/* Summary */}
          <div className="px-8 py-5 bg-base-200/60 border-b border-base-300">
            <p className="text-[11px] font-bold uppercase tracking-widest text-base-content/40 mb-3">
              Submitted Info
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {[
                ["Name", formData.fullName],
                ["Shelter", formData.shelterName],
                ["Email", formData.email],
                ["Phone", formData.phone],
                ["City", formData.city],
                ["Type", formData.shelterType],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <span className="text-base-content/40 font-medium">
                      {k}:{" "}
                    </span>
                    <span className="text-neutral font-bold capitalize">
                      {v}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex flex-col gap-3">
            <button
              onClick={handleReset}
              className="btn btn-primary btn-block rounded-xl gap-2 font-bold"
            >
              ➕ Submit Another Application
            </button>
            <Link
              href="/"
              className="btn btn-ghost btn-block rounded-xl border border-base-300 gap-2 font-semibold"
            >
              🏠 Go to Home
            </Link>
          </div>

          <p className="text-center text-xs text-base-content/40 pb-5 px-6">
            Keep an eye on your inbox — our team will reach out shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
            🐾 Paw Fect Adoption
          </div>
          <h1 className="text-3xl font-bold text-neutral">
            Shelter Role Application
          </h1>
          <p className="text-base-content/60 mt-1 text-sm">
            Once approved by the admin, you will be able to operate as a
            shelter.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-base-300 z-0" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 z-0"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-1 z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${step.id < currentStep
                  ? "bg-primary text-primary-content shadow-md"
                  : step.id === currentStep
                    ? "bg-primary text-primary-content shadow-lg scale-110 ring-4 ring-primary/30"
                    : "bg-base-100 text-base-content/40 border-2 border-base-300"
                  }`}
              >
                {step.id < currentStep ? "✓" : step.icon}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${step.id === currentStep
                  ? "text-primary"
                  : "text-base-content/50"
                  }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">{steps[currentStep - 1].icon}</span>
              <h2 className="text-xl font-bold text-neutral">
                {steps[currentStep - 1].title}
              </h2>
              <span className="ml-auto text-sm text-base-content/40">
                {currentStep}/4
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              {/* ── STEP 1 ── */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" error={errors.fullName}>
                      <input
                        type="text"
                        className={inputCls(errors.fullName)}
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                      />
                    </Field>
                    <Field label="Mobile Number *" error={errors.phone}>
                      <input
                        type="tel"
                        className={inputCls(errors.phone)}
                        placeholder="01XXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => update("phone", e.target.value)}
                      />
                    </Field>
                  </div>
                  <Field label="Email Address *" error={errors.email}>
                    <input
                      type="email"
                      className={`input input-bordered w-full bg-slate-100 cursor-not-allowed ${inputCls(errors.email)}`}
                      placeholder="example@email.com"
                      value={formData.email}
                      readOnly
                      required
                    />
                  </Field>
                  <Field label="Current Address *" error={errors.address}>
                    <textarea
                      className={`${textareaCls(errors.address)} resize-none h-32 w-full`}
                      placeholder="House/flat number, street, area..."
                      rows={2}
                      value={formData.address}
                      onChange={(e) => update("address", e.target.value)}
                    />{" "}
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="City / District *" error={errors.city}>
                      <input
                        type="text"
                        className={inputCls(errors.city)}
                        placeholder="e.g. Dhaka, Chittagong"
                        value={formData.city}
                        onChange={(e) => update("city", e.target.value)}
                      />
                    </Field>
                    <Field
                      label="National ID Number *"
                      error={errors.nidNumber}
                    >
                      <input
                        type="text"
                        className={inputCls(errors.nidNumber)}
                        placeholder="NID number"
                        value={formData.nidNumber}
                        onChange={(e) => update("nidNumber", e.target.value)}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <Field label="Shelter Name *" error={errors.shelterName}>
                    <input
                      type="text"
                      className={inputCls(errors.shelterName)}
                      placeholder="Name of your shelter"
                      value={formData.shelterName}
                      onChange={(e) => update("shelterName", e.target.value)}
                    />
                  </Field>
                  <Field label="Shelter Type *" error={errors.shelterType}>
                    <select
                      className={selectCls(errors.shelterType)}
                      value={formData.shelterType}
                      onChange={(e) => update("shelterType", e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="home">Individual Home</option>
                      <option value="organization">Organization</option>
                      <option value="ngo">NGO / Registered Society</option>
                      <option value="rescue_group">Rescue Group</option>
                    </select>
                  </Field>
                  <Field
                    label="Shelter Address *"
                    error={errors.shelterAddress}
                  >
                    <textarea
                      className={`${textareaCls(errors.shelterAddress)} resize-none h-32 w-full`}
                      placeholder="Full address of the shelter"
                      rows={2}
                      value={formData.shelterAddress}
                      onChange={(e) => update("shelterAddress", e.target.value)}
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Shelter City / District *"
                      error={errors.shelterCity}
                    >
                      <input
                        type="text"
                        className={inputCls(errors.shelterCity)}
                        placeholder="District name"
                        value={formData.shelterCity}
                        onChange={(e) => update("shelterCity", e.target.value)}
                      />
                    </Field>
                    <Field label="Maximum Capacity *" error={errors.capacity}>
                      <input
                        type="number"
                        className={inputCls(errors.capacity)}
                        placeholder="How many animals can you house?"
                        min="1"
                        value={formData.capacity}
                        onChange={(e) => update("capacity", e.target.value)}
                      />
                    </Field>
                  </div>
                  <Field label="Operating Since">
                    <input
                      type="date"
                      className="input input-bordered w-full"
                      value={formData.operatingSince}
                      onChange={(e) => update("operatingSince", e.target.value)}
                    />
                  </Field>
                  {formData.shelterType === "ngo" && (
                    <div className="alert alert-info text-sm">
                      <span>
                        ℹ️ NGO / registered societies will need to upload a
                        registration certificate in the next step.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 3 ── */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <Field
                    label="Do you currently own or have previously owned pets? *"
                    error={errors.hasPets}
                  >
                    <div
                      data-error={!!errors.hasPets}
                      className={`flex gap-4 mt-1 p-2 rounded-lg transition-colors ${errors.hasPets ? "bg-error/5 border border-error/30" : ""}`}
                    >
                      {["Yes", "No"].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            className="radio radio-primary"
                            name="hasPets"
                            value={opt}
                            checked={formData.hasPets === opt}
                            onChange={(e) => update("hasPets", e.target.value)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field
                    label="Describe your animal care experience *"
                    error={errors.petExperience}
                  >
                    <textarea
                      className={`${textareaCls(errors.petExperience)} resize-none h-32 w-full`}
                      placeholder="How many years, what types of animals, where..."
                      rows={3}
                      value={formData.petExperience}
                      onChange={(e) => update("petExperience", e.target.value)}
                    />
                  </Field>

                  <Field
                    label="Do you have rescue / animal recovery experience? *"
                    error={errors.hasRescueExp}
                  >
                    <div
                      data-error={!!errors.hasRescueExp}
                      className={`flex gap-4 mt-1 p-2 rounded-lg transition-colors ${errors.hasRescueExp ? "bg-error/5 border border-error/30" : ""}`}
                    >
                      {["Yes", "No"].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            className="radio radio-primary"
                            name="hasRescueExp"
                            value={opt}
                            checked={formData.hasRescueExp === opt}
                            onChange={(e) =>
                              update("hasRescueExp", e.target.value)
                            }
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  {formData.hasRescueExp === "Yes" && (
                    <Field label="Details of rescue experience">
                      <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="When, where and how you rescued animals..."
                        rows={2}
                        value={formData.rescueDetails}
                        onChange={(e) =>
                          update("rescueDetails", e.target.value)
                        }
                      />
                    </Field>
                  )}

                  <Field
                    label="Do you have access to a nearby veterinarian? *"
                    error={errors.hasVetContact}
                  >
                    <div
                      data-error={!!errors.hasVetContact}
                      className={`flex gap-4 mt-1 p-2 rounded-lg transition-colors ${errors.hasVetContact ? "bg-error/5 border border-error/30" : ""}`}
                    >
                      {["Yes", "No"].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            className="radio radio-primary"
                            name="hasVetContact"
                            value={opt}
                            checked={formData.hasVetContact === opt}
                            onChange={(e) =>
                              update("hasVetContact", e.target.value)
                            }
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field
                    label="Why do you want to become a shelter? *"
                    error={errors.motivation}
                  >
                    <textarea
                      className={`${textareaCls(errors.motivation)} resize-none h-32 w-full`}
                      placeholder="Share your motivation and goals..."
                      rows={3}
                      value={formData.motivation}
                      onChange={(e) => update("motivation", e.target.value)}
                    />
                  </Field>
                </div>
              )}

              {/* ── STEP 4 ── */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="alert bg-primary/10 border-primary/20 text-sm mb-2">
                    <span>
                      📋 All documents must be clear and legible. JPG, PNG or
                      PDF files are accepted.
                    </span>
                  </div>

                  <UploadField
                    label="National ID Card PDF (NID) *"
                    hint="Both front and back sides together"
                    error={errors.nidPhoto}
                    onChange={(e) => {
                      update("nidPhoto", e.target.files[0]);
                      if (errors.nidPhoto)
                        setErrors((p) => ({ ...p, nidPhoto: "" }));
                    }}
                  />
                  <UploadField
                    label="Shelter / Home Photo *"
                    hint="A clear photo of the space where animals will be kept"
                    error={errors.shelterPhoto}
                    onChange={(e) => {
                      update("shelterPhoto", e.target.files[0]);
                      if (errors.shelterPhoto)
                        setErrors((p) => ({ ...p, shelterPhoto: "" }));
                    }}
                  />
                  {formData.shelterType === "ngo" && (
                    <UploadField
                      label="Organization Registration Certificate *"
                      hint="Government-approved registration document"
                      error={errors.registrationCert}
                      onChange={(e) => {
                        update("registrationCert", e.target.files[0]);
                        if (errors.registrationCert)
                          setErrors((p) => ({ ...p, registrationCert: "" }));
                      }}
                    />
                  )}

                  <div className="divider" />

                  <div className="bg-base-200 rounded-xl p-4 text-sm text-base-content/70 space-y-2">
                    <p className="font-semibold text-base-content">
                      Terms & Conditions:
                    </p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>
                        All provided information is accurate and truthful.
                      </li>
                      <li>
                        The admin reserves the right to verify information at
                        any time.
                      </li>
                      <li>
                        You must ensure proper care and safety for all animals.
                      </li>
                      <li>
                        You must follow all admin guidelines and policies.
                      </li>
                    </ul>
                  </div>

                  <div data-error={!!errors.agreeTerms}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className={`checkbox checkbox-primary mt-0.5 ${errors.agreeTerms ? "border-error" : ""}`}
                        checked={formData.agreeTerms}
                        onChange={(e) => update("agreeTerms", e.target.checked)}
                      />
                      <span className="text-sm">
                        I agree to all the terms and conditions above and
                        confirm that the information provided is completely
                        accurate.
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <FieldError msg={errors.agreeTerms} />
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="btn btn-ghost flex-1"
                    onClick={prevStep}
                    disabled={loading}
                  >
                    ← Previous
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    type="button"
                    className="btn btn-primary flex-1"
                    onClick={handleNext}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>{" "}
                        Submitting...
                      </>
                    ) : (
                      "🐾 Submit Application"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-base-content/40 mt-4">
          After submission, the admin will review your application and notify
          you within 3–5 business days.
        </p>
      </div>
    </div>
  );
}

/* ── Helper components ── */

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-xs text-error font-semibold flex items-center gap-1 mt-1">
      <span>⚠</span> {msg}
    </p>
  );
}

function Field({ label, children, error }) {
  return (
    <div className="form-control w-full" data-error={!!error}>
      <label className="label pb-1">
        <span className="label-text font-medium text-sm">{label}</span>
      </label>
      {children}
      {error && <FieldError msg={error} />}
    </div>
  );
}

function UploadField({ label, hint, error, onChange }) {
  const [fileName, setFileName] = useState(null);
  return (
    <div className="form-control w-full" data-error={!!error}>
      <label className="label pb-1">
        <span className="label-text font-medium text-sm">{label}</span>
      </label>
      <label
        className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all ${error ? "border-error bg-error/5" : "border-base-300"}`}
      >
        <div className="flex flex-col items-center gap-1">
          {fileName ? (
            <>
              <span className="text-2xl">✅</span>
              <span className="text-xs text-primary font-medium">
                {fileName}
              </span>
            </>
          ) : (
            <>
              <span className="text-2xl">📁</span>
              <span className="text-xs text-base-content/50">
                Click to upload
              </span>
              {hint && (
                <span className="text-xs text-base-content/40">{hint}</span>
              )}
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => {
            if (e.target.files[0]) setFileName(e.target.files[0].name);
            onChange(e);
          }}
        />
      </label>
      {error && <FieldError msg={error} />}
    </div>
  );
}

function inputCls(error) {
  return `input input-bordered w-full ${error ? "border-error focus:border-error" : ""}`;
}
function textareaCls(error) {
  return `textarea textarea-bordered w-full ${error ? "border-error focus:border-error" : ""}`;
}
function selectCls(error) {
  return `select select-bordered w-full ${error ? "border-error focus:border-error" : ""}`;
}
