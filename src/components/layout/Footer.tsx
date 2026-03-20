import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold">Ujjwala Services</span>
            </div>
            <p className="text-white/70">
              Gorakhpur ki sabse bharosemand home service provider. Hum laate hain quality aur convenience seedhe aapke ghar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/#services" className="text-white/70 hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="https://wa.me/917310382894" className="text-white/70 hover:text-primary transition-colors">Book Now</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-primary transition-colors">About Ujjwala</Link></li>
            </ul>
          </div>

          {/* New Event-Focused Services in Footer */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Specialties</h3>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/#services" className="hover:text-primary transition-colors">Bridal Makeup</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Engagement Styling</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Mehndi Specials</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Event & Party Makeup</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0 mt-1" />
                <a 
                  href="https://maps.app.goo.gl/X3DWHgN6DAFGDKJq5" 
                  target="_blank" 
                  className="hover:text-primary transition-colors text-sm leading-relaxed"
                >
                  Ujjwala, Tiwari Homeo Hall, 267X, Buddh Nagar, Rustampur, Azad Nagar Colony Taramandal Road, Gali, near Panchmukhi Hanuman Mandir, Gorakhpur, Uttar Pradesh 273016
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="https://wa.me/917310382894" target="_blank" className="hover:text-primary transition-colors">+91 73103 82894</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <span>ujjwala.services@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Ujjwala Services. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/admin/dashboard" className="text-white/30 hover:text-white transition-colors">Admin Portal</Link>
            <Link href="/privacy" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/50 hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"
