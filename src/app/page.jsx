import AdoptionProcess from "@/Components/home/AdoptionProcess";
import Banner from "@/components/home/Banner";
import FeaturedPets from "@/Components/home/FeaturedPets";
import PetCategories from "@/Components/home/PetCategories";
import PetSearch from "@/Components/home/PetSearch";
import SuccessStories from "@/Components/home/SuccessStories";
import React from "react";

const mainPage = () => {
  return (
    <div className="space-y-5">
      <section>
        <Banner></Banner>
        <PetCategories></PetCategories>
        <FeaturedPets></FeaturedPets>
        <SuccessStories></SuccessStories>
        <PetSearch></PetSearch>
        <AdoptionProcess></AdoptionProcess>
      </section>
    </div>
  );
};

export default mainPage;
