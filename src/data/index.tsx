// --- HERO SLIDES DATA ---
import Image1 from "@/assets/image-1.png"
import Image2 from "@/assets/image-2.png"
import Image3 from "@/assets/image-3.png"

export const heroSlides = [
  {
    id: 1,
    title: "L&Z Biotech – African Excellence in Healthcare",
    subtitle:
      "We champion African-led pharmaceutical innovation to enhance institutional resilience and transform community health systems.",
    image: Image1,
  },
  {
    id: 2,
    title: "Rooted in Africa, Powered by Science",
    subtitle:
      "L&Z Biotech applies data-driven methods, regulatory rigor, and sustainable practices to craft world-class healthcare solutions.",
    image: Image2,
  },
  {
    id: 3,
    title: "From Africa to the World: Building Health Equity",
    subtitle:
      "Our biotech initiatives empower local talent and amplify impact, setting new standards in equitable pharmaceutical development.",
    image: Image3,
    overrideLink2: {
      text: "Explore Our Vision",
      to: "/about",
    },
  },
];

export const cardHoverVariant = {
  rest: {
    y: 0,
    boxShadow:
      "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)",
    scale: 1,
  },
  hover: {
    y: -8,
    boxShadow:
      "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)",
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};




