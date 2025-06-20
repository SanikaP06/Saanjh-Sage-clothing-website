"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { ShoppingBag, Menu, X, User } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
  const { state } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-blush"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-heading font-semibold text-textDark group-hover:text-accent transition-colors duration-300">
              Saanjh & Sage
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-6 xl:space-x-8">
              <Link
                href="/"
                className="text-textDark hover:text-accent transition-all duration-300 font-medium relative group text-sm xl:text-base"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/products"
                className="text-textDark hover:text-accent transition-all duration-300 font-medium relative group text-sm xl:text-base"
              >
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/cart"
                className="text-textDark hover:text-accent transition-all duration-300 relative group p-2"
              >
                <ShoppingBag className="h-5 w-5 xl:h-6 xl:w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-button text-white text-xs rounded-full h-4 w-4 xl:h-5 xl:w-5 flex items-center justify-center animate-pulse text-[10px] xl:text-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
              {isLoggedIn ? (
                <div className="flex items-center space-x-2 text-textDark bg-accent/10 px-3 xl:px-4 py-2 rounded-full">
                  <User className="h-4 w-4 xl:h-5 xl:w-5 text-accent" />
                  <span className="text-xs xl:text-sm font-medium">Account</span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-button hover:bg-accent text-white px-4 xl:px-6 py-2 rounded-full transition-all duration-300 font-medium hover:shadow-lg transform hover:scale-105 text-xs xl:text-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-textDark hover:text-accent p-2 rounded-lg transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-4 sm:pb-6 space-y-1 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg">
            <Link
              href="/"
              className="block px-3 sm:px-4 py-2 sm:py-3 text-textDark hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-3 sm:px-4 py-2 sm:py-3 text-textDark hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 text-textDark hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                Cart
              </div>
              {itemCount > 0 && (
                <span className="bg-button text-white text-xs rounded-full px-2 py-1 font-semibold">{itemCount}</span>
              )}
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-textDark bg-accent/5 rounded-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                <span className="font-medium text-sm sm:text-base">Account</span>
              </div>
            ) : (
              <Link
                href="/login"
                className="block mx-3 sm:mx-4 mt-2 sm:mt-4 bg-button hover:bg-accent text-white text-center py-2 sm:py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
