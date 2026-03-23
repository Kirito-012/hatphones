"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, ShieldCheck } from "lucide-react";

export function CTA() {
  return (
    <section className="relative w-full py-14 md:py-20 px-6 overflow-hidden">
      {/* Background with soft grid/pattern */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-600/90 dark:to-blue-800/90 rounded-[2.5rem] p-10 md:p-16 lg:p-20 shadow-2xl"
        >
          {/* Decorative blurred circles for depth */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-300/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-8 shadow-sm"
            >
              <ShieldCheck size={18} className="text-blue-200" />
              <span>100% Local. 100% Reliable.</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Ready for an upgrade?
            </h2>
            
            <p className="text-lg md:text-xl text-indigo-50 max-w-2xl mx-auto mb-10 leading-relaxed">
              Get a fast, fair quote for your old device or browse our selection of certified, high-quality pre-owned phones today. 
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors shadow-lg cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors border border-white/20 cursor-pointer"
              >
                <Smartphone size={18} />
                <span>Browse Phones</span>
              </motion.button>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
