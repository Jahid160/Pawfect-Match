import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Trash2, MapPin, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { revalidatePath } from "next/cache";
import { getMySavedPets, removeFavoriteAction } from "@/action/userServerDash/savePetsAction";

const favorites = async() => {
const result = await getMySavedPets();
  const pets = result.data || [];

  // Remove handler
  async function handleRemove(formData) {
    "use server";
    const petId = formData.get("petId");
    await removeFavoriteAction(petId);
    revalidatePath("/dashboard/saved-pets");
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-10 font-sans">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              My <span className="text-primary italic">Favorites</span>
            </h1>
            <p className="text-slate-500 font-medium">You have {pets.length} pets in your adoption wishlist.</p>
          </div>
          <Link href="/all-pets" className="group btn btn-primary px-8 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105">
            Explore More <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Content */}
        {pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[3rem] bg-white border border-slate-100 py-32 text-center shadow-xl shadow-slate-200/50">
            <div className="bg-slate-50 p-6 rounded-full mb-6">
              <Sparkles size={48} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Your wishlist is empty</h2>
            <p className="text-slate-400 mt-2 max-w-xs mx-auto">Looks like you haven't found your perfect furry friend yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <div key={pet._id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 overflow-hidden">
                
                {/* Image Area */}
                <div className="relative h-64 w-full overflow-hidden p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                    <Image
                      fill
                      src={pet.images?.[0] || "/placeholder.jpg"}
                      alt={pet.petName}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    {/* Floating Info */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-slate-800 shadow-sm border border-white/50">
                        {pet.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Area */}
                <div className="px-7 pt-2 pb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        {pet.petName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                        <MapPin size={14} className="text-primary" />
                        <span className="text-sm font-semibold truncate">{pet.location}</span>
                      </div>
                    </div>
                    <form action={handleRemove}>
                      <input type="hidden" name="petId" value={pet._id} />
                      <button className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-colors group/btn shadow-sm">
                        <Trash2 size={20} />
                      </button>
                    </form>
                  </div>

                  {/* Features Tag */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-100">
                      {pet.gender}
                    </span>
                    <span className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-100">
                      {pet.ageYears}y old
                    </span>
                    <span className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-100">
                      {pet.breed}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link 
                    href={`/all-pets/${pet._id}`}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-bold tracking-wide transition-all hover:bg-primary hover:shadow-lg hover:shadow-primary/30"
                  >
                    View Details <ExternalLink size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default favorites;