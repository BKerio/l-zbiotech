import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '@/data/products'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  getProduct: (id: string) => Product | undefined
  uploadImage: (file: File) => Promise<string>
  loading: boolean
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error loading products:', error)
      toast({
        title: 'Error loading products',
        description: 'Failed to load products from the database',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `products/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive'
      })
      throw error
    }
  }

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single()

      if (error) throw error

      setProducts(prev => [data, ...prev])
      toast({
        title: 'Product added',
        description: 'Product has been successfully added'
      })
    } catch (error) {
      console.error('Error adding product:', error)
      toast({
        title: 'Error adding product',
        description: 'Failed to add product. Please try again.',
        variant: 'destructive'
      })
      throw error
    }
  }

  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setProducts(prev => prev.map(product => 
        product.id === id ? data : product
      ))
      toast({
        title: 'Product updated',
        description: 'Product has been successfully updated'
      })
    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: 'Error updating product',
        description: 'Failed to update product. Please try again.',
        variant: 'destructive'
      })
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      setProducts(prev => prev.filter(product => product.id !== id))
      toast({
        title: 'Product deleted',
        description: 'Product has been successfully deleted'
      })
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: 'Error deleting product',
        description: 'Failed to delete product. Please try again.',
        variant: 'destructive'
      })
      throw error
    }
  }

  const getProduct = (id: string) => {
    return products.find(product => product.id === id)
  }

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      uploadImage,
      loading
    }}>
      {children}
    </ProductsContext.Provider>
  )
}