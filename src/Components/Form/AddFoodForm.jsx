"use client";

import { useState } from "react";

const PET_CATEGORIES = ["Dog", "Cat", "Bird", "Fish", "Rabbit", "Hamster", "Other"];
const FOOD_TYPES = ["Dry Food", "Wet Food", "Raw Food", "Treats & Snacks", "Supplements", "Freeze-Dried"];
const WEIGHT_UNITS = ["g", "kg", "oz", "lb"];
const AGE_GROUPS = ["Puppy / Kitten", "Adult", "Senior", "All Ages"];
const SECTIONS = [
  { id: "basic",   label: "Basic Info", icon: "🏷️" },
  { id: "details", label: "Details",    icon: "📦" },
  { id: "pricing", label: "Pricing",    icon: "💰" },
  { id: "media",   label: "Media",      icon: "📸" },
];

export default function AddFoodPage() {
  const [form, setForm] = useState({
    productName: "", brand: "", category: "", foodType: "",
    price: "", discountPrice: "", stock: "", weight: "",
    weightUnit: "kg", ageGroup: [], ingredients: "",
    description: "", tags: "", inStock: true, featured: false,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted]       = useState(false);
  const [loading, setLoading]           = useState(false);
  const [errors, setErrors]             = useState({});
  const [activeSection, setActiveSection] = useState("basic");

  /* ── handlers ── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "ageGroup") {
      setForm(p => ({
        ...p,
        ageGroup: checked
          ? [...p.ageGroup, value]
          : p.ageGroup.filter(a => a !== value),
      }));
    } else if (type === "checkbox") {
      setForm(p => ({ ...p, [name]: checked }));
    } else {
      setForm(p => ({ ...p, [name]: value }));
    }
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.productName.trim())                             e.productName  = "Product name is required";
    if (!form.brand.trim())                                   e.brand        = "Brand is required";
    if (!form.category)                                       e.category     = "Select a pet category";
    if (!form.foodType)                                       e.foodType     = "Select a food type";
    if (!form.price || isNaN(form.price) || +form.price <= 0) e.price        = "Enter a valid price";
    if (!form.stock || isNaN(form.stock) || +form.stock <  0) e.stock        = "Enter valid stock quantity";
    if (!form.weight|| isNaN(form.weight)|| +form.weight<= 0) e.weight       = "Enter valid weight";
    if (!form.description.trim())                             e.description  = "Description is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); setActiveSection("basic"); return; }

    setLoading(true);
    // ── replace this block with your real API call, e.g.:
    // await fetch("/api/foods", { method: "POST", body: JSON.stringify(form) });
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      productName: "", brand: "", category: "", foodType: "",
      price: "", discountPrice: "", stock: "", weight: "",
      weightUnit: "kg", ageGroup: [], ingredients: "",
      description: "", tags: "", inStock: true, featured: false,
    });
    setImagePreview(null);
    setSubmitted(false);
    setErrors({});
    setActiveSection("basic");
  };

  const sectionIdx = SECTIONS.findIndex(s => s.id === activeSection);
  const pct        = Math.round(((sectionIdx + 1) / SECTIONS.length) * 100);
  const discount   = form.price && form.discountPrice
    ? Math.round(((form.price - form.discountPrice) / form.price) * 100)
    : null;

  /* ── success screen ── */
  if (submitted) {
    return (
      <main className="min-h-screen bg-base-200 flex items-center justify-center p-6">
        <div className="bg-base-100 rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-black text-3xl text-neutral mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Product Added!
          </h2>
          <p className="text-neutral/60 font-semibold mb-1">{form.productName}</p>
          <p className="text-neutral/40 text-sm mb-10">Successfully listed in your store.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={handleReset} className="btn btn-primary rounded-xl px-8">
              Add Another
            </button>
            <button className="btn btn-ghost rounded-xl px-6 border border-base-300">
              View Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* ── main form ── */
  return (
    <main className="min-h-screen bg-base-200">

      {/* ── sticky header ── */}
      <header className="bg-base-100 border-b border-base-300 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-lg text-white">
              🐾
            </div>
            <div>
              <p className="text-[10px] text-neutral/40 uppercase tracking-widest font-bold">Admin Panel</p>
              <h1 className="text-lg font-black text-neutral leading-none" style={{ fontFamily: "var(--font-playfair)" }}>
                Add Pet Food
              </h1>
            </div>
          </div>
          <span className="flex items-center gap-2 text-xs text-neutral/40">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Store Online
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-16">

        {/* ── progress bar ── */}
        <div className="mb-5">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-neutral/40 font-semibold">Step {sectionIdx + 1} of {SECTIONS.length}</span>
            <span className="text-primary font-bold">{pct}% complete</span>
          </div>
          <div className="h-1.5 bg-base-300 rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* ── section tabs ── */}
        <div className="flex gap-1.5 bg-base-100 p-1.5 rounded-2xl mb-5 shadow-sm">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSection(s.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeSection === s.id
                  ? "bg-primary text-white shadow"
                  : "text-neutral/40 hover:text-neutral hover:bg-base-200"
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>

        {/* ── form ── */}
        <form onSubmit={handleSubmit} noValidate>

          {/* BASIC INFO */}
          {activeSection === "basic" && (
            <Card>
              <SectionHeading icon="🏷️" title="Basic Information" sub="Core product details" />

              <Row>
                <Field label="Product Name" required error={errors.productName}>
                  <input name="productName" value={form.productName} onChange={handleChange}
                    placeholder="e.g. Royal Canin Adult Dry Food"
                    className={inputCls(errors.productName)} />
                </Field>
                <Field label="Brand" required error={errors.brand}>
                  <input name="brand" value={form.brand} onChange={handleChange}
                    placeholder="e.g. Royal Canin"
                    className={inputCls(errors.brand)} />
                </Field>
              </Row>

              <Row>
                <Field label="Pet Category" required error={errors.category}>
                  <select name="category" value={form.category} onChange={handleChange} className={inputCls(errors.category)}>
                    <option value="">Select pet type...</option>
                    {PET_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Food Type" required error={errors.foodType}>
                  <select name="foodType" value={form.foodType} onChange={handleChange} className={inputCls(errors.foodType)}>
                    <option value="">Select food type...</option>
                    {FOOD_TYPES.map(f => <option key={f}>{f}</option>)}
                  </select>
                </Field>
              </Row>

              <Field label="Age Group">
                <div className="flex flex-wrap gap-4 pt-1">
                  {AGE_GROUPS.map(age => (
                    <label key={age} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox" name="ageGroup" value={age}
                        checked={form.ageGroup.includes(age)} onChange={handleChange}
                        className="checkbox checkbox-primary checkbox-sm"
                      />
                      <span className="text-sm font-medium text-neutral/70">{age}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Tags" hint="Comma-separated (e.g. grain-free, organic)">
                <input name="tags" value={form.tags} onChange={handleChange}
                  placeholder="grain-free, organic, vet-recommended"
                  className={inputCls()} />
              </Field>

              <div className="flex gap-8 pt-1">
                {[["inStock", "In Stock"], ["featured", "Featured Product"]].map(([name, label]) => (
                  <label key={name} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name={name} checked={form[name]} onChange={handleChange}
                      className="toggle toggle-primary toggle-sm" />
                    <span className="text-sm font-semibold text-neutral/60">{label}</span>
                  </label>
                ))}
              </div>

              <NavRow onNext={() => setActiveSection("details")} />
            </Card>
          )}

          {/* DETAILS */}
          {activeSection === "details" && (
            <Card>
              <SectionHeading icon="📦" title="Product Details" sub="Weight, stock & ingredients" />

              <Row>
                <Field label="Weight" required error={errors.weight}>
                  <div className="flex gap-2">
                    <input name="weight" type="number" value={form.weight} onChange={handleChange}
                      placeholder="500" min="0"
                      className={`${inputCls(errors.weight)} flex-1`} />
                    <select name="weightUnit" value={form.weightUnit} onChange={handleChange}
                      className={`${inputCls()} !w-20`}>
                      {WEIGHT_UNITS.map(u => <option key={u}>{u}</option>)}
                    </select>
                  </div>
                </Field>
                <Field label="Stock Quantity" required error={errors.stock}>
                  <input name="stock" type="number" value={form.stock} onChange={handleChange}
                    placeholder="100" min="0"
                    className={inputCls(errors.stock)} />
                </Field>
              </Row>

              <Field label="Ingredients" hint="List main ingredients">
                <textarea name="ingredients" value={form.ingredients} onChange={handleChange}
                  placeholder="Chicken, Brown Rice, Peas, Salmon Oil, Vitamins..."
                  rows={3} className={`${inputCls()} resize-none`} />
              </Field>

              <Field label="Product Description" required error={errors.description}>
                <textarea name="description" value={form.description} onChange={handleChange}
                  placeholder="Describe product benefits, feeding guide, special features..."
                  rows={5} className={`${inputCls(errors.description)} resize-none`} />
              </Field>

              <NavRow onBack={() => setActiveSection("basic")} onNext={() => setActiveSection("pricing")} />
            </Card>
          )}

          {/* PRICING */}
          {activeSection === "pricing" && (
            <Card>
              <SectionHeading icon="💰" title="Pricing" sub="Set your product price" />

              <Row>
                <Field label="Regular Price (BDT ৳)" required error={errors.price}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40 font-bold pointer-events-none">৳</span>
                    <input name="price" type="number" value={form.price} onChange={handleChange}
                      placeholder="0.00" min="0" step="0.01"
                      className={`${inputCls(errors.price)} pl-8`} />
                  </div>
                </Field>
                <Field label="Discount Price (BDT ৳)" hint="Leave empty if no discount">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40 font-bold pointer-events-none">৳</span>
                    <input name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange}
                      placeholder="0.00" min="0" step="0.01"
                      className={`${inputCls()} pl-8`} />
                  </div>
                </Field>
              </Row>

              {form.price && (
                <div className="bg-base-200 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-neutral/40 uppercase tracking-widest font-bold mb-1">Price Preview</p>
                    <div className="flex items-center gap-3">
                      {form.discountPrice && (
                        <span className="text-2xl font-black text-primary">
                          ৳{Number(form.discountPrice).toLocaleString()}
                        </span>
                      )}
                      <span className={`font-bold ${form.discountPrice ? "line-through text-neutral/30 text-lg" : "text-2xl text-primary"}`}>
                        ৳{Number(form.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {discount !== null && discount > 0 && (
                    <span className="bg-error/10 text-error rounded-xl px-3 py-1.5 text-sm font-black">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
              )}

              <NavRow onBack={() => setActiveSection("details")} onNext={() => setActiveSection("media")} />
            </Card>
          )}

          {/* MEDIA + SUBMIT */}
          {activeSection === "media" && (
            <Card>
              <SectionHeading icon="📸" title="Product Image" sub="Upload a clear product photo" />

              {/* image drop zone */}
              <div
                onClick={() => document.getElementById("foodImage").click()}
                className="border-2 border-dashed border-base-300 rounded-2xl p-10 text-center cursor-pointer
                           hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <input id="foodImage" type="file" accept="image/*" onChange={handleImage} className="hidden" />
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img src={imagePreview} alt="Preview"
                      className="w-44 h-44 object-cover rounded-xl shadow-lg mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl
                                    opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-semibold">Change Photo</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center
                                    mx-auto mb-4 text-3xl group-hover:bg-primary/10 transition-colors">
                      🖼️
                    </div>
                    <p className="font-semibold text-neutral/50 group-hover:text-primary transition-colors">
                      Click to upload image
                    </p>
                    <p className="text-sm text-neutral/30 mt-1">PNG, JPG, WEBP — up to 5 MB</p>
                  </>
                )}
              </div>

              {/* order summary */}
              {(form.productName || form.price) && (
                <div className="bg-base-200 rounded-2xl p-5 mt-4">
                  <p className="text-[10px] text-neutral/40 uppercase tracking-widest font-bold mb-3">Order Summary</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                    {[
                      ["Name",      form.productName],
                      ["Brand",     form.brand],
                      ["Category",  form.category],
                      ["Food Type", form.foodType],
                      ["Weight",    form.weight ? `${form.weight} ${form.weightUnit}` : ""],
                      ["Price",     form.price ? `৳${form.price}` : ""],
                      ["Stock",     form.stock ? `${form.stock} units` : ""],
                      ["Status",    form.inStock ? "✅ In Stock" : "❌ Out of Stock"],
                    ].filter(([, v]) => v).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-neutral/40 font-medium">{k}: </span>
                        <span className="text-neutral font-bold">{v}</span>
                      </div>
                    ))}
                  </div>
                  {form.ageGroup.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {form.ageGroup.map(a => (
                        <span key={a} className="bg-primary/10 text-primary/80 text-xs font-semibold
                                                  px-3 py-0.5 rounded-full">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* submit row */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button" onClick={() => setActiveSection("pricing")}
                  className="btn btn-ghost rounded-xl border border-base-300 flex-1 font-semibold"
                >
                  ← Back
                </button>
                <button
                  type="submit" disabled={loading}
                  className="btn btn-primary rounded-xl flex-[3] font-bold text-base
                             shadow-lg shadow-primary/25 disabled:opacity-70"
                >
                  {loading
                    ? <><span className="loading loading-spinner loading-sm mr-1" /> Publishing...</>
                    : "🚀 Publish Product"}
                </button>
              </div>
            </Card>
          )}

        </form>
      </div>
    </main>
  );
}

/* ────────────────────────────────────────────
   Small reusable sub-components
──────────────────────────────────────────── */

function Card({ children }) {
  return (
    <div className="bg-base-100 rounded-3xl shadow-sm p-6 sm:p-8 space-y-5
                    animate-[fadeUp_.25s_ease]">
      {children}
    </div>
  );
}

function SectionHeading({ icon, title, sub }) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-base-200">
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <h2 className="font-black text-xl text-neutral leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
          {title}
        </h2>
        <p className="text-xs text-neutral/40 font-medium">{sub}</p>
      </div>
    </div>
  );
}

function Row({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, children, required, error, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-neutral/60 flex items-center gap-1">
        {label}
        {required && <span className="text-error">*</span>}
        {hint && <span className="text-neutral/30 font-normal ml-1">— {hint}</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-error font-semibold flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function NavRow({ onBack, onNext }) {
  return (
    <div className="flex gap-3 pt-2">
      {onBack && (
        <button type="button" onClick={onBack}
          className="btn btn-ghost rounded-xl border border-base-300 font-semibold px-6">
          ← Back
        </button>
      )}
      {onNext && (
        <button type="button" onClick={onNext}
          className="btn btn-primary rounded-xl font-bold ml-auto px-8 shadow-md shadow-primary/20">
          Next →
        </button>
      )}
    </div>
  );
}

/* DaisyUI input base */
function inputCls(error) {
  return [
    "input input-bordered w-full rounded-xl font-medium text-neutral",
    "placeholder:text-neutral/25 focus:outline-primary focus:border-primary transition-colors",
    error ? "border-error focus:outline-error" : "border-base-300",
  ].join(" ");
}