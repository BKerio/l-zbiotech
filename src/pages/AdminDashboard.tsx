import { useState, useRef } from "react"
import { Plus, Edit, Trash2, BarChart3, Users, Settings, ShoppingCart, Upload, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/models/ui/button"
import { Input } from "@/models/ui/input"
import { Textarea } from "@/models/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/models/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/models/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/models/ui/select"
import { SidebarProvider, SidebarTrigger } from "@/models/ui/sidebar"
import { AdminSidebar } from "@/models/admin-sidebar"
import { CATEGORIES, Product } from "@/data/products"
import { useProducts } from "@/contexts/ProductsContext"

import { useToast } from "@/hooks/use-toast"
import Swal from 'sweetalert2'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("products")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { products, addProduct, updateProduct, deleteProduct, uploadImage } = useProducts()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "", price: 0, category: "", description: "", images: [], in_stock: true, features: [], specifications: {}
  })

  const handleSave = async () => {
    // Validate form data
    if (!formData.name.trim() || !formData.category || formData.price <= 0) {
      toast({ 
        title: "Validation Error", 
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      })
      return
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData)
        Swal.fire({
          title: 'Updated!',
          text: 'Product has been updated successfully.',
          icon: 'success',
          confirmButtonColor: 'hsl(var(--primary))',
        })
      } else {
        await addProduct(formData)
        Swal.fire({
          title: 'Added!',
          text: 'Product has been added successfully.',
          icon: 'success',
          confirmButtonColor: 'hsl(var(--primary))',
        })
      }
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      // Error handling is done in the context
    }
  }

  const handleDelete = async (product: Product) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete "${product.name}" from the system.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'hsl(var(--destructive))',
      cancelButtonColor: 'hsl(var(--muted-foreground))',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      try {
        await deleteProduct(product.id)
        Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: 'hsl(var(--primary))',
        })
      } catch (error) {
        // Error handling is done in the context
      }
    }
  }

  const resetForm = () => {
    setFormData({ name: "", price: 0, category: "", description: "", images: [], in_stock: true, features: [], specifications: {} })
    setEditingProduct(null)
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      ...product,
      features: product.features || [],
      specifications: product.specifications || {}
    })
    setIsDialogOpen(true)
  }

  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file))
      const imageUrls = await Promise.all(uploadPromises)
      setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }))
    } catch (error) {
      console.error('Failed to upload images:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const clearImage = (index?: number) => {
    if (index !== undefined) {
      setFormData(prev => ({ 
        ...prev, 
        images: prev.images.filter((_, i) => i !== index) 
      }))
    } else {
      setFormData(prev => ({ ...prev, images: [] }))
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return renderProductsSection()
      case "orders":
        return renderOrdersSection()
      case "analytics":
        return renderAnalyticsSection()
      case "users":
        return renderUsersSection()
      case "settings":
        return renderSettingsSection()
      default:
        return renderProductsSection()
    }
  }

  const renderProductsSection = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Product Name *" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required 
              />
              <Input 
                type="number" 
                placeholder="Price (KSh) *" 
                value={formData.price || ""} 
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) || 0 }))}
                min="0"
                required 
              />
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category *" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
                <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload Images'}
                  </Button>
                  {formData.images.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => clearImage()}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative w-full h-24 bg-muted rounded-md overflow-hidden group">
                        <img 
                          src={image} 
                          alt={`Product image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => clearImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {formData.images.length === 0 && (
                  <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
            <Textarea 
              placeholder="Product Description" 
              value={formData.description} 
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
              <Button variant="outline" onClick={() => {setIsDialogOpen(false); resetForm()}}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="font-bold text-primary">KSh {product.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(product)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )

  const renderOrdersSection = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
      <Card>
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Orders Coming Soon</h3>
          <p className="text-muted-foreground">Order management functionality will be available here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalyticsSection = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      <Card>
        <CardContent className="p-8 text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
          <p className="text-muted-foreground">Sales analytics and reports will be available here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsersSection = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">User Management Coming Soon</h3>
          <p className="text-muted-foreground">User accounts and permissions will be managed here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettingsSection = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8">System Settings</h1>
      <Card>
        <CardContent className="p-8 text-center">
          <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Settings Coming Soon</h3>
          <p className="text-muted-foreground">System configuration and preferences will be available here.</p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={onLogout}
        />
        
        <main className="flex-1">
          {/* Header with sidebar trigger */}
          <header className="h-12 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="ml-4" />
            <div className="ml-4">
              <span className="text-sm text-muted-foreground">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Management
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}