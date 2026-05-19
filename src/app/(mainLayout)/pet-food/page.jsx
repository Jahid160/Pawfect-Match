import { getPetFoods } from "@/action/server/foods"; // Assuming this is your action
import PetFoods from "@/Components/FoodsCard/FoodsCard";
import React from "react";
import { FaLeaf, FaExclamationTriangle, FaShoppingBasket } from "react-icons/fa";

const AllPetFoodsList = async () => {
  let foods = [];

  try {
    // Fetching food data from your server action
    foods = await getPetFoods();
  } catch (error) {
    console.error("Error fetching pet foods:", error);
    return (
      <div className="flex flex-col justify-center items-center gap-4 min-h-screen bg-gray-50">
        <div className="bg-red-100 p-6 rounded-full animate-bounce">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
        </div>
        <div className="text-center">
          <p className="bg-white shadow-sm px-8 py-4 border border-red-100 rounded-3xl font-bold text-red-600 text-lg">
            Unable to load the pantry!
          </p>
          <p className="mt-2 text-gray-400 text-sm italic">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  // No Foods Found State
  if (!foods || foods.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-[85vh] text-center bg-gray-50">
        <div className="bg-emerald-50 mb-8 p-10 rounded-[3rem] rotate-3 hover:rotate-0 transition-transform duration-500">
          <FaShoppingBasket className="opacity-30 text-emerald-500 text-7xl" />
        </div>
        <h3 className="font-black text-gray-900 text-4xl tracking-tighter">
          The shelves are empty!
        </h3>
        <p className="mt-4 max-w-md text-gray-500 leading-relaxed">
          We're currently restocking our premium selection. Sign up for our newsletter to be the first to know when we're back!
        </p>
        <button className="mt-8 bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-2xl font-bold text-white transition-all active:scale-95">
          Refresh Store
        </button>
      </div>
    );
  }

  return (
    <main className="bg-gray-50/50 min-h-screen">
      {/* I kept the padding logic consistent with your original page, 
          letting the PetFoods component handle the internal max-width and layout.
      */}
      <div className="pt-6 pb-24">
        <PetFoods foods={foods} />
      </div>
    </main>
  );
};

export default AllPetFoodsList;