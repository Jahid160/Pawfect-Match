
import Petcarts from '@/components/cards/Petcarts';
import Petdetailscart from '@/components/cards/Petdetailscart';
import React from 'react';
import AdoptionProcess from "@/Components/home/AdoptionProcess";
import FeaturedPets from "@/Components/home/FeaturedPets";
import OurSponsor from "@/Components/home/OurSponsor";
import PetCategories from "@/Components/home/PetCategories";
import PetSearch from "@/Components/home/PetSearch";
import SuccessStories from "@/Components/home/SuccessStories";
import Banner from '@/components/home/Banner';


const mainPage = () => {
  return (
    <div className="space-y-5">
      <section>
        <Banner></Banner>
        <PetCategories></PetCategories>
        <Petcarts></Petcarts>
        {/* <FeaturedPets></FeaturedPets> */}
        <SuccessStories></SuccessStories>
        <PetSearch></PetSearch>
        <AdoptionProcess></AdoptionProcess>
        <OurSponsor></OurSponsor>
      </section>
      
      <section>
        <Petdetailscart></Petdetailscart>
      </section>
    </div>
  );
};

export default mainPage;
