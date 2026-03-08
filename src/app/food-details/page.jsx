"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Heart,
  Share2,
  Package,
  Tag,
  Wallet,
  Scale,
  ShieldCheck,
  Leaf,
  Layers3,
  Sparkles,
  Truck,
  CheckCircle2,
  Store,
} from "lucide-react";

/**
 * Later you can replace this with backend data
 * Example:
 * const food = await getFoodById(params.id)
 */
const food = {
  id: "1",
  productName: "Wild Bird Seed Blend",
  brand: "Nature Nest",
  category: "Bird",
  foodType: "Dry Food",
  price: 1200,
  discountPrice: 950,
  stock: 78,
  weight: 2,
  weightUnit: "kg",
  ageGroup: ["Adult", "All Ages"],
  ingredients:
    "Sunflower seeds, peanuts, millet, corn bits, hazelnuts, mixed grains, vitamins, minerals",
  description:
    "A premium bird seed blend made for energy, healthy feathers, and balanced daily nutrition. This mix contains natural seeds and nuts that birds love. It is carefully packed to keep freshness and quality, making it ideal for regular feeding at home or in outdoor feeders.",
  tags: "organic, vet-approved, energy-boost, daily-feed",
  inStock: true,
  featured: true,
  image:
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1400&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1400&auto=format&fit=crop",
    // "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop",
    // "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
    // "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
  ],
  nutritionHighlights: [
    { label: "Protein Support", value: "18%" },
    { label: "Healthy Fat", value: "14%" },
    { label: "Fiber", value: "10%" },
    { label: "Moisture", value: "8%" },
    { label: "Natural Mix", value: "100%" },
    { label: "Storage Life", value: "6 Months" },
  ],
  benefits: [
    { title: "Vet Approved Formula", icon: "shield" },
    { title: "Natural Ingredients", icon: "leaf" },
    { title: "Supports Daily Energy", icon: "sparkles" },
    { title: "Freshly Packed", icon: "package" },
  ],
  productFacts: [
    {
      title: "Step 1",
      subtitle: "Ingredient Selection",
      text: "We choose quality seeds, grains, and nuts for balanced daily feeding.",
    },
    {
      title: "Step 2",
      subtitle: "Nutrition Check",
      text: "Each blend is reviewed for freshness, variety, and feeding value.",
    },
    {
      title: "Step 3",
      subtitle: "Safe Packaging",
      text: "Products are packed carefully to preserve taste, aroma, and nutrition.",
    },
    {
      title: "Step 4",
      subtitle: "Ready to Serve",
      text: "Simple to store, easy to serve, and suitable for regular use.",
    },
  ],
};

export default function FoodDetailsPage() {
  const [activeImage, setActiveImage] = useState(food.image);

  const tagList = useMemo(() => {
    if (!food.tags) return [];
    return food.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, []);

  const discountPercent =
    food.discountPrice && food.price
      ? Math.round(((food.price - food.discountPrice) / food.price) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-base-100 font-['Quicksand'] text-neutral antialiased">
      {/* top navigation */}
      <nav className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/food"
          className="group flex items-center gap-2 text-neutral/60 hover:text-primary transition-all duration-300 font-bold"
        >
          <div className="p-2 rounded-full bg-base-200 group-hover:bg-primary group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:-translate-x-1">
            <ArrowLeft size={20} />
          </div>
          <span className="text-sm tracking-wide">Return to food shop</span>
        </Link>
      </nav>

      {/* header */}
      <header className="max-w-6xl mx-auto px-6 pt-6 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {food.featured && (
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-2">
              <BadgeCheck size={18} />
              Featured Product
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral tracking-tight">
            {food.productName}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-neutral/60 font-medium">
            <span className="inline-flex items-center gap-2">
              <Store size={18} className="text-primary" />
              {food.brand}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral/20" />
            <span>{food.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral/20" />
            <span>{food.foodType}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn btn-circle btn-outline border-neutral/10 hover:bg-base-200 hover:border-neutral/20 text-neutral shadow-sm">
            <Share2 size={20} />
          </button>
          <button className="btn btn-circle btn-outline border-neutral/10 hover:bg-base-200 hover:border-neutral/20 text-neutral shadow-sm">
            <Heart size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* left side */}
          <div className="lg:col-span-7 space-y-12">
            {/* gallery */}
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] bg-base-200 shadow-2xl border border-white/20">
                <Image
                  fill
                  src={activeImage}
                  alt={food.productName}
                  className="object-cover"
                  priority
                />

                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  <span className="badge badge-primary badge-lg text-white font-bold border-none px-4 py-3">
                    {food.category}
                  </span>

                  {discountPercent > 0 && (
                    <span className="badge badge-error badge-lg text-white font-bold border-none px-4 py-3">
                      -{discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {food.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative rounded-2xl overflow-hidden aspect-square border-4 transition-all duration-300 ${
                      activeImage === img
                        ? "border-primary scale-95 shadow-lg"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      fill
                      src={img}
                      alt={`${food.productName} image ${idx + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* product journey / facts */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5 bg-primary rounded-full" />
                  <h3 className="text-2xl font-bold italic">
                    Product Highlights
                  </h3>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral/40">
                  Fresh stock available
                </span>
              </div>

              <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-base-300 before:to-transparent">
                {food.productFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-base-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 bg-primary text-white">
                      <CheckCircle2 size={16} />
                    </div>

                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-[2rem] shadow-sm border border-neutral/5 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <time className="font-black text-primary text-sm uppercase tracking-tighter">
                          {fact.title}
                        </time>
                        <span className="badge badge-success badge-sm text-[9px] font-bold text-white uppercase">
                          Verified
                        </span>
                      </div>

                      <h4 className="font-bold text-neutral mb-2">
                        {fact.subtitle}
                      </h4>
                      <p className="text-sm text-neutral/70 font-medium leading-relaxed">
                        {fact.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* right side */}
          <div className="lg:col-span-5 space-y-8">
            {/* stats */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                icon={<Tag className="w-5 h-5" />}
                label="Food Type"
                value={food.foodType}
              />
              <StatCard
                icon={<Scale className="w-5 h-5" />}
                label="Weight"
                value={`${food.weight} ${food.weightUnit}`}
              />
              <StatCard
                icon={<Package className="w-5 h-5" />}
                label="Stock"
                value={food.inStock ? `${food.stock} Left` : "Out"}
              />
              <StatCard
                icon={<Wallet className="w-5 h-5" />}
                label="Price"
                value={`৳${food.discountPrice || food.price}`}
              />
              <StatCard
                icon={<Layers3 className="w-5 h-5" />}
                label="Brand"
                value={food.brand}
              />
              <StatCard
                icon={<ShieldCheck className="w-5 h-5" />}
                label="Status"
                value={food.inStock ? "Available" : "Unavailable"}
              />
            </div>

            {/* about card */}
            <div className="rounded-[2rem] border border-neutral/5 bg-white overflow-hidden shadow-xl">
              <div className="bg-secondary/20 p-6 border-b border-secondary/20">
                <h2 className="text-xl font-black text-neutral flex items-center gap-2">
                  <Package size={24} className="text-primary" />
                  About This Food
                </h2>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-neutral/70 leading-relaxed font-medium">
                  {food.description}
                </p>

                {food.ageGroup?.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral/40 mb-3">
                      Suitable For
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {food.ageGroup.map((age) => (
                        <span
                          key={age}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold"
                        >
                          {age}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tagList.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral/40 mb-3">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tagList.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-base-200 rounded-full text-[11px] font-bold text-neutral/70"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {food.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-base-200/50 rounded-2xl"
                    >
                      <div className="text-primary">
                        {benefit.icon === "shield" && (
                          <ShieldCheck className="w-5 h-5" />
                        )}
                        {benefit.icon === "leaf" && (
                          <Leaf className="w-5 h-5" />
                        )}
                        {benefit.icon === "sparkles" && (
                          <Sparkles className="w-5 h-5" />
                        )}
                        {benefit.icon === "package" && (
                          <Package className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-neutral/80">
                        {benefit.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ingredients + nutrition */}
            <div className="rounded-[2rem] bg-white border border-neutral/5 shadow-xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-black text-neutral mb-2">
                  Ingredients
                </h3>
                <p className="text-sm text-neutral/70 leading-relaxed font-medium">
                  {food.ingredients}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral/40 mb-4">
                  Nutrition & Info
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {food.nutritionHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="bg-base-200 rounded-2xl p-4"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral/40 mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm font-black text-primary">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* price card */}
            <div className="rounded-[2rem] bg-neutral p-10 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                    Price
                  </p>

                  <div className="flex items-end justify-center gap-3">
                    <h3 className="text-4xl font-black text-white leading-none">
                      ৳
                      {Number(
                        food.discountPrice || food.price,
                      ).toLocaleString()}
                    </h3>

                    {food.discountPrice && (
                      <span className="text-lg font-bold text-white/35 line-through">
                        ৳{Number(food.price).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {discountPercent > 0 && (
                    <p className="text-sm font-bold text-primary mt-2">
                      Save {discountPercent}% today
                    </p>
                  )}
                </div>

                <button className="btn btn-primary btn-lg w-full rounded-2xl text-white font-bold hover:scale-[1.02] transition-all shadow-lg border-none h-16 uppercase tracking-widest">
                  Add to Cart
                </button>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-white/5 rounded-2xl px-4 py-3">
                    <Truck size={14} />
                    Fast Delivery
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white/70 bg-white/5 rounded-2xl px-4 py-3">
                    <ShieldCheck size={14} />
                    Quality Checked
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm border border-neutral/5 hover:shadow-md transition-shadow">
      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">
        {label}
      </span>
      <span className="text-sm font-black text-neutral mt-1">{value}</span>
    </div>
  );
}
