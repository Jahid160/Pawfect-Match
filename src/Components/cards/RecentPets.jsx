import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { getPets } from "@/action/server/pets";
import { PetCard } from "./Petcarts"; 

const RecentPets = async () => {
  let pets = [];
  try {
    const allPets = await getPets();
    pets = Array.isArray(allPets) ? allPets.slice(0, 8) : [];
  } catch (error) {
    console.error("Recent pets fetch error:", error);
  }

  if (pets.length === 0) return null;

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="z-10 relative mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-3xl">
            {/* Unified Premium Badge Style */}
            <div className="inline-flex items-center gap-2 bg-orange-50 mb-6 px-4 py-2 border border-orange-100 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]">
              <span className="relative flex w-1.5 h-1.5">
                <span className="inline-flex absolute bg-orange-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
                <span className="inline-flex relative bg-orange-500 rounded-full w-1.5 h-1.5"></span>
              </span>
              New Arrivals
            </div>

            <h2 className="font-black text-slate-900 text-5xl md:text-6xl leading-[0.95] tracking-[-0.04em]">
              Recent <span className="text-orange-500">Friends</span> <br />
              Waiting for Home
            </h2>
          </div>

          <Link
            href="/all-pets"
            className="group flex items-center gap-3 bg-slate-900 hover:bg-orange-500 shadow-slate-100 shadow-xl hover:shadow-orange-200 px-10 py-5 rounded-2xl font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all hover:-translate-y-1 duration-500 transform"
          >
            View All Pets
            <FaLongArrowAltRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="gap-x-8 gap-y-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pets.map((pet) => (
            <PetCard key={pet._id?.toString() || pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPets;