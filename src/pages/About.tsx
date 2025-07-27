import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  Award,
  Clock,
  Settings,
  Users,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

// Counter Component
const Counter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });

  useEffect(() => {
    let start = 0;
    let endVal = end;
    let duration = 1000;
    let increment = endVal / (duration / 10);

    let animationFrame: NodeJS.Timeout;

    if (inView) {
      setCount(0);
      animationFrame = setInterval(() => {
        start += increment;
        if (start >= endVal) {
          clearInterval(animationFrame);
          setCount(endVal);
        } else {
          setCount(Math.floor(start));
        }
      }, 10);
    }

    return () => clearInterval(animationFrame);
  }, [inView, end]);

  return (
    <div
      ref={ref}
      className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
    >
      <h3 className="text-4xl font-bold text-green-600 dark:text-green-400">
        {count.toLocaleString()}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">{label}</p>
    </div>
  );
};

// Real-Time Counter Section
const RealtimeCounters: React.FC = () => {
  const [scrollKey, setScrollKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollKey((prev) => prev + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="flex items-center justify-center mb-12">
              <div className="relative inline-flex items-center rounded-full p-1 border border-white/30 bg-white/10 shadow-lg backdrop-blur-md">
                <span className="absolute inset-0 rounded-full border border-white/20 blur-sm opacity-60 pointer-events-none animate-pulse-slow" />
                <span className="relative inline-block bg-green-600 text-white font-bold px-6 py-2 rounded-full text-lg shadow-inner hover:from-orange-600 hover:to-red-700 transition-all duration-300">
                  Our Impact in Numbers
                </span>
              </div>
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          key={scrollKey}
        >
          <Counter end={2500} label="Products Delivered" />
          <Counter end={100} label="Satisfied Clients" />
          <Counter end={5} label="Years of Experience" />
          <Counter end={20} label="Healthcare Partners" />
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-green-600 text-black dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-3xl font-semibold mb-6">
              L and Z Biotech Limited
            </h1>
            <p className="text-xl text-black dark:text-white">
              We're a team of passionate IT experts dedicated to helping
              businesses leverage technology for growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-5xl mx-auto p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl text-center"
          >
            <h2 className="flex items-center justify-center mb-12">
              <div className="relative inline-flex items-center rounded-full p-1 border border-white/30 bg-white/10 shadow-lg backdrop-blur-md">
                <span className="absolute inset-0 rounded-full border border-white/20 blur-sm opacity-60 pointer-events-none animate-pulse-slow" />
                <span className="relative inline-block bg-green-600 text-white font-bold px-6 py-2 rounded-full text-lg shadow-inner hover:from-orange-600 hover:to-red-700 transition-all duration-300">
                  Our Story
                </span>
              </div>
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-left">
              <p>
                L &amp; Z Biotech Limited is a leading medical supplies and
                pharmaceutical company based in Nairobi, Kenya. We are dedicated
                to refining healthcare access and quality across East Africa by
                providing high-quality, innovative, and affordable medical
                products.
              </p>
              <p>
                With a strong commitment to exceptional customer service, we aim
                to empower healthcare providers and foster healthier communities
                through reliable and trusted solutions.
              </p>
              <p>
                At L &amp; Z Biotech Limited, we prioritize customer
                satisfaction, embrace innovation, and uphold integrity in
                everything we do.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="flex items-center justify-center mb-12">
              <div className="relative inline-flex items-center rounded-full p-1 border border-white/30 bg-white/10 shadow-lg backdrop-blur-md">
                <span className="absolute inset-0 rounded-full border border-white/20 blur-sm opacity-60 pointer-events-none animate-pulse-slow" />
                <span className="relative inline-block bg-green-600 text-white font-bold px-6 py-2 rounded-full text-lg shadow-inner hover:from-orange-600 hover:to-red-700 transition-all duration-300">
                  Our Values as L and Z Biotech Limited
                </span>
              </div>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: <Award />,
                title: "Respect",
                desc: "We treat everyone with dignity, value diverse perspectives, and foster a culture of mutual respect.",
              },
              {
                icon: <Users />,
                title: "Integrity",
                desc: "We uphold honesty and transparency, building trust through ethical practices and accountability.",
              },
              {
                icon: <Settings />,
                title: "Value",
                desc: "We deliver quality and value in all our products and services, ensuring our clients’ satisfaction and success.",
              },
              {
                icon: <Clock />,
                title: "Empowerment",
                desc: "We empower our team and clients to achieve their full potential through support, training, and opportunity.",
              },
              {
                icon: <Award />,
                title: "Relationship",
                desc: "We build lasting relationships with our clients and partners, grounded in trust, collaboration, and shared success.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  {React.cloneElement(item.icon, {
                    className: "h-8 w-8 text-green-600 dark:text-green-400",
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="flex items-center justify-center mb-12">
              <div className="relative inline-flex items-center rounded-full p-1 border border-white/30 bg-white/10 shadow-lg backdrop-blur-md">
                <span className="absolute inset-0 rounded-full border border-white/20 blur-sm opacity-60 pointer-events-none animate-pulse-slow" />
                <span className="relative inline-block bg-green-600 text-white font-bold px-6 py-2 rounded-full text-lg shadow-inner hover:from-orange-600 hover:to-red-700 transition-all duration-300">
                  Our Mission & Vision
                </span>
              </div>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              What drives L and Z Biotech Limited forward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our mission is to ensure our clients are happy with our excellent
                services and the quality of our goods.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Collaborating with Health Care Providers to positively impact Public
                Health, Safety and Wellness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 👇 Real-Time Counters Section */}
      <RealtimeCounters />

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Discover how L and Z Biotech Limited can support your healthcare
                needs with quality products and dedicated service.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="group flex items-center justify-center rounded-full border border-green-500 bg-green-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-green-600 hover:border-green-600"
                >
                  <span className="mr-2 transform transition-transform duration-300 group-hover:translate-x-1">
                    Talk To Us
                  </span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/50 transition-all duration-300 group-hover:border-white group-hover:rotate-45">
                    <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
                  </span>
                </Link>
                <Link
                  to="/products"
                  className="group flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-500 px-6 py-2 text-gray-800 dark:text-gray-300 transition-colors duration-300 hover:border-green-600 hover:text-green-600"
                >
                  <span className="mr-2 transform transition-transform duration-300 group-hover:translate-x-1">
                    Explore Our Products
                  </span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-400 dark:border-gray-500 transition-all duration-300 group-hover:border-green-600 group-hover:rotate-45">
                    <ArrowDownRight className="h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110 group-hover:text-green-500" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
