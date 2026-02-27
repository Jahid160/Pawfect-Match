import Petcarts from "@/components/cards/Petcarts";
import Petdetailscart from "@/components/cards/Petdetailscart";
import Banner from "@/components/home/Banner";
import FAQPage from "@/components/home/FAQPage";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import OurSponsor from "@/components/home/OurSponsor";
import PetCategories from "@/components/home/PetCategories";
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
        <OurSponsor></OurSponsor>
        <Newsletter></Newsletter>
      </section>

      <section>
        <Petdetailscart></Petdetailscart>
        <FAQPage></FAQPage>
      </section>

    </div>
  );
};

export default mainPage;
