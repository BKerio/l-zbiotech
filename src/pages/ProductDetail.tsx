import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Heart, ShoppingCart, ArrowLeft, MessageCircle } from "lucide-react"
import { Button } from "@/models/ui/button"
import { Card, CardContent } from "@/models/ui/card"
import { Badge } from "@/models/ui/badge"
import { Separator } from "@/models/ui/separator"
import { useProducts } from "@/contexts/ProductsContext"
import { useCart } from "@/hooks/use-cart"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"
import { Product } from "@/data/products"

function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const { products } = useProducts()
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { toast } = useToast()

  const product = products.find(p => p.id === id)

  useEffect(() => {
    if (!product) navigate("/products")
  }, [product, navigate])

  useEffect(() => {
    if (!product || product.images.length <= 1) return
    autoplayRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }, 4000)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [product])

  if (!product) return null

  const handleAddToCart = () => {
    addToCart(product)
    toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` })
  }

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
      toast({ title: "Removed from favorites", description: `${product.name} has been removed from your favorites.` })
    } else {
      addToFavorites(product)
      toast({ title: "Added to favorites", description: `${product.name} has been added to your favorites.` })
    }
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in this product:\n\n` +
      `Product: ${product.name}\n` +
      `Category: ${product.category}\n` +
      `Price: KSh ${product.price.toLocaleString()}\n` +
      `Description: ${product.description}\n\n` +
      `Please provide more information about availability and delivery.`
    )
    const whatsappNumber = "254742164112"
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || touchStartX === null) return
    const deltaX = e.touches[0].clientX - touchStartX
    if (deltaX > 75) {
      prevImage()
      setIsDragging(false)
    } else if (deltaX < -75) {
      nextImage()
      setIsDragging(false)
    }
  }

  const handleTouchEnd = () => setIsDragging(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="outline" onClick={() => navigate("/products")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
          </Button>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div
              className="relative w-full h-72 rounded-lg overflow-hidden bg-muted"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                  >‹</button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                  >›</button>
                </>
              )}
              {!product.in_stock && (
                <Badge variant="destructive" className="absolute top-4 left-4">
                  Out of Stock
                </Badge>
              )}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 text-sm bg-white/80 px-3 py-1 rounded shadow">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 justify-center">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${index === currentImageIndex ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <Badge>{product.category}</Badge>
            <p className="text-xl text-primary font-semibold">KSh {product.price.toLocaleString()}</p>
            <Separator />
            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Button variant="outline" onClick={handleToggleFavorite}>
                <Heart className="h-4 w-4 mr-2" />
                {isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              <Button variant="outline" onClick={handleWhatsApp}>
                <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail