"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext" // Add this import
import { toast } from "react-toastify"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist() // Add wishlist functions
  const [selectedSize, setSelectedSize] = useState("")

  const product = products.find((p) => p.id === params.id)

  // Check if product is in wishlist and set initial state
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (product) {
      setIsFavorite(isInWishlist(product.id))
    }
  }, [product, isInWishlist])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-textDark mb-4">Product not found</h1>
          <Link href="/products" className="text-button hover:text-accent">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart!")
      return
    }
    
    // Add the product with selected size to cart
    const productWithSize = {
      ...product,
      selectedSize: selectedSize
    }
    
    addItem(productWithSize)
    toast.success(`${product.name} (Size: ${selectedSize}) added to cart!`)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  // Updated wishlist toggle function
  const handleWishlistToggle = () => {
    if (isFavorite) {
      removeFromWishlist(product.id)
      setIsFavorite(false)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      setIsFavorite(true)
      toast.success("Added to wishlist!")
    }
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`
  }

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link href="/products" className="inline-flex items-center text-button hover:text-accent mb-8 transition-colors">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          <div className="relative h-96 lg:h-[600px] w-full rounded-card overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>
            <h1 className="text-4xl font-heading font-light text-textDark mt-4 mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-accent mb-4">{formatPrice(product.price)}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-textDark mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-semibold text-textDark mb-2">
              Size {selectedSize && <span className="text-accent font-normal">(Selected: {selectedSize})</span>}
            </h3>
            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`border px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    selectedSize === size
                      ? "border-button bg-button text-white shadow-md"
                      : "border-gray-300 hover:border-button hover:text-button"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-sm text-gray-500 mt-2">Please select a size</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg ${
                selectedSize
                  ? "bg-button hover:bg-accent text-white hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!selectedSize}
            >
              {selectedSize ? "Add to Cart" : "Select Size to Add to Cart"}
            </button>

            <button
              onClick={handleWishlistToggle} // Updated onClick handler
              className={`w-full border-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isFavorite
                  ? "border-red-400 text-red-500 bg-red-50"
                  : "border-gray-300 text-gray-700 hover:border-button hover:text-button"
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-textDark mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Premium quality fabric</li>
              <li>• Machine washable</li>
              <li>• Available in multiple sizes</li>
              <li>• Free shipping on orders over ₹2,999</li>
              <li>• 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}