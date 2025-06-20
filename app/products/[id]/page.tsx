"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { useCart } from "@/context/CartContext"
import { toast } from "react-toastify"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)

  const product = products.find((p) => p.id === params.id)

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
    addItem(product)
    toast.success(`${product.name} added to cart!`)
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

          {/* Size Guide */}
          <div>
            <h3 className="text-lg font-semibold text-textDark mb-2">Size</h3>
            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="border border-gray-300 hover:border-button px-4 py-2 rounded-lg transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-button hover:bg-accent text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
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
