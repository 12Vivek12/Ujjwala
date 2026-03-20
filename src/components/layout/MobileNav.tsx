"use client"

import { Home, Scissors, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Scissors },
  { label: "Book Now", href: "https://wa.me/917310382894", icon: MessageSquare, isExternal: true },
  { label: "Account", href: "/signin", icon: User },
]

export const MobileNav = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-6 pt-3 px-4 bg-white/80 backdrop-blur-lg border-t border-primary/5 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Comp = item.isExternal ? "a" : Link
          
          return (
            <Comp
              key={item.label}
              href={item.href}
              {...(item.isExternal ? { target: "_blank" } : {})}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
                isActive 
                  ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20 rotate-0" 
                  : "text-foreground/40 group-hover:text-primary group-hover:bg-primary/10"
              )}>
                <item.icon size={22} className={cn(
                  "transition-transform",
                  isActive && "animate-pulse"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-bold tracking-tight uppercase",
                isActive ? "text-primary" : "text-foreground/30"
              )}>
                {item.label}
              </span>
            </Comp>
          )
        })}
      </div>
    </nav>
  )
}
