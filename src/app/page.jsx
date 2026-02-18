import Banner from "@/components/home/Banner";
import FeaturedPets from "@/Components/home/FeaturedPets";
import PetCategories from "@/Components/home/PetCategories";
import React from "react";

const mainPage = () => {
  return (
    <div className="space-y-5">
      <section>
        <Banner></Banner>
        <PetCategories></PetCategories>
        <FeaturedPets></FeaturedPets>
      </section>
    </div>
  );
};

export default mainPage;
