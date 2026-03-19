"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Instant Valuation",
    description: "Use our intelligent pricing engine to get an accurate, market-driven quote for your device in seconds, not days.",
    icon: Zap,
    color: "text-zinc-900 dark:text-white",
    bg: "bg-white dark:bg-zinc-950",
  },
  {
    id: "02",
    title: "Secure Handoff",
    description: "Choose between fully-insured free shipping or drop it off at one of our certified premium partner locations.",
    icon: ShieldCheck,
    color: "text-zinc-900 dark:text-white",
    bg: "bg-white dark:bg-zinc-950",
  },
  {
    id: "03",
    title: "Immediate Payment",
    description: "Once verified, your payment is released instantly via direct deposit, crypto, or instant transfer.",
    icon: CheckCircle2,
    color: "text-zinc-900 dark:text-white",
    bg: "bg-white dark:bg-zinc-950",
  }
];

export function Process() {
  return (
    <section className="relative w-full py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-start">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 lg:sticky lg:top-40 pt-4 flex flex-col gap-6">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               className="inline-flex items-center gap-2 px-4 py-2 border-2 border-zinc-900 dark:border-white/20 bg-white dark:bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] self-start"
             >
               <span className="w-2.5 h-2.5 bg-zinc-900 dark:bg-white animate-pulse border border-zinc-900 dark:border-white"></span>
               <span className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest">How it works</span>
             </motion.div>
             
             <motion.h2 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white leading-[1.1] tracking-tight uppercase"
             >
               Frictionless.<br />
               <span className="text-zinc-500 dark:text-zinc-500">
                 From start to finish.
               </span>
             </motion.h2>
             
             <motion.p 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.2 }}
               className="text-lg text-zinc-600 dark:text-zinc-400 mt-4 max-w-sm"
             >
               We have engineered our entire pipeline to remove the anxiety and wait times usually associated with the secondary tech market.
             </motion.p>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 lg:pl-20 xl:pl-32 flex flex-col gap-12 lg:gap-24 lg:pt-32 pb-32">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
                  className="relative flex flex-col md:flex-row gap-8 items-start group"
                >
                  {/* Abstract Step Number */}
                  <div className="hidden md:flex absolute -left-16 top-0 w-32 h-32 md:-left-24 lg:-left-32 text-[140px] font-black pointer-events-none opacity-[0.03] dark:opacity-[0.05] text-zinc-900 dark:text-white select-none transition-transform duration-700 group-hover:-translate-y-4">
                    {step.id}
                  </div>

                  {/* Icon Block */}
                  <div className={`shrink-0 w-20 h-20 ${step.bg} border-2 border-zinc-900 dark:border-white/20 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] dark:group-hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]`}>
                    <Icon size={36} className={step.color} strokeWidth={2.5} />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 flex-1 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-white/20 p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] dark:group-hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.15)] transition-all duration-300">
                     <div className="flex justify-between items-center mb-6 border-b-2 border-zinc-900 dark:border-white/10 pb-4">
                       <h3 className="text-2xl lg:text-3xl font-black text-zinc-900 dark:text-white tracking-tight uppercase">
                         {step.title}
                       </h3>
                       <span className="text-sm font-mono font-black text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 border-2 border-zinc-900 dark:border-white/20">
                         {step.id}
                       </span>
                     </div>
                     <p className="text-lg text-zinc-700 dark:text-zinc-400 leading-relaxed font-medium">
                       {step.description}
                     </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
