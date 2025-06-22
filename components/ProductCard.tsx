"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/data/products"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { toast } from "react-toastify"
import { ShoppingCart, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
  showAddToCart?: boolean
  index?: number
}

export default function ProductCard({ product, showAddToCart = true, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Check if item is in wishlist
  const isLiked = isInWishlist(product.id)

  // Modified: Navigate to product page instead of directly adding to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/products/${product.id}`)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLiked) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`
  }

  const getPlaceholderColor = (id: string) => {
    const colors = ["#f5eee7", "#e8d5d5", "#d9c7c7", "#f0e6e6", "#e6ddd7"]
    const index = Number.parseInt(id) % colors.length
    return colors[index]
  }

  return (
    <div
      className={`group bg-white rounded-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up opacity-0 w-full max-w-sm mx-auto`}
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      <Link href={`/products/${product.id}`}>
        {/* Responsive image container */}
        <div className="relative h-[28rem] xs:h-[32rem] sm:h-64 md:h-72 lg:h-64 xl:h-72 overflow-hidden bg-gray-100">

          {/* Placeholder */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "opacity-100"}`}
            style={{ backgroundColor: getPlaceholderColor(product.id) }}
          >
            <div className="animate-shimmer absolute inset-0"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <p className="text-xs sm:text-sm font-medium px-2">{product.name}</p>
              </div>
            </div>
          </div>

          {/* Actual image */}
          <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

          {/* Heart icon */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white bg-opacity-80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-opacity-100 hover:scale-110"
          >
            <Heart
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>

        {/* Card content */}
        <div className="p-3 sm:p-4 lg:p-5">
          <div className="mb-3">
            <span className="inline-block text-xs font-medium text-accent bg-accent bg-opacity-10 px-2 py-1 rounded-full mb-2">
              {product.category}
            </span>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-textDark mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg lg:text-xl font-bold text-accent">{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>

      {showAddToCart && (
        <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
          <button
            onClick={handleAddToCart}
            className="w-full bg-button hover:bg-accent text-white py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 font-medium text-xs sm:text-sm hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            Select Options
          </button>
        </div>
      )}
    </div>
  )
}