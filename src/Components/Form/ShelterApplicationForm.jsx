"use client";
import { useState } from "react";

const steps = [
  { id: 1, title: "Personal Info", icon: "👤" },
  { id: 2, title: "Shelter Info", icon: "🏠" },
  { id: 3, title: "Experience", icon: "⭐" },
  { id: 4, title: "Documents", icon: "📄" },
];

export default function ShelterApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
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
    nidPhoto: null,
    shelterPhoto: null,
    registrationCert: null,
    agreeTerms: false,
  });

  const update = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="card bg-base-100 shadow-xl max-w-md w-full text-center p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Application Submitted!
          </h2>
          <p className="text-base-content/70 mb-6">
            Your shelter role application has been sent to the admin. You will
            be notified via email/SMS once the review is complete.
          </p>
          <div className="badge badge-primary badge-lg">
            Within 3–5 Business Days
          </div>
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
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-base-300 -z-0" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 -z-0"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-1 z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                  step.id < currentStep
                    ? "bg-primary text-primary-content shadow-md"
                    : step.id === currentStep
                      ? "bg-primary text-primary-content shadow-lg scale-110 ring-4 ring-primary/30"
                      : "bg-base-100 text-base-content/40 border-2 border-base-300"
                }`}
              >
                {step.id < currentStep ? "✓" : step.icon}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  step.id === currentStep
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
              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name *">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        required
                      />
                    </Field>
                    <Field label="Mobile Number *">
                      <input
                        type="tel"
                        className="input input-bordered w-full"
                        placeholder="01XXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        required
                      />
                    </Field>
                  </div>
                  <Field label="Email Address *">
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Current Address *">
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="House/flat number, street, area..."
                      rows={2}
                      value={formData.address}
                      onChange={(e) => update("address", e.target.value)}
                      required
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="City / District *">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="e.g. Dhaka, Chittagong"
                        value={formData.city}
                        onChange={(e) => update("city", e.target.value)}
                        required
                      />
                    </Field>
                    <Field label="National ID Number *">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="NID number"
                        value={formData.nidNumber}
                        onChange={(e) => update("nidNumber", e.target.value)}
                        required
                      />
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <Field label="Shelter Name *">
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Name of your shelter"
                      value={formData.shelterName}
                      onChange={(e) => update("shelterName", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Shelter Type *">
                    <select
                      className="select select-bordered w-full"
                      value={formData.shelterType}
                      onChange={(e) => update("shelterType", e.target.value)}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="home">Individual Home</option>
                      <option value="organization">Organization</option>
                      <option value="ngo">NGO / Registered Society</option>
                      <option value="rescue_group">Rescue Group</option>
                    </select>
                  </Field>
                  <Field label="Shelter Address *">
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="Full address of the shelter"
                      rows={2}
                      value={formData.shelterAddress}
                      onChange={(e) => update("shelterAddress", e.target.value)}
                      required
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Shelter City / District *">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="District name"
                        value={formData.shelterCity}
                        onChange={(e) => update("shelterCity", e.target.value)}
                        required
                      />
                    </Field>
                    <Field label="Maximum Capacity *">
                      <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="How many animals can you house?"
                        min="1"
                        value={formData.capacity}
                        onChange={(e) => update("capacity", e.target.value)}
                        required
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

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <Field label="Do you currently own or have previously owned pets? *">
                    <div className="flex gap-4 mt-1">
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

                  <Field label="Describe your animal care experience *">
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="How many years, what types of animals, where..."
                      rows={3}
                      value={formData.petExperience}
                      onChange={(e) => update("petExperience", e.target.value)}
                      required
                    />
                  </Field>

                  <Field label="Do you have rescue / animal recovery experience? *">
                    <div className="flex gap-4 mt-1">
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

                  <Field label="Do you have access to a nearby veterinarian? *">
                    <div className="flex gap-4 mt-1">
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

                  <Field label="Why do you want to become a shelter? *">
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="Share your motivation and goals..."
                      rows={3}
                      value={formData.motivation}
                      onChange={(e) => update("motivation", e.target.value)}
                      required
                    />
                  </Field>
                </div>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="alert bg-primary/10 border-primary/20 text-sm mb-2">
                    <span>
                      📋 All documents must be clear and legible. JPG, PNG or
                      PDF files are accepted.
                    </span>
                  </div>

                  <UploadField
                    label="National ID Card Photo (NID) *"
                    hint="Both front and back sides together"
                    required
                    onChange={(e) => update("nidPhoto", e.target.files[0])}
                  />

                  <UploadField
                    label="Shelter / Home Photo *"
                    hint="A clear photo of the space where animals will be kept"
                    required
                    onChange={(e) => update("shelterPhoto", e.target.files[0])}
                  />

                  {formData.shelterType === "ngo" && (
                    <UploadField
                      label="Organization Registration Certificate *"
                      hint="Government-approved registration document"
                      required
                      onChange={(e) =>
                        update("registrationCert", e.target.files[0])
                      }
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

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mt-0.5"
                      checked={formData.agreeTerms}
                      onChange={(e) => update("agreeTerms", e.target.checked)}
                      required
                    />
                    <span className="text-sm">
                      I agree to all the terms and conditions above and confirm
                      that the information provided is completely accurate.
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="btn btn-ghost flex-1"
                    onClick={prevStep}
                  >
                    ← Previous
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    type="button"
                    className="btn btn-primary flex-1"
                    onClick={nextStep}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                    disabled={!formData.agreeTerms}
                  >
                    🐾 Submit Application
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

function Field({ label, children }) {
  return (
    <div className="form-control w-full">
      <label className="label pb-1">
        <span className="label-text font-medium text-sm">{label}</span>
      </label>
      {children}
    </div>
  );
}

function UploadField({ label, hint, required, onChange }) {
  const [fileName, setFileName] = useState(null);
  return (
    <div className="form-control w-full">
      <label className="label pb-1">
        <span className="label-text font-medium text-sm">{label}</span>
      </label>
      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-base-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
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
          required={required}
          onChange={(e) => {
            if (e.target.files[0]) setFileName(e.target.files[0].name);
            onChange(e);
          }}
        />
      </label>
    </div>
  );
}
