import { Truck, HeadphonesIcon, Settings, Shield, Clock, Users, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/models/ui/card"
import { Button } from "@/models/ui/button"
import { Badge } from "@/models/ui/badge"
import { Link } from "react-router-dom"

export default function Services() {
  const services = [
    {
      icon: Truck,
      title: "Medical Equipment Supply",
      description: "Comprehensive range of medical devices and equipment from leading manufacturers worldwide.",
      features: [
        "Diagnostic equipment",
        "Patient monitoring systems",
        "Surgical instruments",
        "Laboratory equipment",
        "Rehabilitation devices"
      ]
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensuring all products meet international standards.",
      features: [
        "ISO 13485 certified processes",
        "Pre-delivery inspections", 
        "Warranty management",
        "Product authenticity verification",
        "Regulatory compliance"
      ]
    },
    {
      icon: HeadphonesIcon,
      title: "Technical Support",
      description: "Expert technical assistance from qualified biomedical engineers and healthcare professionals.",
      features: [
        "Installation services",
        "Equipment training",
        "Maintenance support",
        "Troubleshooting assistance",
        "User manuals and documentation"
      ]
    },
    {
      icon: Settings,
      title: "Equipment Maintenance",
      description: "Comprehensive maintenance services to ensure optimal performance and longevity.",
      features: [
        "Preventive maintenance",
        "Corrective repairs",
        "Calibration services",
        "Spare parts supply",
        "Service contracts"
      ]
    },
    {
      icon: Clock,
      title: "Emergency Supply",
      description: "24/7 emergency supply service for critical medical supplies and equipment.",
      features: [
        "Emergency response team",
        "Critical inventory management",
        "Rapid deployment",
        "24/7 hotline support",
        "Priority delivery"
      ]
    },
    {
      icon: Users,
      title: "Consultation Services",
      description: "Expert consultation on medical equipment selection, procurement, and facility planning.",
      features: [
        "Needs assessment",
        "Product recommendations",
        "Budget planning",
        "Facility design consultation",
        "Procurement strategy"
      ]
    }
  ]

  const benefits = [
    {
      icon: CheckCircle,
      title: "Certified Quality",
      description: "All products certified to international standards"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same day delivery within Nairobi, nationwide coverage"
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Dedicated technical support from qualified professionals"
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description: "Comprehensive warranty coverage on all equipment"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-hero-gradient">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-4">
            Our Services
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Comprehensive Healthcare Solutions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            From equipment supply to technical support, we provide end-to-end solutions 
            for all your medical supply needs across Kenya.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete healthcare solutions designed to meet the unique needs of your facility
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-card-gradient border-none">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-medical-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the difference of working with Kenya's leading medical supply partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Service Process
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, efficient, and transparent from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Consultation</h3>
              <p className="text-muted-foreground text-sm">
                We assess your needs and recommend the best solutions for your facility
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Quotation</h3>
              <p className="text-muted-foreground text-sm">
                Receive detailed quotes with competitive pricing and delivery timelines
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Fast, secure delivery with installation and training if required
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <p className="text-muted-foreground text-sm">
                Ongoing technical support and maintenance services for peace of mind
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-medical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us today to discuss your medical supply needs and discover how we can help your facility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Request Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}