import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Heart, ShieldCheck, Clock, Star, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Humari Kahani <span className="text-primary">(Our Story)</span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Gorakhpur ke har ghar mein khushiyan aur suvidha pahunchane ka ek sapna. 
              Ujjwala Makeover sirf ek platform nahi, aapka bharosemand saathi hai.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
              <Image 
                src="/photos/unnamed.webp" 
                alt="Ujjwala Office" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Humara Maqsad (Our Mission)</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Humara maqsad hai Gorakhpur ke logon ko world-class home services unke doorstep par pradan karna. 
                  Chahe wo Hair Care ho ya Skin Care, humari team hamesha aapki khoobsurti aur suvidha ka dhyan rakhti hai.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-primary/10">
                  <Heart className="text-primary mb-3" size={32} />
                  <h3 className="font-bold text-lg">Pure Trust</h3>
                  <p className="text-sm text-foreground/60">Ghar jaisa bharosa har service mein.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-primary/10">
                  <ShieldCheck className="text-secondary mb-3" size={32} />
                  <h3 className="font-bold text-lg">Expert Staff</h3>
                  <p className="text-sm text-foreground/60">Trained aur background verified professional.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Are Different */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Ujjwala Makeover Kyun Chunein?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Waqt ki Kadar", 
                  desc: "Aapka samay humare liye keemti hai. On-time delivery.", 
                  icon: Clock 
                },
                { 
                  title: "Premium Quality", 
                  desc: "Sirf branded products aur best techniques ka upyog.", 
                  icon: Star 
                },
                { 
                  title: "Gorakhpur Local", 
                  desc: "Aapke apne sheher ki apni service. Hum aapko samajhte hain.", 
                  icon: MapPin 
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-shadow border border-primary/5">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center bg-secondary text-white rounded-[50px] p-12 md:p-20 shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Kuch Poochna Hai?</h2>
              <p className="text-xl mb-10 opacity-90">Hum hamesha aapki madad ke liye taiyar hain.</p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <a 
                  href="https://wa.me/917310382894" 
                  className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> WhatsApp Karein
                </a>
              </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
