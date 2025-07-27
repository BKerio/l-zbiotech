import { useState, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'

interface UseImageUploadReturn {
  uploadedImages: { [key: string]: string }
  uploadImage: (file: File) => Promise<string>
  removeImage: (key: string) => void
  isUploading: boolean
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({})
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive'
      })
      throw new Error('Invalid file type')
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: 'File too large',
        description: 'Please select an image smaller than 5MB',
        variant: 'destructive'
      })
      throw new Error('File too large')
    }

    setIsUploading(true)
    
    try {
      // Convert file to base64 data URL for storage
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const key = `image_${Date.now()}_${Math.random().toString(36).substring(2)}`
      
      setUploadedImages(prev => ({
        ...prev,
        [key]: dataUrl
      }))

      toast({
        title: 'Image uploaded',
        description: 'Image has been uploaded successfully'
      })

      return dataUrl
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive'
      })
      throw error
    } finally {
      setIsUploading(false)
    }
  }, [toast])

  const removeImage = useCallback((key: string) => {
    setUploadedImages(prev => {
      const newImages = { ...prev }
      delete newImages[key]
      return newImages
    })
  }, [])

  return {
    uploadedImages,
    uploadImage,
    removeImage,
    isUploading
  }
}