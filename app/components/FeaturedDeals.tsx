"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const deals = [
  {
    label: "Budget Picks",
    title: "Phones under",
    price: "$300",
    sub: "Pre-owned phones in great condition at unbeatable prices. Tested and ready to go.",
    link: "/buy?maxPrice=300",
    cta: "Shop Now",
    accent: "#10b981",
    priceColor: "#10b981",
    btnBg: "#10b981",
    btnText: "#0a0a0a",
  },
  {
    label: "Used iPhones",
    title: "iPhones under",
    price: "$500",
    sub: "Quality pre-owned Apple devices, fully inspected and priced to sell fast.",
    link: "/buy?category=Apple+iPhones&maxPrice=500",
    cta: "Shop iPhones",
    accent: "#6366f1",
    priceColor: "#6366f1",
    btnBg: "#6366f1",
    btnText: "#ffffff",
  },
  {
    label: "Android Deals",
    title: "Androids under",
    price: "$400",
    sub: "Samsung, Pixel, and more — solid pre-owned Android phones at great value.",
    link: "/buy?category=Android+Phones&maxPrice=400",
    cta: "Shop Androids",
    accent: "#f59e0b",
    priceColor: "#f59e0b",
    btnBg: "#f59e0b",
    btnText: "#0a0a0a",
  },
];

export function FeaturedDeals() {
  return (
    <section className="w-full py-14 md:py-20 px-6 bg-zinc-50 dark:bg-zinc-900/20 border-t border-zinc-200 dark:border-white/10">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 rounded-full shadow-sm mb-6">
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Featured Deals</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Shop by Budget
          </h2>
          <p className="mt-5 text-lg text-zinc-500 dark:text-zinc-400 max-w-xl">
            Hand-picked pre-owned devices at every price point. Tested and guaranteed.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <Link href={deal.link} className="block h-full group">
                <div className="relative rounded-3xl h-full min-h-[400px] flex flex-col overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">

                  {/* Coloured top bar */}
                  <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: deal.accent }} />

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-8">

                    {/* Badge */}
                    <div className="mb-10">
                      <span
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border"
                        style={{
                          backgroundColor: `${deal.accent}15`,
                          borderColor: `${deal.accent}40`,
                          color: deal.accent,
                        }}
                      >
                        {deal.label}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-3">
                        {deal.title}
                      </p>
                      <p
                        className="text-7xl lg:text-8xl font-black tracking-tight leading-none"
                        style={{ color: deal.priceColor }}
                      >
                        {deal.price}
                      </p>
                      <div
                        className="mt-5 h-[2px] rounded-full transition-all duration-500 group-hover:w-16"
                        style={{ backgroundColor: deal.accent, width: "2.5rem" }}
                      />
                    </div>

                    {/* Description + CTA */}
                    <div className="mt-8">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                        {deal.sub}
                      </p>
                      <button
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 hover:scale-[1.04] hover:shadow-md active:scale-[0.97] group-hover:gap-3 cursor-pointer"
                        style={{ backgroundColor: deal.btnBg, color: deal.btnText }}
                      >
                        {deal.cta}
                        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>

                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
