"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { toast } from "react-toastify"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`
  }

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast.error("Your cart is empty!")
      return
    }

    toast.success("Order placed successfully! 🎉")
    clearCart()
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-6">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-20 w-20 sm:h-24 sm:w-24 text-gray-300 mx-auto mb-4 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl font-heading font-light text-textDark mb-3 sm:mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base px-2">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-block bg-button hover:bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-light text-textDark mb-6 sm:mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {state.items.map((item) => (
              <div key={item.id} className="bg-white rounded-card shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="relative h-32 w-full sm:h-32 sm:w-32 flex-shrink-0 mx-auto sm:mx-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-textDark mb-1 sm:mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-2 text-sm sm:text-base line-clamp-2">{item.description}</p>
                        <p className="text-base sm:text-lg font-bold text-accent">{formatPrice(item.price)}</p>
                      </div>

                      {/* Quantity Controls and Remove Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <span className="px-3 sm:px-4 py-2 font-medium text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-base sm:text-lg font-semibold text-textDark">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-blush rounded-card p-4 sm:p-6 sticky top-24">
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-textDark mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{state.total > 2999 ? "Free" : formatPrice(199)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-textDark">
                    <span>Total</span>
                    <span>{formatPrice(state.total + (state.total > 2999 ? 0 : 199))}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-button hover:bg-accent text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl mb-3 sm:mb-4"
              >
                Place Order
              </button>

              <p className="text-xs sm:text-sm text-gray-600 text-center">Free shipping on orders over ₹2,999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
