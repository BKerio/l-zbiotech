import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Phone,
  CheckCircle,
  Loader2,
  ListTree,
} from "lucide-react";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_7ngjqao",
        "template_3ai7sh9",
        formState,
        "dkOuRFyiVG6XXk34v"
      );
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      }, 2000);
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-white to-white/50 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-xl p-8">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-[#A87C1F] mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We'll be in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className={`absolute left-12 transition-all duration-300 pointer-events-none 
                    ${
                      focusedField === "name" || formState.name
                        ? "-top-4 text-sm text-green-600"
                        : "top-2 text-gray-400 dark:text-gray-500"
                    }`}
                >
                  Name
                </label>
                <User className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-200 dark:border-gray-600 focus:border-[#A87C1F] dark:focus:border-[#A87C1F] bg-transparent text-gray-800 dark:text-gray-100 transition-colors duration-300 outline-none"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-12 transition-all duration-300 pointer-events-none 
                    ${
                      focusedField === "email" || formState.email
                        ? "-top-4 text-sm text-[#A87C1F]"
                        : "top-2 text-gray-400 dark:text-gray-500"
                    }`}
                >
                  Email
                </label>
                <Mail className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-200 dark:border-gray-600 focus:border-[#A87C1F] dark:focus:border-[#A87C1F] bg-transparent text-gray-800 dark:text-gray-100 transition-colors duration-300 outline-none"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <label
                  htmlFor="phone"
                  className={`absolute left-12 transition-all duration-300 pointer-events-none 
                    ${
                      focusedField === "phone" || formState.phone
                        ? "-top-4 text-sm text-[#A87C1F]"
                        : "top-2 text-gray-400 dark:text-gray-500"
                    }`}
                >
                  Phone
                </label>
                <Phone className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-200 dark:border-gray-600 focus:border-[#A87C1F] dark:focus:border-[#A87C1F] bg-transparent text-gray-800 dark:text-gray-100 transition-colors duration-300 outline-none"
                />
              </div>

              {/* Service Dropdown */}
              <div className="relative">
                <label
                  htmlFor="service"
                  className={`absolute left-12 transition-all duration-300 pointer-events-none 
                    ${
                      focusedField === "service" || formState.service
                        ? "-top-4 text-sm text-[#A87C1F]"
                        : "top-2 text-gray-400 dark:text-gray-500"
                    }`}
                >
                  Service
                </label>
                <ListTree className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" size={20} />
                <select
                  id="service"
                  name="service"
                  required
                  value={formState.service}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("service")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full appearance-none pl-12 pr-4 py-3 border-b-2 border-gray-200 dark:border-gray-600 focus:border-[#A87C1F] dark:focus:border-[#A87C1F] bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300 outline-none rounded-md"
                >
                  <option value="" disabled className="text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-700">
                    Select a Service
                  </option>
                  <option value="Project Management">Project Management</option>
                  <option value="Monitoring, Evaluation, Research & Learning (MERL)">
                    Monitoring, Evaluation, Research & Learning (MERL)
                  </option>
                  <option value="Organizational Development">Organizational Development</option>
                  <option value="Other Services">Other Services</option>
                </select>
              </div>

              {/* Message */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={`absolute left-12 transition-all duration-300 pointer-events-none 
                    ${
                      focusedField === "message" || formState.message
                        ? "-top-4 text-sm text-[#A87C1F]"
                        : "top-2 text-gray-400 dark:text-gray-500"
                    }`}
                >
                  Message
                </label>
                <MessageSquare
                  className="absolute top-3 left-3 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formState.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 border-b-2 border-gray-200 dark:border-gray-600 focus:border-[#A87C1F] dark:focus:border-[#A87C1F] bg-transparent text-gray-800 dark:text-gray-100 resize-none h-32 transition-colors duration-300 outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
