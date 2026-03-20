"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, Scissors, Heart, Star, Zap, Brush, Wand2, 
  Flower2, ZapIcon, Smile, Gem, Layers, Loader2 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

// Icon Map for Dynamic Rendering
const IconMap: { [key: string]: any } = {
  Star, Gem, Flower2, Sparkles, Scissors, ZapIcon, Heart, Brush, Wand2, Smile, Layers
}

// Color and Gradient Utils for brand consistency
const getServiceTheme = (index: number) => {
  const themes = [
    { color: "from-pink-400 to-rose-600", bg: "bg-pink-50" },
    { color: "from-red-400 to-maroon-600", bg: "bg-red-50" },
    { color: "from-rose-400 to-pink-600", bg: "bg-rose-50" },
    { color: "from-pink-500 to-rose-500", bg: "bg-pink-50" },
    { color: "from-red-500 to-rose-600", bg: "bg-red-50" },
    { color: "from-rose-500 to-pink-600", bg: "bg-rose-50" },
  ]
  return themes[index % themes.length]
}

export const ServiceGrid = ({ onServiceClick }: { onServiceClick: (service: any) => void }) => {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true })
      
      if (data) setServices(data)
      setLoading(false)
    }
    fetchServices()
  }, [])

  return (
    <section className="py-20 px-4 bg-background min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-6"
          >
            <Sparkles size={16} /> Premium Online Booking
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground tracking-tight">
            Special Occasions, <span className="text-primary underline decoration-secondary/20">Unique You</span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Shadi ho ya Engagement, hum laate hain professional salon experience seedhe aapke ghar. 
            Select your occasion and book instantly.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="text-primary animate-spin mb-4" size={40} />
            <p className="text-foreground/40 font-bold uppercase tracking-widest text-sm">Loading Premium Services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {services.map((service, index) => {
                const Icon = IconMap[service.icon] || Scissors
                const theme = getServiceTheme(index)
                const isFeatured = index === 0

                return (
                  <motion.button
                    key={service.id}
                    layout
                    whileHover={{ 
                      y: -15,
                      transition: { duration: 0.4, ease: "backOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onClick={() => onServiceClick(service)}
                    className={cn(
                      "relative group text-left bg-white rounded-[48px] p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_-15px_rgba(255,77,77,0.15)] border border-primary/5 transition-all overflow-hidden flex flex-col h-full",
                      isFeatured && "md:col-span-2 lg:col-span-1 ring-2 ring-primary/20 bg-gradient-to-b from-white to-primary/5"
                    )}
                  >
                    {/* Featured Badge */}
                    {isFeatured && (
                      <div className="absolute top-8 right-10 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        Most Popular
                      </div>
                    )}

                    {/* Decorative Background Blob */}
                    <div className={cn(
                      "absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 blur-3xl",
                      theme.bg
                    )} />
                    
                    <div className={cn(
                      "w-20 h-20 rounded-[30px] flex items-center justify-center mb-8 shadow-lg transition-all duration-700 group-hover:rotate-[10deg] group-hover:scale-110 bg-gradient-to-br",
                      theme.color
                    )}>
                      <Icon size={36} className="text-white drop-shadow-md" />
                    </div>
                    
                    <h3 className="text-2xl font-black text-secondary mb-4 group-hover:text-primary transition-colors leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-foreground/70 text-lg leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-primary/5">
                      <span className="text-primary text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        {service.price || "Check Details"} <Sparkles size={16} />
                      </span>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <span className="text-xl">→</span>
                      </div>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine transition-all pointer-events-none" />
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Catch-all unique section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-secondary rounded-[60px] text-white overflow-hidden relative"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-5xl font-black mb-6">And Much More...</h3>
              <p className="text-xl text-white/80 leading-relaxed mb-10">
                Humari services ki koi seema nahi hai. Hum har us pal ko yaadgar banate hain jo aapke liye khaas hai. 
                Custom packages ke liye aaj hi humein batayein.
              </p>
              <a href="https://wa.me/917310382894" target="_blank">
                <button className="bg-primary hover:bg-white hover:text-secondary text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-2xl">
                  Explore All Packages
                </button>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-40 bg-white/10 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center p-6 border border-white/10">
                 <span className="text-4xl mb-2">🎈</span>
                 <span className="font-bold text-center">Birthday</span>
              </div>
              <div className="h-40 bg-white/10 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center p-6 border border-white/10">
                 <span className="text-4xl mb-2">💍</span>
                 <span className="font-bold text-center">Anniversary</span>
              </div>
              <div className="h-40 bg-white/10 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center p-6 border border-white/10">
                 <span className="text-4xl mb-2">🎓</span>
                 <span className="font-bold text-center">Convocation</span>
              </div>
              <div className="h-40 bg-white/10 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center p-6 border border-white/10">
                 <span className="text-4xl mb-2">✨</span>
                 <span className="font-bold text-center">Festivals</span>
              </div>
            </div>
          </div>
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        </motion.div>
      </div>
    </section>
  )
}
