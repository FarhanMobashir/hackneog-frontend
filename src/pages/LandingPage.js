import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { PricingSection } from "../components/PricingSection";
import { PricingPlan } from "../constants/PricingPlan";
import heroImage from "../assets/like.svg";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeroSection
        title="Taking interview has never been this easy"
        subtitle="Try quick-i to take tech interview very easily and you know it's free forever"
        imageUrl={heroImage}
        buttonText="Create Now +"
        buttonOnClick={() => navigate("/create")}
      />
      <PricingSection sectionTitle="Pricing" pricingPlan={PricingPlan} />
    </div>
  );
};
