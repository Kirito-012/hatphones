"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RefreshCcw, Tag, Truck, Eye, Award } from "lucide-react";

const reasons = [
  {
    title: "Fully Tested",
    description: "Every device is carefully checked by our team before it goes on the shelf.",
    icon: ShieldCheck,
  },
  {
    title: "15 Days Return",
    description: "Not satisfied? Return it within 15 days, no questions asked.",
    icon: RefreshCcw,
  },
  {
    title: "Fair Prices",
    description: "We offer competitive rates for both buying and selling, locally.",
    icon: Tag,
  },
  {
    title: "Free Delivery",
    description: "Fast, fully-insured delivery on all phones, completely free.",
    icon: Truck,
  },
  {
    title: "Honest Service",
    description: "No hidden fees. We'll always give you the straight answer on any repair.",
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
    <section className="relative w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950 z-0">
      <div className="container mx-auto max-w-7xl">
        
        <div className="flex flex-col items-center justify-center mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 rounded-full shadow-sm mb-6">
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Why Choose Us?</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Honest & Reliable <br className="hidden md:block"/> Service.
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
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 flex flex-col items-start hover:shadow-md hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
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

