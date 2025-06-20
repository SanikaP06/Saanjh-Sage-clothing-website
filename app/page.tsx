"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import { products } from "@/data/products"
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const featuredProducts = products.slice(0, 4)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-blush to-background px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-20">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-accent bg-opacity-20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-20 sm:top-32 right-8 sm:right-16 w-12 h-12 sm:w-16 sm:h-16 bg-button bg-opacity-30 rounded-full blur-lg animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-16 sm:bottom-20 left-8 sm:left-20 w-20 h-20 sm:w-24 sm:h-24 bg-accent bg-opacity-15 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className={`text-center max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-4 sm:mb-6 animate-fade-in-up">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-accent mx-auto mb-3 sm:mb-4 animate-pulse" />
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-light text-textDark mb-3 sm:mb-4 lg:mb-6 animate-fade-in-up animate-delay-200 leading-tight">
            Saanjh & Sage
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-accent mb-3 sm:mb-4 lg:mb-6 font-light animate-fade-in-up animate-delay-300">
            Timeless wardrobe essentials
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animate-delay-400 px-2">
            Discover our curated collection of elegant western wear designed for the modern woman. From flowing dresses
            to structured blazers, find pieces that speak to your unique style.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up animate-delay-500 px-2">
            <Link
              href="/products"
              className="group bg-button hover:bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => {
                const featuredSection = document.getElementById("featured")
                if (featuredSection) {
                  const navbarHeight = 80 // Account for navbar height
                  const elementPosition = featuredSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
              className="group border-2 border-button text-button hover:bg-button hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
            >
              View Featured
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="animate-fade-in-up">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-3 sm:mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-light text-textDark mb-3 sm:mb-4 lg:mb-6">
              Featured Collection
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Handpicked pieces that embody our philosophy of timeless elegance and modern sophistication.
            </p>
          </div>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center animate-fade-in-up">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 border-2 border-button text-button hover:bg-button hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            View All Products
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-blush py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-accent bg-opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-button bg-opacity-5 rounded-full blur-2xl"></div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in-left order-2 lg:order-1">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-light text-textDark mb-4 sm:mb-6 lg:mb-8">
                Our Story
              </h2>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                <p>
                  At Saanjh & Sage, we believe that every woman deserves to feel confident and beautiful in what she
                  wears. Our carefully curated collection brings together timeless silhouettes with contemporary
                  details.
                </p>
                <p>
                  Each piece is thoughtfully selected to create a wardrobe that transitions seamlessly from day to
                  night, season to season, always keeping you effortlessly elegant.
                </p>
              </div>
              <div className="mt-6 sm:mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-button hover:text-accent font-medium text-sm sm:text-base lg:text-lg group"
                >
                  Discover Our Values
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="animate-fade-in-right order-1 lg:order-2">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <div className="aspect-square rounded-card overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-accent to-button opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
                      <p className="text-base sm:text-lg lg:text-xl font-medium">Crafted with Love</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-accent bg-opacity-20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-background to-blush">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-textDark mb-3 sm:mb-4 lg:mb-6">
            Stay Connected
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto px-2">
            Be the first to discover new arrivals, exclusive offers, and styling inspiration.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent transition-all duration-300 text-center sm:text-left text-sm sm:text-base"
            />
            <button className="bg-button hover:bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
