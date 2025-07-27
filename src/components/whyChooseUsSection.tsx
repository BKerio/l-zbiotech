// src/components/WhyChooseUsSection.tsx
import React from "react";
import {
  DollarSign,
  BookOpenCheck,
  Truck,
  ShieldCheck,
} from "lucide-react";

const WhyChooseUsSection: React.FC = () => {
  const points = [
    {
      icon: DollarSign,
      title: "Affordable Quality Brands",
      description:
        "We supply reputable healthcare brands at cost-effective prices, ensuring both value and quality for our clients.",
    },
    {
      icon: BookOpenCheck,
      title: "Training & Technical Support",
      description:
        "Our team provides continual training and technical support to ensure smooth adoption and usage of medical equipment.",
    },
    {
      icon: Truck,
      title: "Prompt Delivery",
      description:
        "We guarantee quick, efficient delivery and customer-focused logistics to meet urgent and ongoing healthcare needs.",
    },
    {
      icon: ShieldCheck,
      title: "After Sales Service",
      description:
        "Our support continues after delivery with responsive after-sales care, reinforcing our long-term commitment to your success.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="flex items-center justify-center mb-12">
          <div className="relative inline-flex items-center rounded-full p-1 border border-white/30 bg-white/10 shadow-lg backdrop-blur-md">
            <span className="absolute inset-0 rounded-full border border-white/20 blur-sm opacity-60 pointer-events-none animate-pulse-slow" />
            <span className="relative inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-6 py-2 rounded-full text-lg shadow-inner">
              Why Choose L & Z Biotech?
            </span>
          </div>
        </h2>
          <p className="font-serif mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Since our establishment in 2021, we've been driven by a mission to improve healthcare access, affordability, and reliability across Kenya and beyond—with passion, innovation, and heart in every interaction.
          </p>
        </div>

        {/* Card Grid: Evenly distributed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {points.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-green-600 p-3 rounded-full text-white group-hover:bg-green-700 transition duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
