import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import { WishlistProvider } from "@/context/WishlistContext"
import Navbar from "@/components/Navbar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Saanjh & Sage - Timeless Wardrobe Essentials",
  description:
    "Elegant and modern western wear for women. Discover our collection of crop tops, dresses, cardigans, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background min-h-screen`}>
        <WishlistProvider>
        <CartProvider>
          
          <Navbar />
          <main>{children}</main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="!z-[9999]"
            toastClassName="!relative !transform-none !top-0 !left-0 !right-0 !bottom-0 !w-auto !max-w-md !mx-auto !mt-0"
            bodyClassName="!text-sm !font-medium"
            style={{
              zIndex: 9999,
            }}
          />
          
        </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
