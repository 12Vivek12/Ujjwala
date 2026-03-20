"use client"

import { motion } from "framer-motion"
import { 
  Sparkles, 
  Scissors, 
  Droplet, 
  Flower2, 
  Zap, 
  Brush, 
  Wand2, 
  Gem, 
  Heart, 
  Search,
  MessageCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  {
    title: "Beauty Salon Essentials",
    icon: Sparkles,
    color: "text-amber-500",
    services: [
      { name: "Beauty Salon", desc: "Complete basic to advanced salon services." },
      { name: "Eyebrow threading", desc: "Precise shaping and threading." },
      { name: "Online beauty salon booking", desc: "Easy digital slot reservation." }
    ]
  },
  {
    title: "Skin & Facials",
    icon: Droplet,
    color: "text-blue-500",
    services: [
      { name: "Skin care", desc: "Routine cleaning and expert care." },
      { name: "Facials", desc: "Instant glow and deep cleansing treatments." },
      { name: "Acne treatments", desc: "Targeted solutions for clearer skin." }
    ]
  },
  {
    title: "Hair Artistry",
    icon: Scissors,
    color: "text-rose-500",
    services: [
      { name: "Haircut", desc: "Modern and traditional hair styling." },
      { name: "Hairstyling", desc: "Special event and party styling." },
      { name: "Balayage", desc: "Premium hair coloring and highlights." },
      { name: "Braids", desc: "Traditional and designer hair braids." }
    ]
  },
  {
    title: "Waxing & Body Care",
    icon: Zap,
    color: "text-purple-500",
    services: [
      { name: "Body waxing", desc: "Full body smooth finish waxing." },
      { name: "Brazilian waxing", desc: "Specialized intimate area grooming." },
      { name: "Waxing", desc: "Legs, arms, and specialized waxing." },
      { name: "Manicure", desc: "Nail care and hand massage." }
    ]
  },
  {
    title: "Specialty & Makeup",
    icon: Brush,
    color: "text-pink-500",
    services: [
      { name: "Bridal services", desc: "Complete wedding day transformation." },
      { name: "Makeup", desc: "Customized professional makeup looks." },
      { name: "Makeup services", desc: "Occasion and party makeup." }
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background/30 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-foreground mb-6"
          >
            Humari <span className="text-primary italic">Expert</span> Services
          </motion.h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Gorakhpur ki sabse best beauty services ab aapki ungliyon par. 
            Select whatever you need and book instantly via WhatsApp.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[40px] p-8 shadow-xl shadow-primary/5 border border-primary/5 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={cn("p-4 rounded-2xl bg-background", category.color)}>
                  <category.icon size={28} />
                </div>
                <h2 className="text-2xl font-black text-secondary">{category.title}</h2>
              </div>

              <div className="space-y-6 flex-grow">
                {category.services.map((service) => (
                  <div key={service.name} className="group border-b border-primary/5 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      <Link 
                        href={`https://wa.me/917310382894?text=Hello+Ujjwala%2C+I+want+to+book+${encodeURIComponent(service.name)}`}
                        target="_blank"
                        className="p-2 bg-primary/5 text-primary rounded-full hover:bg-primary hover:text-white transition-all transform scale-90"
                      >
                        <MessageCircle size={18} />
                      </Link>
                    </div>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Button for Contact (Mobile) */}
        <div className="mt-20 text-center">
          <Link href="https://wa.me/917310382894" target="_blank">
            <button className="bg-secondary text-white px-12 py-5 rounded-full font-black text-xl hover:bg-primary transition-all shadow-2xl flex items-center gap-3 mx-auto">
              Custom Inquiry? WhatsApp Us <MessageCircle size={24} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
