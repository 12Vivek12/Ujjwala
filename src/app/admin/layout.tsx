"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Scissors, Globe, LogOut, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Services (CMS)", href: "/admin/cms", icon: Scissors },
  { label: "SEO Manager", href: "/admin/seo", icon: Globe },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 rotate-3">
            <span className="text-white font-black text-xl font-serif italic">U</span>
          </div>
          <span className="font-black text-secondary tracking-tight">Admin Portal</span>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                pathname === item.href 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-gray-500 hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon size={18} />
              {item.label}
              {pathname === item.href && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <h1 className="text-xl font-black text-secondary tracking-tight">
            Ujjwala <span className="text-primary italic">Makeover</span>
          </h1>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">
                System Active
             </div>
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-secondary">
                <span className="font-bold text-xs">V</span>
             </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
