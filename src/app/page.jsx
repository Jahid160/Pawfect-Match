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
import FAQSection from "@/components/home/FAQSection";
import ImpactSection from "@/components/home/ImpactSection";
import NewsletterGame from "@/components/home/NewsletterGame";

const mainPage = () => {
  return (
    <div className="space-y-8 lg:space-y-24 pb-20">
      <Banner />

      <ImpactSection />

      <RecentPets />
      <PetCategories />

      <WhyChooseUs />
      <HowItWorks />

      <VaccinationSection />
      <PetAccessoriesSection />
      <InteractivePetFood />

      <ExpertSection />
      <SuccessStories />

      <OurSponsor />
      <FAQSection />

      {/* <Newsletter /> */}
      <NewsletterGame />
    </div>
  );
};

export default mainPage;