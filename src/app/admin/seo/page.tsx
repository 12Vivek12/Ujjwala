"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Globe, Save, Loader2, Plus, Trash2, Search, Info } from "lucide-react"
import { motion } from "framer-motion"

export default function SEOPage() {
  const [configs, setConfigs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<any>(null)

  useEffect(() => {
    fetchConfigs()
  }, [])

  const fetchConfigs = async () => {
    setLoading(true)
    const { data } = await supabase.from("seo_metadata").select("*")
    if (data) setConfigs(data)
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase
      .from("seo_metadata")
      .upsert(selectedRoute)
    
    if (!error) {
      fetchConfigs()
      setSelectedRoute(null)
    }
    setSaving(false)
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-secondary tracking-tight">SEO Engine 🚀</h2>
          <p className="text-gray-500 font-bold">Optimize how Google sees Ujjwala Services.</p>
        </div>
        <button 
          onClick={() => setSelectedRoute({ route: "", title: "", meta_description: "", keywords: "" })}
          className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95"
        >
          <Plus size={20} /> Add New Route
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Route List */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Managed Routes</h3>
             <div className="space-y-2">
                {configs.map((config) => (
                  <button
                    key={config.id}
                    onClick={() => setSelectedRoute(config)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between group ${
                      selectedRoute?.id === config.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-gray-50 text-secondary"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                       <Globe size={16} className={selectedRoute?.id === config.id ? "text-white" : "text-primary"} />
                       {config.route}
                    </span>
                    <Search size={14} className="opacity-0 group-hover:opacity-50" />
                  </button>
                ))}
                
                {configs.length === 0 && !loading && (
                   <p className="text-xs text-gray-400 p-4 text-center">No SEO routes defined yet.</p>
                )}
             </div>
          </div>

          <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100/50">
             <div className="flex items-start gap-3">
                <Info size={20} className="text-primary shrink-0 mt-1" />
                <p className="text-xs font-bold text-primary/80 leading-relaxed">
                   SEO changes yahan save karne ke baad immediate asar karenge, lekin Google search results update hone mein kuch din lag sakte hain.
                </p>
             </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
           {selectedRoute ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8"
              >
                  <div className="flex justify-between items-center">
                     <h3 className="text-xl font-black text-secondary">
                        Editing: <span className="text-primary">{selectedRoute.route || "New Route"}</span>
                     </h3>
                     <button 
                       onClick={async () => {
                          if (selectedRoute.id && confirm("Delete SEO config?")) {
                             await supabase.from("seo_metadata").delete().eq("id", selectedRoute.id)
                             fetchConfigs()
                             setSelectedRoute(null)
                          }
                       }}
                       className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                     >
                        <Trash2 size={20} />
                     </button>
                  </div>

                  <form onSubmit={handleSave} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-widest text-gray-400">Route URL</label>
                           <input 
                              required
                              className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary"
                              placeholder="/services"
                              value={selectedRoute.route}
                              onChange={e => setSelectedRoute({...selectedRoute, route: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-widest text-gray-400">Page Title</label>
                           <input 
                              required
                              className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary"
                              placeholder="Gorakhpur Best Salons"
                              value={selectedRoute.title}
                              onChange={e => setSelectedRoute({...selectedRoute, title: e.target.value})}
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Meta Description</label>
                        <textarea 
                           rows={3}
                           className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary resize-none"
                           placeholder="Summarize the page content for search engines..."
                           value={selectedRoute.meta_description}
                           onChange={e => setSelectedRoute({...selectedRoute, meta_description: e.target.value})}
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Keywords (Comma separated)</label>
                        <input 
                           className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-secondary"
                           placeholder="beauty, salon, gorakhpur, bridal"
                           value={selectedRoute.keywords}
                           onChange={e => setSelectedRoute({...selectedRoute, keywords: e.target.value})}
                        />
                     </div>

                     <div className="pt-4 flex gap-4">
                        <button 
                           type="submit"
                           disabled={saving}
                           className="flex-grow bg-primary py-5 rounded-2xl font-black text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2"
                        >
                           {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                           {saving ? "Saving..." : "Save SEO Config"}
                        </button>
                        <button 
                           type="button"
                           onClick={() => setSelectedRoute(null)}
                           className="px-8 bg-gray-100 py-5 rounded-2xl font-black text-secondary hover:bg-gray-200 transition-colors"
                        >
                           Cancel
                        </button>
                     </div>
                  </form>
              </motion.div>
           ) : (
              <div className="h-[500px] border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-gray-300">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                     <Globe size={40} />
                  </div>
                  <h3 className="text-xl font-black mb-2">Select a Route</h3>
                  <p className="font-bold">Managed routes are listed on the left.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  )
}
