"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, Star } from "lucide-react"

export const Hero = ({ onBookingClick }: { onBookingClick: () => void }) => {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-32 px-4 min-h-[80vh] flex items-center">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            <Star size={16} className="fill-current" />
            <span>Gorakhpur ka apna bharosemand platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Gorakhpur ki sabse <span className="text-primary italic">best</span> home services, ab aapke doorstep par.
          </h1>
          
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed max-w-lg">
            Sahi daam, bharosemand aur trained staff, aur instant booking. Professional beauty aur grooming services, ab aapke ghar par, bas ek click mein.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button size="lg" className="rounded-2xl h-14" onClick={onBookingClick}>
              Explore Services
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl h-14">
              How it Works?
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-secondary font-medium">
              <CheckCircle2 size={20} />
              <span>Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2 text-secondary font-medium">
              <CheckCircle2 size={20} />
              <span>Transparent Pricing</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
             {/* Note: In a real project, we would use an actual photo of the staff in Gorakhpur */}
             <div className="aspect-[4/3] bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mb-4 inline-block p-4 bg-white/50 backdrop-blur-sm rounded-full">
                    <Star size={48} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Quality Guarantee</h3>
                  <p className="text-foreground/70">Humara har kaam perfection ke sath hota hai.</p>
                </div>
             </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-2xl -z-10" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  )
}
