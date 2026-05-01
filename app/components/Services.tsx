"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Wrench, Zap } from "lucide-react";

const repairServices = [
  { name: "Screen Replacement", price: "From $79", tone: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300" },
  { name: "Battery Replacement", price: "From $59", tone: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
  { name: "Charging Port", price: "From $49", tone: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300" },
  { name: "Camera & Audio", price: "From $69", tone: "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300" },
];

export function Services() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden bg-white dark:bg-zinc-950 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
      <div className="container mx-auto max-w-7xl">

        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10"
          >
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Our Services</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight"
          >
            Everything for your phone.{" "}
            <span className="text-zinc-400 dark:text-zinc-600">In one place.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* BUY — dark tall left column spanning 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-3xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 dark:border-white/5 p-8 flex flex-col justify-between group min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-blue-600/5" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl" />

            {/* Top */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[11px] font-bold tracking-wide rounded-full border border-indigo-500/30">
                Certified Pre-Owned
              </span>
              <div className="mt-6">
                <p className="text-4xl font-black text-white leading-none tracking-tight">Fully Tested</p>
                <p className="text-zinc-500 text-sm mt-2 font-medium">Tested Devices In Stock</p>
              </div>
            </div>

            {/* Phone visual */}
            <div className="relative z-10 flex justify-center items-center flex-1 py-6">
              <div className="relative">
                <div className="absolute top-3 left-3 w-28 h-52 rounded-[22px] bg-zinc-800/60 border border-zinc-700/40" />
                <div className="relative w-28 h-52 rounded-[22px] bg-zinc-800 border-2 border-zinc-600 shadow-2xl group-hover:rotate-1 group-hover:-translate-y-1 transition-all duration-500">
                  <div className="absolute inset-[3px] rounded-[19px] bg-zinc-950 overflow-hidden">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full bg-zinc-800" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-3">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-indigo-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-[7px] text-zinc-500 font-medium">iPhone 15 Pro</p>
                        <p className="text-sm font-black text-white">$899</p>
                        <p className="text-[7px] text-indigo-400 font-bold mt-0.5 tracking-wide">CERTIFIED ✓</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-1.5">Buy Certified Phones</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">Shop pre-owned devices tested by our team. Every phone ready to go at a fair price.</p>
              <Link
                href="/buy"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-zinc-900 rounded-xl text-sm font-bold hover:bg-zinc-100 transition-colors"
              >
                Shop Devices <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* SELL — emerald gradient, wide top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 flex flex-col justify-between gap-6 group min-h-[300px]"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10" />
            <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-black/10 blur-2xl" />

            <div className="relative z-10 flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-[11px] font-bold rounded-full border border-white/30 mb-5">
                <Zap size={11} /> Instant Quote
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Sell Your Phone</h3>
              <p className="text-emerald-100 text-sm leading-relaxed max-w-xs mb-6">
                Get a competitive cash offer for your old device. Drop it off, walk away paid the same day.
              </p>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-700 rounded-xl text-sm font-bold hover:bg-emerald-50 transition-colors"
              >
                Get Your Quote <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="relative z-10 shrink-0">
              <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-5 text-center min-w-[150px]">
                <p className="text-[10px] text-emerald-100 font-semibold uppercase tracking-widest mb-1">iPhone 15 Pro</p>
                <p className="text-4xl font-black text-white leading-none">$600</p>
                <p className="text-xs text-emerald-200 mt-2">Estimated offer</p>
                <div className="mt-3 flex items-center gap-1.5 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <p className="text-[10px] text-emerald-200 font-medium">Same-day payment</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* REPAIR — warm light card, wide bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-8 flex flex-col justify-between gap-6 group min-h-[300px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-white dark:from-amber-500/5 dark:to-zinc-900 rounded-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-amber-100 dark:bg-amber-500/10 blur-2xl" />

            <div className="relative z-10 flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] font-bold rounded-full border border-amber-200 dark:border-amber-500/30 mb-5">
                <Wrench size={11} /> Expert Technicians
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-2 leading-tight">Fast Repairs</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-xs mb-6">
                Cracked screen or dead battery? Our certified techs fix it same day using quality parts.
              </p>
              <Link
                href="/repair"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-colors"
              >
                Book Repair <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="relative z-10 shrink-0 flex flex-col gap-2 min-w-[210px]">
              {repairServices.map((s) => (
                <div
                  key={s.name}
                  className={`flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl ${s.tone}`}
                >
                  <span className="text-xs font-semibold">{s.name}</span>
                  <span className="text-xs font-bold tabular-nums">{s.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
