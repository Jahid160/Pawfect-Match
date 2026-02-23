
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


const page = () => {
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

<<<<<<< HEAD
export default page;
=======
export default mainPage;
>>>>>>> bbf26457aea57d130cc7000cf15590fb6d319d5d
