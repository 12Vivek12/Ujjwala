"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Plus, Pencil, Trash2, Loader2, Sparkles, Scissors, Image as ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CMSPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Salon Specials",
    price: "",
    icon: "Star",
    is_active: true
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (data) setServices(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update(formData)
        .eq("id", editingService.id)
      if (!error) {
        setIsModalOpen(false)
        fetchServices()
      }
    } else {
      const { error } = await supabase
        .from("services")
        .insert([formData])
      if (!error) {
        setIsModalOpen(false)
        fetchServices()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const { error } = await supabase.from("services").delete().eq("id", id)
      if (!error) fetchServices()
    }
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-secondary tracking-tight">Services CMS ✍️</h2>
          <p className="text-gray-500 font-bold">Manage your beauty treatments and pricing.</p>
        </div>
        <button 
          onClick={() => {
            setEditingService(null)
            setFormData({ title: "", description: "", category: "Salon Specials", price: "", icon: "Star", is_active: true })
            setIsModalOpen(true)
          }}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          <Plus size={20} /> Add New Service
        </button>
      </div>

      {loading && !services.length ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
           <Loader2 className="animate-spin mb-4" size={32} />
           <p className="font-bold">Fetching services...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative group overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Scissors size={24} />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setEditingService(service)
                        setFormData({
                          title: service.title,
                          description: service.description,
                          category: service.category,
                          price: service.price,
                          icon: service.icon,
                          is_active: service.is_active
                        })
                        setIsModalOpen(true)
                      }}
                      className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-secondary mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-4">{service.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-primary font-black">{service.price || "Contact for Price"}</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-gray-300">{service.category}</span>
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
                {editingService ? "Edit Service" : "Add Service"} ✨
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-secondary p-2 bg-white rounded-full border border-gray-100 shadow-sm">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Service Title</label>
                <input 
                  required
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary"
                  placeholder="e.g. Bridal Glow Facial"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Salon Specials</option>
                    <option>Skin & Facials</option>
                    <option>Hair Artistry</option>
                    <option>Makeup & Bridal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Price</label>
                  <input 
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary"
                    placeholder="e.g. ₹2,999"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary resize-none"
                  placeholder="Tell customers what's special about this treatment..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary py-5 rounded-2xl font-black text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
              >
                {loading ? "Saving Changes..." : editingService ? "Update Service" : "Create Service"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
