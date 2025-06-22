"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useState } from "react"
import type { Product } from "@/data/products"

export interface WishlistItem extends Product {
  dateAdded: string
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string } // product id
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      
      if (existingItem) {
        return state // Item already in wishlist, no change
      } else {
        const newWishlistItem: WishlistItem = {
          ...action.payload,
          dateAdded: new Date().toISOString()
        }
        return {
          items: [...state.items, newWishlistItem]
        }
      }
    }
    case "REMOVE_ITEM": {
      return {
        items: state.items.filter((item) => item.id !== action.payload)
      }
    }
    case "CLEAR_WISHLIST":
      return { items: [] }
    case "LOAD_WISHLIST":
      return {
        items: action.payload
      }
    default:
      return state
  }
}

const WishlistContext = createContext<{
  state: WishlistState
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  isLoaded: boolean
} | null>(null)

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const loadWishlist = () => {
      try {
        if (typeof window !== 'undefined') {
          const savedWishlist = localStorage.getItem("wishlist")
          if (savedWishlist) {
            const parsedWishlist = JSON.parse(savedWishlist)
            if (Array.isArray(parsedWishlist)) {
              dispatch({ type: "LOAD_WISHLIST", payload: parsedWishlist })
            }
          }
        }
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadWishlist()
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return // Don't save until we've loaded

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem("wishlist", JSON.stringify(state.items))
      }
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error)
    }
  }, [state.items, isLoaded])

  const addItem = (product: Product) => {
    console.log("Adding item to wishlist:", product) // Debug log
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  const removeItem = (productId: string) => {
    console.log("Removing item from wishlist:", productId) // Debug log
    dispatch({ type: "REMOVE_ITEM", payload: productId })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.id === productId)
  }

  return (
    <WishlistContext.Provider value={{ state, addItem, removeItem, clearWishlist, isInWishlist, isLoaded }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}