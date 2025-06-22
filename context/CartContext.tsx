"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "@/data/products"

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  cartId: string // Unique identifier for cart items (id + size)
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product & { selectedSize?: string } }
  | { type: "REMOVE_ITEM"; payload: string } // cartId
  | { type: "UPDATE_QUANTITY"; payload: { cartId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      // Create unique cartId based on product id and selected size
      const cartId = action.payload.selectedSize 
        ? `${action.payload.id}-${action.payload.selectedSize}` 
        : action.payload.id
      
      const existingItem = state.items.find((item) => item.cartId === cartId)
      
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      } else {
        const newCartItem: CartItem = {
          ...action.payload,
          quantity: 1,
          cartId,
          selectedSize: action.payload.selectedSize
        }
        const newItems = [...state.items, newCartItem]
        return {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }
      }
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.cartId !== action.payload)
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) => (item.cartId === action.payload.cartId ? { ...item, quantity: action.payload.quantity } : item))
        .filter((item) => item.quantity > 0)
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }
    case "CLEAR_CART":
      return { items: [], total: 0 }
    case "LOAD_CART":
      return {
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  addItem: (product: Product & { selectedSize?: string }) => void
  removeItem: (cartId: string) => void
  updateQuantity: (cartId: string, quantity: number) => void
  clearCart: () => void
} | null>(null)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Ensure backward compatibility - add cartId if missing
        const cartWithIds = parsedCart.map((item: any) => ({
          ...item,
          cartId: item.cartId || (item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id)
        }))
        dispatch({ type: "LOAD_CART", payload: cartWithIds })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product & { selectedSize?: string }) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  const removeItem = (cartId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: cartId })
  }

  const updateQuantity = (cartId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { cartId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}