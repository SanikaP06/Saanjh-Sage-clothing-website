"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import ProductCard from "@/components/ProductCard"
import { products } from "@/data/products"
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const featuredProducts = products.slice(0, 4)
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  const featuredRef = useRef(null)
  const aboutRef = useRef(null)
  const newsletterRef = useRef(null)
  
  const featuredInView = useInView(featuredRef, { once: true, margin: "-100px" })
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const newsletterInView = useInView(newsletterRef, { once: true, margin: "-100px" })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-blush to-background px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-20">
        {/* Floating decorative elements */}
        <motion.div 
          className="absolute top-10 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-accent bg-opacity-20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        <motion.div
          className="absolute top-20 sm:top-32 right-8 sm:right-16 w-12 h-12 sm:w-16 sm:h-16 bg-button bg-opacity-30 rounded-full blur-lg"
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }
          }}
        />
        <motion.div
          className="absolute bottom-16 sm:bottom-20 left-8 sm:left-20 w-20 h-20 sm:w-24 sm:h-24 bg-accent bg-opacity-15 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }
          }}
        />

        <motion.div
          className="text-center max-w-6xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div 
            className="mb-4 sm:mb-6"
            variants={fadeInUp}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-accent mx-auto mb-3 sm:mb-4" />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-light text-textDark mb-3 sm:mb-4 lg:mb-6 leading-tight"
            variants={fadeInUp}
          >
            Saanjh & Sage
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-accent mb-3 sm:mb-4 lg:mb-6 font-light"
            variants={fadeInUp}
          >
            Timeless wardrobe essentials
          </motion.p>

          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed px-2"
            variants={fadeInUp}
          >
            Discover our curated collection of elegant western wear designed for the modern woman. From flowing dresses
            to structured blazers, find pieces that speak to your unique style.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2"
            variants={fadeInUp}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/products"
                className="group bg-button hover:bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Shop Collection
                <motion.div
                  className="inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.button
              onClick={() => {
                const featuredSection = document.getElementById("featured")
                if (featuredSection) {
                  const navbarHeight = 80
                  const elementPosition = featuredSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
              className="group border-2 border-button text-button hover:bg-button hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 hover:shadow-lg w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Featured
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section 
        id="featured" 
        className="py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto"
        ref={featuredRef}
      >
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial="initial"
          animate={featuredInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-3 sm:mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-light text-textDark mb-3 sm:mb-4 lg:mb-6">
              Featured Collection
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Handpicked pieces that embody our philosophy of timeless elegance and modern sophistication.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16"
          initial="initial"
          animate={featuredInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial="initial"
          animate={featuredInView ? "animate" : "initial"}
          variants={fadeInUp}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 border-2 border-button text-button hover:bg-button hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 hover:shadow-lg"
            >
              View All Products
              <motion.div
                className="inline-block"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section 
        className="bg-blush py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 relative overflow-hidden"
        ref={aboutRef}
      >
        {/* Background decoration */}
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-accent bg-opacity-5 rounded-full blur-3xl"
          style={{ y: yRange }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-button bg-opacity-5 rounded-full blur-2xl"
          style={{ y: yRange }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <motion.div 
              className="order-2 lg:order-1"
              initial="initial"
              animate={aboutInView ? "animate" : "initial"}
              variants={fadeInLeft}
            >
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
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-button hover:text-accent font-medium text-sm sm:text-base lg:text-lg group"
                  >
                    Discover Our Values
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="order-1 lg:order-2"
              initial="initial"
              animate={aboutInView ? "animate" : "initial"}
              variants={fadeInRight}
            >
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <motion.div 
                  className="h-48 xs:h-56 sm:h-72 md:h-80 lg:h-[22rem] rounded-card overflow-hidden shadow-2xl"
                  initial={{ rotate: 2 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-accent to-button opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
                      </motion.div>
                      <p className="text-base sm:text-lg lg:text-xl font-medium">Crafted with Love</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-accent bg-opacity-20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
        className="py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-background to-blush"
        ref={newsletterRef}
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          animate={newsletterInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-4 sm:mb-6" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-textDark mb-3 sm:mb-4 lg:mb-6">
              Stay Connected
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto px-2">
              Be the first to discover new arrivals, exclusive offers, and styling inspiration.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto"
            variants={fadeInUp}
          >
            <motion.input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent transition-all duration-300 text-center sm:text-left text-sm sm:text-base"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button 
              className="bg-button hover:bg-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}