import { Link } from "react-router-dom"
import { ArrowRight, Award, Users, Truck, CheckCircle, Star } from "lucide-react"
import { Button } from "@/models/ui/button"
import { Card, CardContent } from "@/models/ui/card"
import { Badge } from "@/models/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/models/ui/carousel"
import { useState, useEffect } from "react"
import type { CarouselApi } from "@/models/ui/carousel"

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  
  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=600&fit=crop",
      alt: "Medical Equipment"
    },
    {
      src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop", 
      alt: "Surgical Instruments"
    },
    {
      src: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600&h=600&fit=crop",
      alt: "Digital Thermometer"
    },
    {
      src: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&h=600&fit=crop",
      alt: "Medical Supplies"
    },
    {
      src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=600&fit=crop",
      alt: "Medical Supply Storage"
    },
    {
      src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop",
      alt: "Medical Supply Kit"
    }
  ]

  // Auto-slide effect
  useEffect(() => {
    if (!carouselApi) return

    const interval = setInterval(() => {
      carouselApi.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [carouselApi])

  // Track current slide
  useEffect(() => {
    if (!carouselApi) return

    carouselApi.on("select", () => {
      setCurrentImageIndex(carouselApi.selectedScrollSnap())
    })
  }, [carouselApi])

  const highlights = [
    {
      icon: Award,
      title: "Certified Quality",
      description: "ISO 13485 certified medical supplies ensuring the highest safety standards"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced healthcare professionals providing technical support and guidance"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery within Nairobi and next-day delivery nationwide"
    },
    {
      icon: CheckCircle,
      title: "Verified Products",
      description: "All products sourced from approved manufacturers and thoroughly tested"
    }
  ]

  const featuredProducts = [
    {
      id: "1",
      name: "Digital Blood Pressure Monitor",
      price: 12500,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop",
      category: "Medical Equipment",
      discount: 15
    },
    {
      id: "2", 
      name: "Surgical Suture Kit",
      price: 3200,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      category: "Surgical Instruments"
    },
    {
      id: "3",
      name: "Digital Thermometer",
      price: 1800,
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop",
      category: "Medical Equipment",
      discount: 20
    },
    {
      id: "4",
      name: "Disposable Face Masks (50pcs)",
      price: 850,
      image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&h=300&fit=crop",
      category: "Disposables"
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Wanjiku",
      role: "Chief Medical Officer",
      hospital: "Nairobi General Hospital",
      content: "L & Z Biotech has been our trusted partner for over 3 years. Their quality products and reliable delivery have significantly improved our patient care capabilities.",
      rating: 5
    },
    {
      id: 2,
      name: "James Kiprotich",
      role: "Pharmacy Manager",
      hospital: "Eldoret Medical Centre",
      content: "Outstanding customer service and competitive pricing. The team always goes above and beyond to ensure we get exactly what we need, when we need it.",
      rating: 5
    },
    {
      id: 3,
      name: "Dr. Fatuma Hassan",
      role: "Laboratory Director",
      hospital: "Mombasa Diagnostic Center",
      content: "The laboratory supplies from L & Z Biotech are consistently high quality. Their technical support team is knowledgeable and always available to help.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient w-full">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-fade-in">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                Trusted Healthcare Partner Since 2015
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Quality Medical Supplies for 
                <span className="block text-accent-light">Better Healthcare</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Kenya's leading supplier of certified medical equipment, surgical instruments, 
                and laboratory supplies. Serving hospitals, clinics, and healthcare professionals nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                    Browse Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-float">
              {/* Image Counter */}
              <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">
                  {currentImageIndex + 1} / {heroImages.length}
                </span>
              </div>
              
              <Carousel 
                className="w-full" 
                opts={{ loop: true }}
                setApi={setCarouselApi}
              >
                <CarouselContent>
                  {heroImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image.src}
                        alt={image.alt}
                        className="w-full rounded-2xl shadow-2xl object-cover aspect-square"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
              </Carousel>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg animate-slide-in">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <div>
                    <p className="font-semibold text-foreground">ISO 13485 Certified</p>
                    <p className="text-sm text-muted-foreground">Quality Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="py-16 bg-medical-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose L & Z Biotech?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to providing the highest quality medical supplies with unmatched service and support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-none bg-card-gradient">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <highlight.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover our most popular medical supplies and equipment
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="hidden sm:flex">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-destructive">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {product.discount && (
                        <span className="text-sm text-muted-foreground line-through">
                          KSh {product.price.toLocaleString()}
                        </span>
                      )}
                      <span className="font-bold text-primary">
                        KSh {product.discount 
                          ? (product.price * (1 - product.discount / 100)).toLocaleString()
                          : product.price.toLocaleString()
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/products">
              <Button>
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by healthcare professionals across Kenya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card-gradient border-none">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.hospital}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-medical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of healthcare professionals who trust L & Z Biotech for their medical supply needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}