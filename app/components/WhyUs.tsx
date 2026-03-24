"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RefreshCcw, Tag, Truck, Eye, Award } from "lucide-react";

const reasons = [
  {
    title: "Fully Tested",
    description: "Every device is carefully checked by our team before it goes on the shelf.",
    icon: ShieldCheck,
    accent: "from-indigo-500 to-indigo-700",
    iconBg: "bg-indigo-100 dark:bg-indigo-500/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "15 Days Return",
    description: "Not satisfied? Return it within 15 days, no questions asked.",
    icon: RefreshCcw,
    accent: "from-emerald-500 to-emerald-700",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Fair Prices",
    description: "We offer competitive rates for both buying and selling, locally.",
    icon: Tag,
    accent: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Free Delivery",
    description: "Fast, fully-insured delivery on all phones, completely free.",
    icon: Truck,
    accent: "from-violet-500 to-violet-700",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Honest Service",
    description: "No hidden fees. We'll always give you the straight answer on any repair.",
    icon: Eye,
    accent: "from-rose-500 to-rose-700",
    iconBg: "bg-rose-100 dark:bg-rose-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "1 Year Warranty",
    description: "1 yr warranty on all devices above $200 for absolute peace of mind.",
    icon: Award,
    accent: "from-teal-500 to-teal-700",
    iconBg: "bg-teal-100 dark:bg-teal-500/20",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
];

export function WhyUs() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950 z-0 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
      <div className="container mx-auto max-w-7xl">

        <div className="flex flex-col items-center justify-center mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 rounded-full shadow-sm mb-6">
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Why Choose Us?</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Honest &amp; Reliable <br className="hidden md:block" /> Service.
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group relative overflow-hidden p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 flex flex-col items-start hover:shadow-lg transition-all duration-300"
              >
                {/* Subtle top gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${reason.accent}`} />

                {/* Faint background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />

                <div className={`relative w-14 h-14 rounded-2xl ${reason.iconBg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={reason.iconColor} strokeWidth={2} />
                </div>
                <h3 className="relative text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {reason.title}
                </h3>
                <p className="relative text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
