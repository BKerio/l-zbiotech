import { useState } from "react";
import { Toaster } from "@/models/ui/toaster";
import { Toaster as Sonner } from "@/models/ui/sonner";
import { TooltipProvider } from "@/models/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/models/theme-provider";
import { ProductsProvider } from "@/contexts/ProductsContext";
import { CartProvider } from "@/hooks/use-cart";
import { FavoritesProvider } from "@/hooks/use-favorites";
import Navigation from "@/models/navigation";
import Footer from "@/models/footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import ContactPage from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Favorites from "@/pages/Favorites";
import Admin from "@/pages/Admin";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="lz-biotech-theme">
        <ProductsProvider>
          <CartProvider>
            <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Routes>
                    <Route path="/admin" element={
                      isAdminLoggedIn ? (
                        <main className="min-h-screen">
                          <AdminDashboard onLogout={() => setIsAdminLoggedIn(false)} />
                        </main>
                      ) : (
                        <Admin onLogin={() => setIsAdminLoggedIn(true)} />
                      )
                    } />
                    <Route path="/*" element={
                      <>
                        <Navigation />
                        <main className="flex-1">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                        <Footer />
                      </>
                    } />
                  </Routes>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </FavoritesProvider>
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
