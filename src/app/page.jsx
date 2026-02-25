import Petcarts from "@/components/cards/Petcarts";
import Petdetailscart from "@/components/cards/Petdetailscart";
import AdoptionProcess from "@/components/home/AdoptionProcess";
import Banner from "@/components/home/Banner";
import HowItWorks from "@/components/home/HowItWorks";
import OurSponsor from "@/components/home/OurSponsor";
import PetCategories from "@/components/home/PetCategories";
import PetSearch from "@/components/home/PetSearch";
import SuccessStories from "@/components/home/SuccessStories";
import WhyChooseUs from "@/components/home/WhyChooseUs";



const mainPage = () => {
  return (
    <div className="space-y-5">
      <section>
        <Banner></Banner>
        <WhyChooseUs></WhyChooseUs>
        <PetCategories></PetCategories>
        <Petcarts></Petcarts>
        <HowItWorks></HowItWorks>
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
