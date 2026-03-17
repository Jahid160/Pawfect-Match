import Banner from "@/components/home/Banner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PetCategories from "@/components/home/PetCategories";
import RecentPets from "@/components/cards/RecentPets";
import HowItWorks from "@/components/home/HowItWorks";
import VaccinationSection from "@/components/home/VaccinationSection";
import InteractivePetFood from "@/components/home/InteractivePetFood";
import PetAccessoriesSection from "@/components/home/PetAccessoriesSection";
import ExpertSection from "@/components/ExpertSection/ExpertSection";
import SuccessStories from "@/components/home/SuccessStories";
import OurSponsor from "@/components/home/OurSponsor";
import Newsletter from "@/components/home/Newsletter";

const mainPage = () => {
  return (
    <div className="space-y-10 lg:space-y-24 pb-20">
      <Banner />

      <WhyChooseUs />

      <PetCategories />
      <RecentPets />

      <HowItWorks />

      <VaccinationSection />

      <InteractivePetFood />
      <PetAccessoriesSection />

      <ExpertSection />
      <SuccessStories />

      <OurSponsor />

      <Newsletter />
    </div>
  );
};

export default mainPage;