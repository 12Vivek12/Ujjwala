"use client"

import { motion } from "framer-motion"
import { Sparkles, Mail, Lock, User, Phone, ArrowRight, Chrome } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background/30 pt-32 pb-20 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-primary/5"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-3">
              <Sparkles size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-secondary mb-2">Create Account</h1>
            <p className="text-foreground/50">Join Gorakhpur&apos;s best home services</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-4 bg-background/50 border border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={20} />
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000"
                  className="w-full pl-12 pr-4 py-4 bg-background/50 border border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={20} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-background/50 border border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={20} />
                <input 
                  type="password" 
                  placeholder="Minimum 8 characters"
                  className="w-full pl-12 pr-4 py-4 bg-background/50 border border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <button className="w-full bg-secondary hover:bg-primary text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-2 group">
              Register <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-foreground/50">
            Already have an account? <Link href="/signin" className="text-primary font-black hover:underline">Sign In Instead</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
