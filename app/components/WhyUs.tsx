"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RefreshCcw, Tag, Truck, Eye, Award } from "lucide-react";

const reasons = [
  {
    title: "Fully Checked",
    description: "Every device undergoes a rigorous 50-point diagnostic inspection.",
    icon: ShieldCheck,
  },
  {
    title: "15 Days Return",
    description: "Not satisfied? Return it within 15 days, no questions asked.",
    icon: RefreshCcw,
  },
  {
    title: "Lowest Price",
    description: "Our proprietary algorithm ensures you always pay the best market value.",
    icon: Tag,
  },
  {
    title: "Free Delivery",
    description: "Fast, fully-insured delivery on all phones, completely free.",
    icon: Truck,
  },
  {
    title: "100% Transparent",
    description: "No hidden fees, no shady parts. Exactly what you see is what you get.",
    icon: Eye,
  },
  {
    title: "90 Days Warranty",
    description: "Minimum warranty included on all items for absolute peace of mind.",
    icon: Award,
  }
];

export function WhyUs() {
  return (
    <section className="relative w-full py-32 px-6 bg-zinc-50 dark:bg-zinc-900 border-t-2 border-zinc-900 dark:border-white/20 z-0">
      <div className="container mx-auto max-w-7xl">
        
        <div className="flex flex-col items-center justify-center mb-20 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 border-2 border-zinc-900 dark:border-white/20 bg-white dark:bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] mb-6 -rotate-2">
            <span className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest">Why Hatphones?</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter shadow-zinc-900">
            Unmatched <br/> Standards.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="group p-8 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-white/20 flex flex-col items-start shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] dark:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white/20 flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] dark:group-hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300">
                  <Icon size={28} className="text-zinc-900 dark:text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-base text-zinc-700 dark:text-zinc-400 font-medium leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
