"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const photos = [
  "2022-12-04 (1).webp",
  "2022-12-04 (2).webp",
  "2022-12-04.webp",
  "2022-12-05.webp",
  "2023-04-27 (1).webp",
  "2023-04-27 (10).webp",
  "2023-04-27 (11).webp",
  "2023-04-27 (12).webp",
  "2023-04-27 (13).webp",
  "2023-04-27 (14).webp",
  "2023-04-27 (15).webp",
  "2023-04-27 (16).webp",
  "2023-04-27 (17).webp",
  "2023-04-27 (2).webp",
  "2023-04-27 (3).webp",
  "2023-04-27 (4).webp",
  "2023-04-27 (5).webp",
  "2023-04-27 (6).webp",
  "2023-04-27 (7).webp",
  "2023-04-27 (8).webp",
  "2023-04-27 (9).webp",
  "2023-04-27.webp",
  "2023-12-28 (1).webp",
  "2023-12-28.webp",
  "unnamed (1).webp",
  "unnamed.webp"
]

export const PhotoSlider = () => {
  // Triple the photos to ensure smooth infinite scroll
  const displayPhotos = [...photos, ...photos, ...photos]

  return (
    <section className="py-12 bg-background overflow-hidden min-h-[400px]">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Humara Kaam (Our Work)</h2>
        <div className="w-20 h-1.5 bg-primary rounded-full mt-2" />
      </div>
      
      <div className="relative flex overflow-hidden group">
        <motion.div
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex gap-4 px-4 whitespace-nowrap"
        >
          {displayPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-4 border-white"
            >
              <Image
                src={`/photos/${photo}`}
                alt={`Ujjwala Makeover Work ${index}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
