"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Quick Quotes",
    description: "Get a fair, market-based offer for your device in minutes. We'll give you a straight answer without the hassle.",
    icon: Zap,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
  },
  {
    id: "02",
    title: "Easy Drop-off",
    description: "Bring your phone by our friendly local shop or ship it to us for free. We make handing over your device safe and simple.",
    icon: ShieldCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    id: "03",
    title: "Cash or E-transfer",
    description: "Get paid quickly and securely via cash or transfer the same day we check your device. No waiting around.",
    icon: CheckCircle2,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  }
];

export function Process() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 lg:sticky lg:top-40 pt-4 flex flex-col gap-6">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm self-start"
             >
               <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
               <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">How it works</span>
             </motion.div>
             
             <motion.h2 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tight"
             >
               Simple. &<br />
               <span className="text-zinc-500 dark:text-zinc-500">
                 Easy Process.
               </span>
             </motion.h2>
             
             <motion.p 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.2 }}
               className="text-lg text-zinc-600 dark:text-zinc-400 mt-2 max-w-sm"
             >
               We make buying, selling, and repairing your phone as straightforward as possible. No complicated hoops to jump through.
             </motion.p>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 lg:pl-16 flex flex-col gap-8 lg:pt-20 pb-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.5 }}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start group"
                >
                  {/* Abstract Step Number */}
                  <div className="hidden md:flex absolute -left-12 top-0 w-32 h-32 md:-left-20 text-[100px] font-bold pointer-events-none text-zinc-100 dark:text-zinc-800/50 select-none transition-transform duration-700 group-hover:-translate-y-2">
                    {step.id}
                  </div>

                  {/* Icon Block */}
                  <div className={`shrink-0 w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110`}>
                    <Icon size={32} className={step.color} strokeWidth={2} />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 flex-1 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/10 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                         {step.title}
                       </h3>
                     </div>
                     <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
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

