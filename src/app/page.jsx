import Banner from "@/Components/home/Banner";
import WhyChooseUs from "@/Components/home/WhyChooseUs";
import PetCategories from "@/Components/home/PetCategories";
import RecentPets from "@/Components/cards/RecentPets";
import HowItWorks from "@/Components/home/HowItWorks";
import VaccinationSection from "@/Components/home/VaccinationSection";
import InteractivePetFood from "@/Components/home/InteractivePetFood";
import PetAccessoriesSection from "@/Components/home/PetAccessoriesSection";
import ExpertSection from "@/Components/ExpertSection/ExpertSection";
import SuccessStories from "@/Components/home/SuccessStories";
import OurSponsor from "@/Components/home/OurSponsor";
import Newsletter from "@/Components/home/Newsletter";
import FAQSection from "@/Components/home/FAQSection";

const mainPage = () => {
  return (
    <div className="space-y-10 lg:space-y-24 pb-20">
      <Banner />

      <WhyChooseUs />

      <PetCategories />
      <RecentPets />

      <HowItWorks />

      <VaccinationSection />
      <PetAccessoriesSection />
      <InteractivePetFood />
      

      <ExpertSection />
      <SuccessStories />

      <OurSponsor />
      <FAQSection></FAQSection>

      <Newsletter />
    </div>
  );
};

export default mainPage;