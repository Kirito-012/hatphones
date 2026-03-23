"use client";

import { motion } from "framer-motion";
import { Smartphone, Tablet, Watch, Headphones, MonitorSmartphone } from "lucide-react";

const brands = [
  { name: "Apple iPhone", icon: Smartphone, color: "text-zinc-700 dark:text-zinc-300", bg: "bg-zinc-100 dark:bg-zinc-800" },
  { name: "Samsung Galaxy", icon: MonitorSmartphone, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { name: "Google Pixel", icon: Smartphone, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { name: "iPad & Tablets", icon: Tablet, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },

  { name: "Apple Watch", icon: Watch, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { name: "Accessories", icon: Headphones, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" }
];

// Combine and duplicate for seamless looping
const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

export function Brands() {
  return (
    <section className="relative w-full py-12 md:py-16 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-b border-zinc-200 dark:border-white/10 overflow-hidden flex flex-col items-center justify-center">

      <div className="absolute top-0 left-0 w-32 md:w-48 h-full bg-gradient-to-r from-zinc-50/90 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-48 h-full bg-gradient-to-l from-zinc-50/90 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 mb-8 text-center md:text-left relative z-20">
         <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
           Devices We Buy, Sell & Repair
         </p>
      </div>

      <div className="flex w-full overflow-hidden whitespace-nowrap py-4">
        <motion.div
          className="flex items-center gap-6 md:gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40, // Smooth speed
          }}
        >
          {duplicatedBrands.map((brand, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm transition-transform hover:scale-105 cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl ${brand.bg} flex items-center justify-center ${brand.color}`}>
                <brand.icon size={20} />
              </div>
              <span className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}


