import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductCarousel from "@/components/ProductCarousel";
import HorizontalProductScroll from "@/components/HorizontalProductScroll";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import TrustSection from "@/components/TrustSection";
import NewsletterSection from "@/components/NewsletterSection";
import AvailablePlatforms from "@/components/AvailablePlatforms";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <HorizontalProductScroll />
        <ProductCarousel 
          title="Customer Favorites" 
          badge="Featured Products"
          subtitle="Discover our most loved skincare essentials"
        />
        <TestimonialsCarousel />
        <TrustSection />
        <NewsletterSection />
        <AvailablePlatforms />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
