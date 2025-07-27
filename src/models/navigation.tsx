import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  Heart,
  ShoppingCart,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/models/ui/button"
import { ThemeToggle } from "@/models/theme-toggle"
import { Badge } from "@/models/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useFavorites } from "@/hooks/use-favorites"
import { motion, AnimatePresence } from "framer-motion"
import LogoLight from "@/assets/logo(black).png"
import LogoDark from "@/assets/logo(white).png"

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"))
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const { items } = useCart()
  const { favorites } = useFavorites()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Contact Us", href: "/contact" },
  ]

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Header Container */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md shadow-sm border-b">
        {/* Top Bar (Now Always Visible) */}
        <div className="flex justify-between items-center px-4 py-2 text-xs md:text-sm bg-muted text-muted-foreground border-b">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-7 w-7 text-green-600" />
              <span>+254 708 870 793</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-7 w-7 text-green-600" />
              <span>info@lzbiotech.co.ke</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-green-600 transition">
                <Icon className="h-7 w-7" />
              </a>
            ))}
           <Link to="/contact" className="ml-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors">
                Talk to Us Today
           </Link>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="px-4 md:px-6 max-w-7xl mx-auto py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={isDark ? LogoDark : LogoLight}
                alt="Logo"
                className={`transition-all duration-300 ${
                  scrolled ? "h-12" : "h-10"
                } object-contain`}
              />
              <span className="sr-only">L & Z Biotech</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-4">
                <Link to="/favorites" className="relative">
                  <Heart className="h-5 w-5" />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 text-[10px] px-1 rounded-full">
                      {favorites.length}
                    </Badge>
                  )}
                </Link>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 text-[10px] px-1 rounded-full">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
                <ThemeToggle />
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="h-8 text-xs px-3">
                    Admin
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-muted transition"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer below fixed header */}
      <div className="h-[130px]" />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background z-50 px-6 pt-4 pb-10 overflow-auto"
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={isDark ? LogoDark : LogoLight}
                  alt="Logo"
                  className="h-8 object-contain"
                />
              </Link>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-medium transition ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Icons */}
            <div className="flex items-center gap-6 pt-6 border-t mt-6">
              <Link to="/favorites" className="relative">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 text-[10px] px-1 rounded-full">
                    {favorites.length}
                  </Badge>
                )}
              </Link>
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 text-[10px] px-1 rounded-full">
                    {totalItems}
                  </Badge>
                )}
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-sm hover:text-primary"
              >
                Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
