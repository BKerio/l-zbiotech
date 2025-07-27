import { useEffect } from "react";
import { MapPin, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';
import ContactForm from '@/models/ui/contact-form';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      <a
        href="https://www.google.com/maps?q=Aryan+Center+Drive,+F1+%26+F2,+Opposite+Panari,+Off+Mombasa+Road,+P.O+Box+417-00204,+Nairobi+Kenya"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:underline dark:text-white"
      >
        Aryan Center Drive, F1 & F2, Opposite Panari, Off Mombasa Road, P.O Box 417-00204, Nairobi Kenya
      </a>
    ],
    color: 'text-emerald-500 dark:text-emerald-400',
  },
  {
    icon: Phone,
    title: 'General Inquiries',
    details: [
      'For general inquiries, please reach out to us at:',
      <a
        href="tel:+254725384554"
        className="text-black hover:underline dark:text-white"
      >
        +254 725 384 554
      </a>,
      <a
        href="tel:+254792187994"
        className="text-black hover:underline dark:text-white"
      >
        +254 792 187 994
      </a>,
      <a
        href="mailto:info@lzbiotech.co.ke"
        className="text-black hover:underline dark:text-white"
      >
        info@lzbiotech.co.ke
      </a>
    ],
    color: 'text-green-500 dark:text-green-400',
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', color: 'hover:text-emerald-500 dark:hover:text-emerald-400' },
  { icon: Twitter, href: '#', color: 'hover:text-blue-400 dark:hover:text-blue-300' },
  { icon: Linkedin, href: '#', color: 'hover:text-blue-700 dark:hover:text-blue-500' },
];

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white/0 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-center">
        <div className="px-4">
          <h1 className="text-5xl font-bold drop-shadow">Contact L&Z Biotech</h1>
          <p className="text-xl mt-4 max-w-2xl mx-auto">
            Have questions about L&Z Biotech? We're here to help! Reach out to us for inquiries, support, or feedback.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 transform transition hover:scale-105 hover:shadow-xl"
            >
              <div className={`${info.color} mb-4`}>
                <info.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {info.title}
              </h3>
              {info.details.map((d, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-300">{d}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg p-6 text-gray-800 dark:text-gray-200">
            <ContactForm />
          </div>

          {/* Social Links & Map */}
          <div className="lg:col-start-2 space-y-8">
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Connect With Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Follow us on social media for the latest updates and news about our medical products and services.
              </p>
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className={`text-gray-400 dark:text-gray-500 transition ${s.color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <s.icon size={24} />
                  </a>
                ))}
              </div>

              {/* Google Map Embed */}
              <div className="mt-4">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Our Location</h4>
                <div className="w-full h-[40rem] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <iframe
                    title="Our Location"
                    src="https://www.google.com/maps?q=Aryan+Center+Drive,+F1+%26+F2,+Opposite+Panari,+Off+Mombasa+Road,+P.O+Box+417-00204,+Nairobi+Kenya&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
