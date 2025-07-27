// Home.tsx
import React, { useEffect } from "react";
import HeroSection from "@/components/heroSection";
// import PartnersSection from "@/components/PartnersSection";
//import TestimonialsSection from "@/components/TestimonialsSection";
// import CertificationsSection from "@/components/CertificationSection";
import WhyChooseUsSection from "@/components/whyChooseUsSection";
import PartnersSection from "@/components/ourPartners";
import FeaturedProducts from "@/components/featuredProducts";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <main> 
      <HeroSection />
      <WhyChooseUsSection />
       <FeaturedProducts />
      <PartnersSection />
      {/* Uncomment the following sections when ready */}
      {/* <PartnersSection />
      {/* <CertificationsSection />
      <ServicesSection />
      <TestimonialsSection /> */}
    </main>
  );
};

export default Home;
