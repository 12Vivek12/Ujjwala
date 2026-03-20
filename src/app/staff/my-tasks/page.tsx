"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Calendar, MapPin, CheckCircle2, Phone, Sparkles, Loader2, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function StaffMyTasks() {
  const [phone, setPhone] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [staffInfo, setStaffInfo] = useState<any>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { data, error } = await supabase
      .from("staff")
      .select("*")
      .eq("phone", phone)
      .eq("is_active", true)
      .single()

    if (data) {
      setStaffInfo(data)
      setIsLoggedIn(true)
      fetchTasks(data.id)
    } else {
      alert("Invalid Phone Number or Staff Inactive.")
    }
    setLoading(false)
  }

  const fetchTasks = async (staffId: string) => {
    setLoading(true)
    const { data } = await supabase
      .from("bookings")
      .select(`
        *,
        services:service_id (title)
      `)
      .eq("assigned_staff_id", staffId)
      .order("created_at", { ascending: false })
    
    if (data) setTasks(data)
    setLoading(false)
  }

  const markComplete = async (taskId: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "completed" })
      .eq("id", taskId)
    
    if (!error && staffInfo) fetchTasks(staffInfo.id)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[48px] shadow-2xl w-full max-w-md border border-white"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
             <Sparkles size={40} className="text-primary" />
          </div>
          <h2 className="text-3xl font-black text-secondary text-center mb-2 tracking-tight">Staff Portal</h2>
          <p className="text-gray-400 font-bold text-center mb-10">Apna register mobile number dalein.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary outline-none font-bold text-secondary transition-all"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-secondary py-5 rounded-2xl font-black text-white shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      <header className="bg-white px-8 py-10 rounded-b-[48px] shadow-sm mb-8 border-b border-gray-100">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">Good Morning,</span>
            <h2 className="text-3xl font-black text-secondary tracking-tight">{staffInfo.name} ✨</h2>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-xs font-black text-gray-400 uppercase">Logout</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-6">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-black text-secondary">Assigned Duties</h3>
           <button onClick={() => fetchTasks(staffInfo.id)} className="text-primary text-xs font-black uppercase">Refresh</button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
             <Loader2 size={32} className="animate-spin mb-4" />
             <p className="font-bold">Syncing duties...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white p-12 rounded-[40px] border border-gray-100 text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Calendar size={28} className="text-gray-200" />
             </div>
             <h4 className="font-black text-secondary mb-2">No duties assigned yet.</h4>
             <p className="text-gray-400 text-sm font-bold">Admin se baat karein agar aap working hain.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 px-6 py-2 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-bl-3xl">
                    {task.status}
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                         {task.services?.title || "Special Service"}
                      </div>
                      <h4 className="text-2xl font-black text-secondary leading-tight">{task.customer_name}</h4>
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                            <MapPin size={16} className="text-primary" /> {task.location || "Gorakhpur Area"}
                         </div>
                         <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                            <Phone size={16} /> <a href={`tel:${task.customer_phone}`} className="hover:underline">{task.customer_phone}</a>
                         </div>
                      </div>
                    </div>

                    <div className="w-full md:w-auto mt-4 md:mt-0 flex gap-3">
                       {task.status !== "completed" ? (
                         <button 
                           onClick={() => markComplete(task.id)}
                           className="flex-grow md:flex-initial bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                         >
                           <CheckCircle2 size={20} /> Mark Started
                         </button>
                       ) : (
                         <div className="flex items-center gap-2 text-green-600 font-black">
                            <CheckCircle2 size={24} /> Job Done
                         </div>
                       )}
                       <a 
                        href={`https://wa.me/91${task.customer_phone}`} 
                        className="p-4 bg-green-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all"
                       >
                          <Sparkles size={24} />
                       </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}
