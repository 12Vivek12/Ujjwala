"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Users, Calendar, Scissors, TrendingUp, Sparkles, MapPin, CheckCircle2, Clock, UserCheck, Loader2, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([
    { label: "Active Services", value: "...", icon: Scissors, iconColor: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Bookings", value: "...", icon: Calendar, iconColor: "text-green-600", bg: "bg-green-50" },
    { label: "Active Staff", value: "...", icon: Users, iconColor: "text-pink-600", bg: "bg-pink-50" },
    { label: "Pending Jobs", value: "...", icon: Clock, iconColor: "text-amber-600", bg: "bg-amber-50" },
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    
    // Fetch Bookings
    const { data: bData } = await supabase
      .from("bookings")
      .select(`
        *,
        services:service_id (title),
        staff:assigned_staff_id (name)
      `)
      .order("created_at", { ascending: false })
    
    // Fetch Staff for assignment
    const { data: sData } = await supabase
      .from("staff")
      .select("*")
      .eq("is_active", true)

    // Fetch Services Count
    const { count: sCount } = await supabase.from("services").select("*", { count: 'exact', head: true })

    if (bData) setBookings(bData)
    if (sData) setStaff(sData)

    // Update Stats
    setStats([
      { label: "Active Services", value: sCount?.toString() || "0", icon: Scissors, iconColor: "text-blue-600", bg: "bg-blue-50" },
      { label: "Total Bookings", value: bData?.length.toString() || "0", icon: Calendar, iconColor: "text-green-600", bg: "bg-green-50" },
      { label: "Active Staff", value: sData?.length.toString() || "0", icon: Users, iconColor: "text-pink-600", bg: "bg-pink-50" },
      { label: "Pending Jobs", value: bData?.filter(b => b.status === "pending").length.toString() || "0", icon: Clock, iconColor: "text-amber-600", bg: "bg-amber-50" },
    ])

    setLoading(false)
  }

  const handleAssign = async (bookingId: string, staffId: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ assigned_staff_id: staffId || null, status: staffId ? "assigned" : "pending" })
      .eq("id", bookingId)
    
    if (!error) fetchData()
  }

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId)
    
    if (!error) fetchData()
  }

  return (
    <div className="space-y-10 font-sans pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-secondary tracking-tight">Vese... Admin! 👋</h2>
          <p className="text-gray-500 font-bold">Gorakhpur ke business par ek nazar.</p>
        </div>
        <div className="text-right">
           <span className="text-xs uppercase font-black text-primary tracking-widest block mb-1">System Health</span>
           <span className="flex items-center gap-2 text-green-600 font-black">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" /> Live & Booking
           </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className={stat.iconColor} size={28} />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
              <h3 className="text-3xl font-black text-secondary">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Duty Chart / Bookings Table */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm min-h-[500px] relative overflow-hidden">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-secondary flex items-center gap-2">
                   Duty Chart <Sparkles size={22} className="text-primary" />
                </h3>
                <div className="flex gap-4">
                  <button onClick={fetchData} className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <Clock size={18} className="text-gray-400" />
                  </button>
                </div>
             </div>
             
             {loading ? (
               <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                  <Loader2 size={40} className="animate-spin mb-4 text-primary" />
                  <p className="font-bold">Syncing data with cloud...</p>
               </div>
             ) : bookings.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                  <Calendar size={48} className="mb-4 opacity-10" />
                  <p className="font-bold uppercase tracking-widest text-sm">No recent bookings</p>
               </div>
             ) : (
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-50">
                       <th className="pb-6 px-4">Customer</th>
                       <th className="pb-6 px-4">Service</th>
                       <th className="pb-6 px-4">Duty Agent</th>
                       <th className="pb-6 px-4">Status</th>
                       <th className="pb-6 px-4">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {bookings.map((booking) => (
                       <tr key={booking.id} className="group hover:bg-gray-50/50 transition-colors">
                         <td className="py-6 px-4">
                           <div className="font-black text-secondary">{booking.customer_name}</div>
                           <div className="text-xs text-gray-400 font-bold">{booking.customer_phone}</div>
                         </td>
                         <td className="py-6 px-4">
                           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                              {booking.services?.title || "Custom Service"}
                           </div>
                         </td>
                         <td className="py-6 px-4">
                           <select 
                             className={cn(
                               "px-4 py-2 bg-gray-50 rounded-xl text-xs font-black outline-none border-2 border-transparent focus:border-primary transition-all appearance-none cursor-pointer",
                               booking.assigned_staff_id && "text-blue-600 bg-blue-50"
                             )}
                             value={booking.assigned_staff_id || ""}
                             onChange={(e) => handleAssign(booking.id, e.target.value)}
                           >
                             <option value="">Assign Staff...</option>
                             {staff.map(s => (
                               <option key={s.id} value={s.id}>{s.name} ({s.specialty})</option>
                             ))}
                           </select>
                         </td>
                         <td className="py-6 px-4">
                           <span className={cn(
                             "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                             booking.status === "completed" ? "bg-green-100 text-green-700" : 
                             booking.status === "assigned" ? "bg-blue-100 text-blue-700" :
                             "bg-amber-100 text-amber-700"
                           )}>
                             {booking.status}
                           </span>
                         </td>
                         <td className="py-6 px-4">
                            <div className="flex gap-2">
                              {booking.status !== "completed" && (
                                <button 
                                  onClick={() => handleStatusUpdate(booking.id, "completed")}
                                  className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                  title="Mark Completed"
                                >
                                  <CheckCircle2 size={18} />
                                </button>
                              )}
                              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                <MapPin size={18} />
                              </button>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             )}
          </div>
        </div>

        {/* Sidebar Status/Shortcuts */}
        <div className="space-y-8">
           <div className="bg-secondary text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
              <h3 className="text-xl font-black mb-4 relative z-10 flex items-center gap-2">
                Staff Status <UserCheck size={20} className="text-primary" />
              </h3>
              <div className="space-y-4 relative z-10">
                {staff.slice(0, 3).map(s => (
                  <div key={s.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <div className="text-sm font-bold opacity-80">{s.name}</div>
                    <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                  </div>
                ))}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
           </div>

           <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm">
             <h3 className="text-lg font-black text-secondary mb-6 tracking-tight">System Info</h3>
             <div className="space-y-6">
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Supabase Engine</div>
                   <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                      <ShieldCheck size={16} /> Connection Secure
                   </div>
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Sync Latency</div>
                   <div className="font-bold text-secondary text-sm">~45ms</div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
