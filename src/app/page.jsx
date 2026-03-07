import Petcarts from "@/components/cards/Petcarts";
import RecentPets from "@/components/cards/RecentPets";
import ExpertSection from "@/components/ExpertSection/ExpertSection";
import Banner from "@/components/home/Banner";
import FAQPage from "@/components/home/FAQPage";
import HowItWorks from "@/components/home/HowItWorks";
import InteractivePetFood from "@/components/home/InteractivePetFood";
import Newsletter from "@/components/home/Newsletter";
import OurSponsor from "@/components/home/OurSponsor";
import PetCategories from "@/components/home/PetCategories";
import SuccessStories from "@/components/home/SuccessStories";
import WhyChooseUs from "@/components/home/WhyChooseUs";


const mainPage = () => {
  return (
    <div className="space-y-20">
      <section>
        <Banner></Banner>
        <WhyChooseUs></WhyChooseUs>
        <PetCategories></PetCategories>
        <RecentPets></RecentPets>
        <HowItWorks></HowItWorks>
        <ExpertSection></ExpertSection>
        <InteractivePetFood></InteractivePetFood>
        <SuccessStories></SuccessStories>
        <OurSponsor></OurSponsor>
        <Newsletter></Newsletter>
      </section>

     

    </div>
  );
};

export default mainPage;
