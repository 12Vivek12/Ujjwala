"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Plus, Pencil, Trash2, Loader2, UserPlus, Phone, Star, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function StaffPage() {
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<any>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialty: "Makeup Artist",
    is_active: true
  })

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    setLoading(true)
    const { data } = await supabase
      .from("staff")
      .select("*")
      .order("name", { ascending: true })
    
    if (data) setStaff(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (editingStaff) {
      const { error } = await supabase
        .from("staff")
        .update(formData)
        .eq("id", editingStaff.id)
      if (!error) {
        setIsModalOpen(false)
        fetchStaff()
      }
    } else {
      const { error } = await supabase
        .from("staff")
        .insert([formData])
      if (!error) {
        setIsModalOpen(false)
        fetchStaff()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      const { error } = await supabase.from("staff").delete().eq("id", id)
      if (!error) fetchStaff()
    }
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-secondary tracking-tight">Staff Management 👩‍🎨</h2>
          <p className="text-gray-500 font-bold">Manage your team of professional beauticians.</p>
        </div>
        <button 
          onClick={() => {
            setEditingStaff(null)
            setFormData({ name: "", phone: "", specialty: "Makeup Artist", is_active: true })
            setIsModalOpen(true)
          }}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          <UserPlus size={20} /> Add New Staff
        </button>
      </div>

      {loading && !staff.length ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
           <Loader2 className="animate-spin mb-4" size={32} />
           <p className="font-bold">Loading staff directory...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {staff.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative group overflow-hidden flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-4 relative">
                   <span className="text-2xl font-black text-primary">{member.name[0]}</span>
                   {member.is_active && (
                     <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-sm" title="Active" />
                   )}
                </div>
                
                <h3 className="text-xl font-black text-secondary leading-tight">{member.name}</h3>
                <p className="text-primary text-[10px] uppercase font-black tracking-widest mb-4">{member.specialty}</p>
                
                <div className="flex items-center gap-3 text-gray-400 text-sm font-bold mb-6">
                   <Phone size={14} /> {member.phone}
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-auto pt-4 w-full">
                  <button 
                    onClick={() => {
                      setEditingStaff(member)
                      setFormData({
                        name: member.name,
                        phone: member.phone,
                        specialty: member.specialty,
                        is_active: member.is_active
                      })
                      setIsModalOpen(true)
                    }}
                    className="flex-grow py-2.5 bg-blue-50 text-blue-600 rounded-xl font-black text-xs hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-2xl font-black text-secondary tracking-tight">
                {editingStaff ? "Edit Profile" : "Add Staff Member"} ✨
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-secondary p-2 bg-white rounded-full border border-gray-100 shadow-sm">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input 
                  required
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary"
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Priority Phone</label>
                  <input 
                    required
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Specialty</label>
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary appearance-none"
                    value={formData.specialty}
                    onChange={e => setFormData({...formData, specialty: e.target.value})}
                  >
                    <option>Makeup Artist</option>
                    <option>Mehndi Artist</option>
                    <option>Hair Specialist</option>
                    <option>Skin Expert</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                 <input 
                  type="checkbox"
                  id="is_active"
                  className="w-5 h-5 accent-primary"
                  checked={formData.is_active}
                  onChange={e => setFormData({...formData, is_active: e.target.checked})}
                 />
                 <label htmlFor="is_active" className="text-sm font-bold text-secondary">Available for Bookings</label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary py-5 rounded-2xl font-black text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
              >
                {loading ? "Processing..." : editingStaff ? "Update Profile" : "Add to Team"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
