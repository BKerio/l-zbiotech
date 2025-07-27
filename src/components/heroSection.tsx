import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import { heroSlides } from "@/data"; // Your slide data

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  type HeroSlide = {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    overrideLink2?: {
      text: string;
      to: string;
    };
  };

  const slides: HeroSlide[] = heroSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];
  const secondButtonText = currentSlideData.overrideLink2?.text || "Reach Us";
  const secondButtonPath = currentSlideData.overrideLink2?.to || "/contact";

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image Slides */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-center object-cover sm:object-fill"
              style={{ objectPosition: "center top" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Slide Number Spinner */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <motion.div
          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-[#A87C1F]"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute top-1 left-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2bd865] text-white flex items-center justify-center text-xs font-semibold">
            {currentSlide + 1}/{slides.length}
          </div>
        </motion.div>
      </div>
      {/* Indicator Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
              currentSlide === index ? "bg-[#2bd865]" : "bg-white/30"
            }`}
            animate={{ scale: currentSlide === index ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-screen px-4 sm:px-8 max-w-7xl mx-auto mt-32 sm:mt-48">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl sm:max-w-2xl"
        >
          <h1 className="text-2xl md:text-5xl lg:text-4xl font-normal text-white mb-4 drop-shadow-lg">
            {currentSlideData.title}
          </h1>
          <p className="font-serif text-xl text-gray-200 mb-8 drop-shadow-lg">
            {currentSlideData.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/services"
              className="group flex items-center text-sm sm:text-base text-white border border-white/30 rounded-full px-4 py-2 backdrop-blur bg-white/10 hover:border-white transition-all"
            >
              <span className="mr-2 group-hover:translate-x-1 transition-transform">
                Our Expertise
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 group-hover:border-white group-hover:rotate-45 transition-transform">
                <ArrowDownRight className="h-4 w-4 group-hover:scale-110" />
              </span>
            </Link>

            <Link
              to={secondButtonPath}
              className="group flex items-center text-sm sm:text-base text-white border border-white/30 rounded-full px-4 py-2 backdrop-blur bg-white/10 hover:border-white transition-all"
            >
              <span className="mr-2 group-hover:translate-x-1 transition-transform">
                {secondButtonText}
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 group-hover:border-white group-hover:rotate-45 transition-transform">
                <ArrowDownRight className="h-4 w-4 group-hover:scale-110" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
              currentSlide === index ? "bg-[#2bd865]" : "bg-white/30"
            }`}
            animate={{ scale: currentSlide === index ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
