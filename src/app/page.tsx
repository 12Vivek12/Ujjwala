"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/home/Hero"
import { PhotoSlider } from "@/components/home/PhotoSlider"
import { ServiceGrid } from "@/components/home/ServiceGrid"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { CheckCircle2 } from "lucide-react"

const WHATSAPP_NUMBER = "917310382894"

export default function Home() {
  const handleServiceClick = (service: any) => {
    const message = encodeURIComponent(`Hello Ujjwala Services, I want to book ${service.title}.`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  const handleGeneralBooking = () => {
    const message = encodeURIComponent(`Hello Ujjwala Services, I want to inquire about your home services.`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  useEffect(() => {
    // Force scroll to top on mount to fix mobile jumping issues
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-background">
        <Hero onBookingClick={handleGeneralBooking} />
        
        <PhotoSlider />
        
        <ServiceGrid onServiceClick={handleServiceClick} />

        {/* Why Choose Us Section - Premium Touch */}
        <section className="py-20 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Ujjwala kyun chunein?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-[24px] shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Bharoseman Staff</h3>
                <p className="text-foreground/60">
                  Humara har staff background verified aur trained hota hai, taaki aap befikr rahein.
                </p>
              </div>
              <div className="p-8 bg-white rounded-[24px] shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Garanteed Quality</h3>
                <p className="text-foreground/60">
                  Customer satisfaction humari pehli priority hai. Kaam pasand nahi aaya toh hum dobara karenge.
                </p>
              </div>
              <div className="p-8 bg-white rounded-[24px] shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Transparent Pricing</h3>
                <p className="text-foreground/60">
                  Koi hidden charges nahi. Booking ke waqt jo dikhega, wahi price aapko dena hoga.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App CTA Placeholder */}
        <div className="bg-primary py-12 px-4 shadow-inner">
           <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Gorakhpur ke 1000+ parivaar humein pasand karte hain.</h3>
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Book Your First Service
              </Button>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
