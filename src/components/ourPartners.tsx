// src/components/PartnersSection.tsx
import React, { useLayoutEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const partners = [
  { name: "Ministry of Health (KEMSA, National & County Hospitals)", icon: "🏥" },
  { name: "Government Parastatals, Agencies & Academic Institutions", icon: "🏛️" },
  { name: "Non-Governmental Organisations (NGOs)", icon: "🤝" },
  { name: "Faith-Based Organisations (MEDS & Mission Hospitals)", icon: "🙏" },
  { name: "Private Hospitals", icon: "🩺" },
  { name: "Industrial Clinics", icon: "🏭" },
  { name: "Retail Pharmacies", icon: "💊" },
  { name: "Private Clinics (Dispensing Doctors)", icon: "👨‍⚕️" },
  { name: "OTC Channels and Supermarkets", icon: "🛒" }
];

const PartnersSection: React.FC = () => {
  const itemWidth = 300;
  const gap = 24;
  const cardFullWidth = itemWidth + gap;

  const extendedPartners = partners.concat(partners); // for seamless loop
  const totalOriginalWidth = partners.length * cardFullWidth;

  const controls = useAnimation();
  const cycleDuration = 60;

  const startAnimation = () => {
    controls.start({
      x: [0, -totalOriginalWidth],
      transition: {
        duration: cycleDuration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  };

  useLayoutEffect(() => {
    startAnimation();
  }, []);

  const handleMouseEnter = () => controls.stop();
  const handleMouseLeave = () => startAnimation();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <h2 className="flex items-center justify-center mb-12">
          <div className="relative inline-flex items-center rounded-full p-1 border border-white/30 bg-white/10 shadow-lg backdrop-blur-md">
            <span className="absolute inset-0 rounded-full border border-white/20 blur-sm opacity-60 pointer-events-none animate-pulse-slow" />
            <span className="relative inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-6 py-2 rounded-full text-lg shadow-inner">
              Our Trusted Partners
            </span>
          </div>
        </h2>

        {/* Carousel */}
        <div
          className="relative overflow-hidden py-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ height: 200 }}
        >
          <motion.div
            className="flex items-center"
            style={{
              width: `${totalOriginalWidth * 2}px`,
              gap: `${gap}px`
            }}
            animate={controls}
          >
            {extendedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                style={{
                  width: itemWidth,
                  marginRight: gap,
                  flexShrink: 0
                }}
                className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center text-center px-6 py-8"
              >
                <div className="text-5xl mb-4">{partner.icon}</div>
                <p className="font-semibold text-md leading-relaxed">{partner.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-serif mt-20 text-center text-gray-700 dark:text-gray-300 italic text-lg"
        >
          <p className="max-w-2xl mx-auto border-t border-b border-gray-400 dark:border-gray-600 py-4 px-6 rounded-md">
            We collaborate with public and private partners to deliver{" "}
            <strong className="text-gray-900 dark:text-white">trusted, life-enhancing health solutions</strong>{" "}
            to communities across Kenya and beyond.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
