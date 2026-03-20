"use client"

import { motion } from "framer-motion"
import { Sparkles, Mail, Lock, User, Phone, ArrowRight, Chrome } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-[40px] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-primary/5"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
              <Sparkles size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-secondary mb-2">Welcome Back</h1>
            <p className="text-foreground/50">Login to manage your bookings</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={20} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-background/50 border border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-sm font-bold text-secondary">Password</label>
                <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-background/50 border border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-medium"
                />
              </div>
            </div>

            <button className="w-full bg-secondary hover:bg-primary text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-secondary/10 flex items-center justify-center gap-2 group">
              Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-primary/5" />
            <span className="relative z-10 bg-white px-4 text-xs font-bold text-foreground/30 uppercase tracking-widest">Or Continue With</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 border-2 border-primary/5 rounded-2xl font-bold text-secondary hover:bg-background transition-all group">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-background group-hover:bg-white transition-colors">
                <Chrome size={16} className="text-primary" />
              </div>
              Google Account
            </button>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-foreground/50">
            New here? <Link href="/signup" className="text-primary font-black hover:underline">Create an Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
