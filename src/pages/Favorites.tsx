import { Heart, ShoppingCart, HeartOff } from "lucide-react"
import { Button } from "@/models/ui/button"
import { Card, CardContent } from "@/models/ui/card"
import { Badge } from "@/models/ui/badge"
import { useFavorites } from "@/hooks/use-favorites"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"

export default function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleRemoveFromFavorites = (productId: string, productName: string) => {
    removeFromFavorites(productId)
    toast({
      title: "Removed from favorites",
      description: `${productName} has been removed from your favorites.`,
    })
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <HeartOff className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">No favorites yet</h1>
            <p className="text-muted-foreground mb-8">
              Start adding products to your favorites to keep track of items you're interested in.
            </p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Favorites</h1>
            <p className="text-muted-foreground">
              You have {favorites.length} favorite product{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  onClick={() => handleRemoveFromFavorites(product.id, product.name)}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
                {!product.in_stock && (
                  <Badge variant="destructive" className="absolute top-2 left-2">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2 text-xs">
                  {product.category}
                </Badge>
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-lg">
                      KSh {product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.in_stock}
                      className="flex-1 text-xs"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromFavorites(product.id, product.name)}
                      className="text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}