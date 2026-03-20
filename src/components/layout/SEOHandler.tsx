"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export const SEOHandler = () => {
  const pathname = usePathname()

  useEffect(() => {
    const updateSEO = async () => {
      // Normalize pathname for matching (ensure it starts with / and ends without / unless it's just /)
      let normalizedPath = pathname
      if (normalizedPath !== "/" && normalizedPath.endsWith("/")) {
        normalizedPath = normalizedPath.slice(0, -1)
      }

      const { data, error } = await supabase
        .from("seo_metadata")
        .select("*")
        .eq("route", normalizedPath)
        .single()

      if (data) {
        // Update Document Title
        if (data.title) {
          document.title = data.title
        }

        // Update Meta Description
        if (data.meta_description) {
          let descTag = document.querySelector('meta[name="description"]')
          if (!descTag) {
            descTag = document.createElement('meta')
            descTag.setAttribute('name', 'description')
            document.head.appendChild(descTag)
          }
          descTag.setAttribute('content', data.meta_description)
        }

        // Update Keywords
        if (data.keywords) {
          let keywordsTag = document.querySelector('meta[name="keywords"]')
          if (!keywordsTag) {
            keywordsTag = document.createElement('meta')
            keywordsTag.setAttribute('name', 'keywords')
            document.head.appendChild(keywordsTag)
          }
          keywordsTag.setAttribute('content', data.keywords)
        }

        // Update Open Graph Image
        if (data.og_image) {
          let ogImageTag = document.querySelector('meta[property="og:image"]')
          if (!ogImageTag) {
            ogImageTag = document.createElement('meta')
            ogImageTag.setAttribute('property', 'og:image')
            document.head.appendChild(ogImageTag)
          }
          ogImageTag.setAttribute('content', data.og_image)
        }

        // Handle JSON-LD Structured Data
        if (data.structured_data) {
          let scriptTag = document.querySelector('script[type="application/ld+json"]')
          if (!scriptTag) {
            scriptTag = document.createElement('script')
            scriptTag.setAttribute('type', 'application/ld+json')
            document.head.appendChild(scriptTag)
          }
          scriptTag.innerHTML = JSON.stringify(data.structured_data)
        }
      }
    }

    updateSEO()
  }, [pathname])

  return null // This component doesn't render anything
}
