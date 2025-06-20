"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/ProductCard"
import { products } from "@/data/products"
import { Search } from "lucide-react"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-12 px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto">
      <div
        className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-16 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-light text-textDark mb-3 sm:mb-4 lg:mb-6">
            Our Collection
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
            Explore our complete range of elegant western wear, thoughtfully crafted for the modern woman.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 lg:mb-12 space-y-4 sm:space-y-6 animate-fade-in-up animate-delay-200">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent transition-all duration-300 text-center sm:text-left text-sm sm:text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 px-2">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in-up text-xs sm:text-sm lg:text-base ${
                  selectedCategory === category
                    ? "bg-button text-white shadow-lg scale-105"
                    : "bg-white text-textDark border border-gray-300 hover:border-button hover:text-button hover:shadow-md"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up animate-delay-300">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing <span className="font-semibold text-textDark">{filteredProducts.length}</span>
            {filteredProducts.length === 1 ? " product" : " products"}
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in <span className="font-semibold text-accent">{selectedCategory}</span>
              </span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-fade-in-up animate-delay-400">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 lg:py-24 animate-fade-in-up animate-delay-400">
            <div className="max-w-md mx-auto px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-textDark mb-3 sm:mb-4">
                No products found
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="bg-button hover:bg-accent text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
