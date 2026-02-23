import Petcarts from "@/components/cards/Petcarts";
import Petdetailscart from "@/components/cards/Petdetailscart";
import AdoptionProcess from "@/components/home/AdoptionProcess";
import Banner from "@/components/home/Banner";
import OurSponsor from "@/components/home/OurSponsor";
import PetCategories from "@/components/home/PetCategories";
import PetSearch from "@/components/home/PetSearch";
import SuccessStories from "@/components/home/SuccessStories";



const mainPage = () => {
  return (
    <div className="space-y-5">
      <section>
        <Banner></Banner>
        <PetCategories></PetCategories>
        <Petcarts></Petcarts>
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
