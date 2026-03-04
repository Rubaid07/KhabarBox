import FeaturedRestaurants from "@/components/homePage/FeaturedRestaurants";
import HeroSection from "@/components/homePage/hero/hero";
import Newsletter from "@/components/homePage/Newsletter";
import PartnerSection from "@/components/homePage/PartnerSection";
import PopularMeals from "@/components/homePage/PopularMeals";
import TrendingCuisines from "@/components/homePage/TrendingCuisines";
import StatsSection from "@/components/homePage/Stats";
import Benefits from "@/components/homePage/Benefits";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TrendingCuisines />
      <PopularMeals />
      <FeaturedRestaurants />
      <PartnerSection />
      <Benefits />
      <StatsSection />
      <Newsletter />
    </div>
  );
}
