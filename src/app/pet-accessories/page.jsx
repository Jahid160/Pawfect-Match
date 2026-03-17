import { getPetAccessories } from "@/action/server/accessories";
import React from "react";
import { FaExclamationTriangle, FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";
import AllPetAccessoriesList from "@/components/AccessoriesCard/AllPetAccessoriesList";

export const metadata = {
  title: "Accessories Store | Pawfect Match",
};

const PetAccessoriesPage = async () => {
  let accessories = [];
  let errorOccurred = false;

  try {
    accessories = await getPetAccessories();
  } catch (err) {
    console.error("Error fetching accessories:", err);
    errorOccurred = true;
  }

  if (errorOccurred) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 bg-gray-50 min-h-screen">
        <div className="bg-red-100 p-6 rounded-full animate-bounce">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
        </div>
        <div className="font-sans text-center">
          <p className="bg-white shadow-sm px-8 py-4 border border-red-100 rounded-3xl font-bold text-red-600 text-lg">
            Unable to load the accessories store!
          </p>
          <p className="mt-2 text-gray-400 text-sm italic">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  if (!accessories || accessories.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-[85vh] font-sans text-center">
        <div className="bg-orange-50 mb-8 p-10 rounded-[3rem] rotate-3 hover:rotate-0 transition-transform duration-500">
          <FaShoppingBasket className="opacity-30 text-orange-500 text-7xl" />
        </div>
        <h3 className="font-black text-gray-900 text-4xl tracking-tighter">
          The accessory shelf is empty!
        </h3>
        <p className="mt-4 max-w-md text-gray-500 leading-relaxed">
          We are currently organizing our premium collection of toys and gear. Stay tuned for new arrivals!
        </p>
        <Link
          href="/pet-accessories"
          className="inline-block bg-orange-600 hover:bg-orange-700 mt-8 px-8 py-3 rounded-2xl font-bold text-white active:scale-95 transition-all"
        >
          Refresh Store
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-gray-50/50 min-h-screen">
      <AllPetAccessoriesList accessories={accessories} />
    </main>
  );
};

export default PetAccessoriesPage;