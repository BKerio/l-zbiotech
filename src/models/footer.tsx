import { Link } from "react-router-dom"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Home,
  Info,
  Package,
  ShoppingCart,
  Contact,
  Syringe,
  Stethoscope,
  FlaskConical,
  Trash2,
  Pill,
  ShieldCheck,
  UserCircle
} from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold bg-green-600 bg-clip-text text-transparent">
                L & Z Biotech Limited
              </h3>
              <p className="text-muted-foreground mt-3 text-base font-medium">
                Leading provider of high-quality medical supplies and equipment across Kenya. 
                Committed to improving healthcare outcomes through reliable products and excellent service.
              </p>
            </div>
            <div className="flex space-x-5">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-5">Quick Links</h4>
            <ul className="space-y-3 text-base font-medium">
              <li>
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <Info className="h-5 w-5" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <Contact className="h-5 w-5" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-5">Product Categories</h4>
            <ul className="space-y-3 text-base font-medium">
              <li>
                <Link to="/products?category=medical-equipment" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <Stethoscope className="h-5 w-5" />
                  <span>Medical Equipment</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=surgical-instruments" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <Syringe className="h-5 w-5" />
                  <span>Surgical Instruments</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=laboratory-supplies" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <FlaskConical className="h-5 w-5" />
                  <span>Laboratory Supplies</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=disposables" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <Trash2 className="h-5 w-5" />
                  <span>Disposables</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=pharmaceuticals" className="flex items-center gap-2 text-muted-foreground hover:text-green-600 transition-colors">
                  <Pill className="h-5 w-5" />
                  <span>Pharmaceuticals</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-5">Contact Information</h4>
            <div className="space-y-4 text-base font-medium text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-600 flex-shrink-0" />
                <span>Aryan Center Drive, F1 & F2, Opposite Panari, Off Mombasa Road, P.O Box 417-00204, Nairobi Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-600 flex-shrink-0" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-600 flex-shrink-0" />
                <span>info@lzbiotech.co.ke</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm font-medium text-muted-foreground">
            <p>© {currentYear} L & Z Biotech Limited. All rights reserved.</p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 mt-4 sm:mt-0">
              <Link to="/privacy" className="flex items-center gap-1 hover:text-primary transition-colors">
                <ShieldCheck className="h-4 w-4" />
                <span>Privacy Policy</span>
              </Link>
              <Link to="/terms" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Package className="h-4 w-4" />
                <span>Terms of Service</span>
              </Link>
              <Link to="/admin" className="flex items-center gap-1 hover:text-primary transition-colors">
                <UserCircle className="h-4 w-4" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
