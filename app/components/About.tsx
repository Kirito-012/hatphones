"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  return (
    <section className="relative w-full py-32 px-6 bg-white dark:bg-zinc-950 border-t-2 border-zinc-900 dark:border-white/20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-0 border-2 border-zinc-900 dark:border-white/20 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
          
          {/* Image Side */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-900 dark:border-white/20">
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src="/about-us.png" 
                alt="Modern Tech Exchange Repair Shop" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Brutalist Badge Overlay */}
            <div className="absolute top-6 left-6 bg-zinc-900 text-white px-4 py-2 font-black text-sm uppercase tracking-widest border-2 border-transparent shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
              Since 2026
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="inline-block px-3 py-1 bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-900 dark:border-white/20 text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-6 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                Behind the scenes
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white leading-[1.05] tracking-tight uppercase mb-8">
                Not your average <span className="text-transparent" style={{ WebkitTextStroke: "2px currentColor" }}>tech shop.</span>
              </h2>

              <div className="space-y-6 text-lg font-medium text-zinc-700 dark:text-zinc-300">
                <p>
                  We grew tired of the murky secondary market. Fake parts, vague pricing, and anxious handoffs. So we built the <strong className="font-black text-zinc-900 dark:text-white">Hatphones Premium Exchange</strong>—a radically transparent ecosystem where precision meets trust.
                </p>
                <p>
                  Every device that passes through our doors is handled by certified technicians in a sterile, state-of-the-art environment. We don't just repair phones; we renew them to exacting factory standards.
                </p>
              </div>

              {/* Stats/Guarantees */}
              <div className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t-2 border-zinc-900 dark:border-white/20">
                <div>
                  <h4 className="text-3xl font-black text-zinc-900 dark:text-white mb-1">50-Pt</h4>
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Inspection</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-zinc-900 dark:text-white mb-1">100%</h4>
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">OEM Parts Only</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
