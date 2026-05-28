import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductSection from "@/components/ProductSection";
import MarqueeText from "@/components/MarqueeText";
import ProductsSection from "@/components/sections/ProductsSection";
import PromoBanner from "@/components/PromoBanner";
import FlavorsSection from "@/components/FlavorsSection";
import OffersSection from "@/components/OffersSection";
import GallerySection from "@/components/GallerySection";
import SpecialProductSection from "@/components/SpecialProductSection";
import FAQSection from "@/components/FAQSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.webp";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <Hero />
    <AboutSection />
    <ProductSection />
    <MarqueeText />
    <ProductsSection />
    <PromoBanner />
    <FlavorsSection />
    <OffersSection />
    <GallerySection />
    <SpecialProductSection />
    <FAQSection />

    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-6 flex justify-center">
          <img
            src={logo}
            alt="Luz de Rosa"
            className="h-96 md:h-[32rem] lg:h-[40rem] w-auto object-contain"
            loading="lazy"
          />
      </div>
    </section>

    <Footer />
    <WhatsAppButton number="1125419191" />
  </div>
);

export default Index;
