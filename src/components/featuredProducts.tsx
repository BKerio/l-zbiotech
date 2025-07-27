// src/components/FeaturedProducts.tsx
import { useNavigate } from "react-router-dom"
import {
  Stethoscope,
  Syringe,
  FlaskConical,
  Trash2,
  Pill,
  ArrowRight,
  ArrowDownRight,
} from "lucide-react"

const featuredCategories = [
  {
    title: "Medical Equipment",
    category: "medical-equipment",
    icon: <Stethoscope className="h-8 w-8 text-green-600" />,
  },
  {
    title: "Surgical Instruments",
    category: "surgical-instruments",
    icon: <Syringe className="h-8 w-8 text-green-600" />,
  },
  {
    title: "Laboratory Supplies",
    category: "laboratory-supplies",
    icon: <FlaskConical className="h-8 w-8 text-green-600 " />,
  },
  {
    title: "Disposables",
    category: "disposables",
    icon: <Trash2 className="h-8 w-8 text-green-600" />,
  },
  {
    title: "Pharmaceuticals",
    category: "pharmaceuticals",
    icon: <Pill className="h-8 w-8 text-green-600" />,
  },
]

export default function FeaturedProducts() {
  const navigate = useNavigate()

  return (
    <section className="bg-muted/40 dark:bg-background py-16 md:py-24 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="flex items-center justify-center mb-12">
            <div className="relative inline-flex items-center rounded-full p-1 border border-white/30 bg-white/10 shadow-lg backdrop-blur-md">
              <span className="absolute inset-0 rounded-full border border-white/20 blur-sm opacity-60 pointer-events-none animate-pulse-slow" />
              <span className="relative inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-6 py-2 rounded-full text-lg shadow-inner">
                Featured Products
              </span>
            </div>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore curated categories of our top medical supplies and equipment.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredCategories.map((item, index) => (
            <div
              key={index}
              className="group rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="p-6 flex flex-col items-start flex-grow">
                <div className="mb-4 bg-primary/10 p-3 rounded-lg">{item.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 capitalize">
                  {item.category.replace("-", " ")}
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate(`/products?category=${item.category}`)}
                  className="inline-flex items-center justify-center w-full text-sm font-medium h-10 px-4 py-2 rounded-md bg-green-600 text-primary-foreground hover:bg-green-700 transition-colors"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => navigate("/products")}
            className="group inline-flex items-center rounded-full border border-white/20 bg-green-600 px-8 py-3 text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-green-700 shadow-lg text-lg"
          >
            <span className="mr-3 transform transition-transform duration-300 group-hover:translate-x-1">
              Explore All Products
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/30 transition-all duration-300 group-hover:rotate-45">
              <ArrowDownRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
