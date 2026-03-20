"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MapPin, Phone, MessageSquare, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-white py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl">U</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-secondary tracking-tight">Ujjwala</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Services</span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className={`font-bold transition-colors ${pathname === "/" ? "text-primary" : "text-foreground hover:text-primary"}`}>Home</Link>
          <Link href="/services" className={`font-bold transition-colors ${pathname === "/services" ? "text-primary" : "text-foreground hover:text-primary"}`}>Services</Link>
          <Link href="/about" className={`font-bold transition-colors ${pathname === "/about" ? "text-primary" : "text-foreground hover:text-primary"}`}>About Us</Link>
          
          <div className="flex items-center gap-4 pl-6 border-l border-primary/10">
            <a 
              href="https://maps.app.goo.gl/X3DWHgN6DAFGDKJq5" 
              target="_blank"
              className="flex items-center gap-1.5 text-foreground/60 hover:text-primary transition-colors text-sm font-medium"
            >
              <MapPin size={16} className="text-primary" />
              Gorakhpur
            </a>
            <Link 
              href="/signin" 
              className="px-6 py-2.5 bg-secondary text-white rounded-full font-bold text-sm hover:bg-primary transition-all shadow-md flex items-center gap-2"
            >
              <User size={16} /> Login
            </Link>
          </div>
        </div>

        {/* Mobile Actions: Only Login and Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/signin" className="p-2.5 bg-background text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
            <User size={20} />
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 bg-primary text-white rounded-xl shadow-md rotate-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-y-0 right-0 w-[280px] bg-white shadow-2xl z-50 md:hidden flex flex-col p-8 border-l border-primary/5"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-black text-secondary text-lg">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-background rounded-full text-foreground/40"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-black text-secondary hover:text-primary transition-colors">Home</Link>
              <Link href="/services" onClick={() => setIsOpen(false)} className="text-2xl font-black text-secondary hover:text-primary transition-colors">Services</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="text-2xl font-black text-secondary hover:text-primary transition-colors">About Us</Link>
            </div>

            <div className="mt-auto pt-10 border-t border-primary/5">
               <a 
                href="https://wa.me/917310382894" 
                target="_blank"
                className="w-full bg-secondary text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl"
              >
                <MessageSquare size={20} /> Book on WhatsApp
              </a>
              <p className="mt-6 text-center text-xs font-bold text-foreground/20 uppercase tracking-widest flex items-center justify-center gap-2">
                <Sparkles size={12} /> Ujjwala Services
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
