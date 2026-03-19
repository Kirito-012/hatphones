"use client";

import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="relative w-full py-32 px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-t-2 border-b-2 border-zinc-900 dark:border-white/20 overflow-hidden">
      {/* Background abstract layout lines */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(currentColor 2px, transparent 2px), linear-gradient(90deg, currentColor 2px, transparent 2px)", backgroundSize: "40px 40px" }} />
        
      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-4 border-transparent dark:border-zinc-900 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] mb-10 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-5xl font-black">H</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
            Ready to <br/>
            <span className="inline-block px-4 py-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-4 border-transparent dark:border-zinc-900 transform rotate-2">
              Upgrade?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl font-medium text-zinc-400 dark:text-zinc-600 max-w-2xl mx-auto mb-12">
            Get an instant valuation for your current device or browse our curated collection of pristine tech.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-2 border-transparent dark:border-zinc-900 font-black text-lg tracking-widest uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] dark:shadow-[8px_8px_0px_0px_rgba(24,24,27,0.3)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.5)] dark:hover:shadow-[12px_12px_0px_0px_rgba(24,24,27,0.5)] hover:-translate-y-1 hover:-translate-x-1 transition-all w-full sm:w-auto"
            >
              Get Valuation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent text-white dark:text-zinc-900 border-4 border-white dark:border-zinc-900 font-black text-lg tracking-widest uppercase hover:bg-white/10 dark:hover:bg-zinc-900/10 transition-colors w-full sm:w-auto"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
