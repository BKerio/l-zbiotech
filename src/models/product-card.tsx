import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/models/ui/button'
import { Card, CardContent, CardFooter } from '@/models/ui/card'
import { Badge } from '@/models/ui/badge'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/use-cart'
import { useFavorites } from '@/hooks/use-favorites'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!product.in_stock) return
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.svg'
    })
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const wasFavorite = isFavorite(product.id)
    if (wasFavorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
    toast({
      title: wasFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: wasFavorite 
        ? `${product.name} has been removed from favorites`
        : `${product.name} has been added to favorites`
    })
  }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-border/50 hover:border-border" onClick={handleCardClick}>
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md transition-transform group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 ${isFavorite(product.id) ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500 bg-background/80 backdrop-blur-sm`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </Button>
          {!product.in_stock && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Out of Stock
            </Badge>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <span className="text-lg font-semibold text-primary">
              ${product.price}
            </span>
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          variant={product.in_stock ? "default" : "secondary"}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  )
}