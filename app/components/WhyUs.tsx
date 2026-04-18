"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, RefreshCcw, Tag, Truck, Eye, Award } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const reasons = [
  {
    title: "Fully Tested",
    description: "Every device is carefully checked by our team before it goes on the shelf.",
    icon: ShieldCheck,
    accent: "from-indigo-500 to-indigo-700",
    color: "text-indigo-500 dark:text-indigo-400",
  },
  {
    title: "15 Days Return",
    description: "Not satisfied? Return it within 15 days, no questions asked.",
    icon: RefreshCcw,
    accent: "from-emerald-500 to-emerald-700",
    color: "text-emerald-500 dark:text-emerald-400",
  },
  {
    title: "Fair Prices",
    description: "We offer competitive rates for both buying and selling, locally.",
    icon: Tag,
    accent: "from-amber-500 to-orange-600",
    color: "text-amber-500 dark:text-amber-400",
  },
  {
    title: "Free Delivery",
    description: "Fast, fully-insured delivery on all phones, completely free.",
    icon: Truck,
    accent: "from-violet-500 to-violet-700",
    color: "text-violet-500 dark:text-violet-400",
  },
  {
    title: "Honest Service",
    description: "No hidden fees. We'll always give you the straight answer on any repair.",
    icon: Eye,
    accent: "from-rose-500 to-rose-700",
    color: "text-rose-500 dark:text-rose-400",
  },
  {
    title: "1 Year Warranty",
    description: "1 yr warranty on all devices above $200 for absolute peace of mind.",
    icon: Award,
    accent: "from-teal-500 to-teal-700",
    color: "text-teal-500 dark:text-teal-400",
  },
];

export function WhyUs() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950 z-0">
      <div className="container mx-auto max-w-7xl">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="inline-flex items-center justify-center px-4 py-2 border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 rounded-full shadow-sm mb-6">
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Why Choose Us?</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Honest &amp; Reliable<br />
              <span className="text-zinc-400 dark:text-zinc-600">Service.</span>
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xs text-sm leading-relaxed md:text-right">
            Six reasons Medicine Hat trusts Hat Phones for their device needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {reasons.map((reason, i) => {
            const isHovered = hovered === i;
            const isRightCol = i % 2 === 1;
            const isLastRow = i >= reasons.length - 2;

            return (
              // Outer div: hover dimming via CSS opacity (separate from framer-motion)
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={[
                  "relative cursor-default transition-opacity duration-300",
                  "opacity-100",
                  !isRightCol ? "md:border-r border-zinc-100 dark:border-white/5" : "",
                  !isLastRow ? "border-b border-zinc-100 dark:border-white/5" : "",
                ].join(" ")}
              >
                {/* ScrollReveal: scroll animation on a child so CSS + JS opacity don't conflict */}
                <ScrollReveal delay={(i % 2) * 0.08} className="flex gap-5 lg:gap-7 p-8 lg:p-10">
                  {/* Large muted number */}
                  <div
                    className={[
                      "text-7xl lg:text-8xl font-black leading-none select-none shrink-0 transition-colors duration-300",
                      isHovered ? reason.color : "text-zinc-100 dark:text-zinc-800",
                    ].join(" ")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex flex-col justify-center min-w-0 pt-2">
                    {/* Animated accent bar */}
                    <motion.div
                      className={`h-0.5 mb-4 bg-gradient-to-r ${reason.accent} rounded-full origin-left`}
                      animate={{ scaleX: isHovered ? 2 : 1, width: isHovered ? 48 : 24 }}
                      style={{ width: 24 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <h3 className="text-xl lg:text-2xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
