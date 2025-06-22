"use client"

import { useState, useEffect } from "react"
import { useWishlist } from "@/context/WishlistContext"
import { useCart } from "@/context/CartContext"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-toastify"

// Define the product type
interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string
  images?: string[]
  dateAdded: string
}

export default function WishlistPage() {
  const { state, removeItem, clearWishlist } = useWishlist()
  const { addItem: addToCart } = useCart()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleAddToCart = (product: Product) => {
    // Cast to any to avoid TypeScript errors temporarily
    (addToCart as any)(product, 1)
    toast.success("Added to cart!")
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeItem(productId)
    toast.success("Removed from wishlist")
  }

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      clearWishlist()
      toast.success("Wishlist cleared")
    }
  }

  // Helper function to get product image
  const getProductImage = (item: Product): string => {
    if (item.image) return item.image
    if (item.images && item.images.length > 0) return item.images[0]
    return "/placeholder.svg"
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-12 px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto">
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm sm:text-base">Back to Products</span>
            </Link>
          </div>
          
          {state.items.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 text-sm sm:text-base"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-light text-textDark">
              My Wishlist
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {state.items.length === 0 
              ? "Your wishlist is empty. Start adding products you love!" 
              : `You have ${state.items.length} item${state.items.length !== 1 ? 's' : ''} in your wishlist`
            }
          </p>
        </div>

        {/* Wishlist Content */}
        {state.items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 sm:py-16 lg:py-24">
            <div className="max-w-md mx-auto px-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-textDark mb-4 sm:mb-6">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                Discover amazing products and add them to your wishlist to save for later.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-button hover:bg-accent text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
              >
                <ShoppingCart className="w-4 h-4" />
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Items */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {state.items.map((item: Product, index: number) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getProductImage(item)}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                  
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                  </button>

                  {/* Date Added */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                    Added {new Date(item.dateAdded).toLocaleDateString()}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold text-textDark mb-2 text-sm sm:text-base line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-textDark">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm sm:text-base text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full flex items-center justify-center gap-2 bg-button hover:bg-accent text-white py-2.5 px-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    
                    <Link
                      href={`/products/${item.id}`}
                      className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-button text-textDark hover:text-button py-2.5 px-4 rounded-full font-medium transition-all duration-300 text-sm sm:text-base"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {state.items.length > 0 && (
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors duration-300 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}