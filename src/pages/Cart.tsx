import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, Send } from "lucide-react"
import { Button } from "@/models/ui/button"
import { Input } from "@/models/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/models/ui/card"
import { Separator } from "@/models/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart()
  const { toast } = useToast()
  const [isRequestingQuote, setIsRequestingQuote] = useState(false)
  const [quoteForm, setQuoteForm] = useState({
    email: "",
    phone: "",
    message: ""
  })

  const handleRequestQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!quoteForm.email || !quoteForm.phone) {
      toast({
        title: "Error",
        description: "Please provide both email and phone number.",
        variant: "destructive"
      })
      return
    }

    setIsRequestingQuote(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Quote request sent!",
      description: "We'll contact you within 24 hours with a detailed quote.",
    })
    
    // Clear cart and form
    clearCart()
    setQuoteForm({ email: "", phone: "", message: "" })
    setIsRequestingQuote(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some medical supplies to your cart to get started.
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
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.images[0]} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="font-bold text-primary">KSh {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        KSh {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quote Request Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Request Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Summary */}
                  <div>
                    <h4 className="font-semibold mb-3">Order Summary</h4>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm mb-2">
                        <span>{item.name} × {item.quantity}</span>
                        <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <Separator className="my-3" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>KSh {getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Form */}
                  <form onSubmit={handleRequestQuote} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+254 700 000 000"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Additional Requirements (Optional)
                      </label>
                      <Input
                        id="message"
                        value={quoteForm.message}
                        onChange={(e) => setQuoteForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Delivery timeline, special requirements, etc."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isRequestingQuote}
                    >
                      {isRequestingQuote ? (
                        "Sending Request..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Request Quote
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-xs text-muted-foreground text-center">
                    By requesting a quote, you agree to be contacted by our sales team.
                    We'll provide pricing, delivery options, and payment terms.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}