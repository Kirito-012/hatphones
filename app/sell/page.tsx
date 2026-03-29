
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  DollarSign,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Package,
  AlertCircle
} from "lucide-react";

const DEVICE_CATEGORIES = [
  {
    label: "iPhone",
    icon: Smartphone,
    tint: "from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10",
    border: "border-blue-200/70 dark:border-blue-400/20",
    iconTone: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    hoverBorder: "hover:border-blue-400 dark:hover:border-blue-500",
  },
  {
    label: "Android",
    icon: Smartphone,
    tint: "from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10",
    border: "border-emerald-200/70 dark:border-emerald-400/20",
    iconTone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-500",
  },
  {
    label: "iPad / Tablet",
    icon: Tablet,
    tint: "from-violet-50 to-purple-50 dark:from-violet-500/10 dark:to-purple-500/10",
    border: "border-violet-200/70 dark:border-violet-400/20",
    iconTone: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    hoverBorder: "hover:border-violet-400 dark:hover:border-violet-500",
  },
  {
    label: "MacBook / Laptop",
    icon: Laptop,
    tint: "from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10",
    border: "border-amber-200/70 dark:border-amber-400/20",
    iconTone: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    hoverBorder: "hover:border-amber-400 dark:hover:border-amber-500",
  },
  {
    label: "Smartwatch",
    icon: Watch,
    tint: "from-rose-50 to-pink-50 dark:from-rose-500/10 dark:to-pink-500/10",
    border: "border-rose-200/70 dark:border-rose-400/20",
    iconTone: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    hoverBorder: "hover:border-rose-400 dark:hover:border-rose-500",
  },
  {
    label: "Other Device",
    icon: Package,
    tint: "from-zinc-50 to-slate-50 dark:from-zinc-100/5 dark:to-slate-800/10",
    border: "border-zinc-200/70 dark:border-zinc-600/30",
    iconTone: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300",
    hoverBorder: "hover:border-zinc-400 dark:hover:border-zinc-500",
  },
];

const VALUE_RANGES: Record<string, Record<string, [number, number]>> = {
  "iPhone": { "Like New": [700, 950], "Good": [480, 720], "Fair": [280, 480], "Poor": [80, 280] },
  "Android": { "Like New": [350, 650], "Good": [220, 450], "Fair": [120, 280], "Poor": [40, 150] },
  "iPad / Tablet": { "Like New": [400, 750], "Good": [250, 500], "Fair": [130, 300], "Poor": [50, 160] },
  "MacBook / Laptop": { "Like New": [800, 1400], "Good": [550, 950], "Fair": [300, 600], "Poor": [100, 350] },
  "Smartwatch": { "Like New": [200, 450], "Good": [130, 300], "Fair": [70, 180], "Poor": [20, 80] },
  "Other Device": { "Like New": [100, 400], "Good": [60, 250], "Fair": [30, 150], "Poor": [10, 80] },
};

const CONDITIONS = [
  { label: "Like New", desc: "No scratches, perfect screen", selected: "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 ring-2 ring-emerald-500", idle: "border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20" },
  { label: "Good", desc: "Minor wear, fully functional", selected: "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 ring-2 ring-blue-500", idle: "border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20" },
  { label: "Fair", desc: "Visible scratches or scuffs", selected: "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300 ring-2 ring-amber-500", idle: "border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20" },
  { label: "Poor", desc: "Cracked screen or damage", selected: "border-red-500 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300 ring-2 ring-red-500", idle: "border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20" },
];

const STEPS = [
  { step: "01", title: "Select Device", desc: "Choose your device type and its current condition.", icon: ShieldCheck, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
  { step: "02", title: "Get Instant Quote", desc: "Our system gives you a competitive market value estimate instantly.", icon: Zap, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { step: "03", title: "Drop-off & Get Paid", desc: "Bring it to our store and walk out with your payment same-day.", icon: DollarSign, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" }
];

export default function SellPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const valueRange = selectedCategory && selectedCondition
    ? VALUE_RANGES[selectedCategory]?.[selectedCondition]
    : null;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex flex-col transition-colors duration-500">
      <Navbar />

      <div className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
          <div className="absolute inset-0 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-zinc-900 dark:via-[#0a0a0a] dark:to-[#0a0a0a] pointer-events-none" />
          <div className="absolute inset-0 opacity-80 dark:opacity-40 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.15),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(52,211,153,0.12),transparent_30%),radial-gradient(circle_at_60%_85%,rgba(4,120,87,0.12),transparent_35%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20 pointer-events-none" />

          <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 lg:py-28 z-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-zinc-900 dark:text-white"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-white/20 bg-white/80 dark:bg-white/10 px-4 py-2 backdrop-blur mb-6">
                <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-300" />
                <span className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-100">Safe, Secure & Instant</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                Sell Your Device,
                <span className="block text-emerald-600 dark:text-emerald-400">Get Paid Today</span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
                Skip the hassle of online marketplaces. Get a fair offer for your old phone, tablet, or laptop and get paid safely, securely, and instantly.
              </p>

              <div className="mt-7">
                <motion.button
                  onClick={() => {
                    document.getElementById("get-quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Zap size={18} />
                  Get an Instant Quote
                </motion.button>
              </div>

              <motion.div
                className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
                }}
              >
                {[
                  { val: "500+", label: "Devices purchased" },
                  { val: "Same Day", label: "Payment guaranteed" },
                  { val: "Top Dollar", label: "Fair market value" },
                ].map((chip) => (
                  <motion.div
                    key={chip.label}
                    variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                    className="rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/85 dark:bg-white/10 backdrop-blur px-4 py-3 shadow-sm"
                  >
                    <p className="text-2xl font-bold">{chip.val}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-200/90">{chip.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stick Layout Concept */}
        <section className="container mx-auto max-w-7xl px-6 pb-32 pt-8 relative">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Left Content Column (Scrolling) */}
            <div className="lg:w-7/12 xl:w-2/3 flex flex-col gap-16 pt-2">

              {/* Device Category Selection */}
              <div id="get-quote-form" className="scroll-mt-40">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Select your device type</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {DEVICE_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.label;
                    const Icon = cat.icon;
                    return (
                      <motion.button
                        key={cat.label}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory(cat.label)}
                        className={`group relative flex flex-col items-center justify-center p-6 rounded-3xl border transition-all duration-300 text-left ${isSelected
                            ? "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white shadow-md text-white dark:text-zinc-900"
                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 text-zinc-900 dark:text-white"
                          }`}
                      >
                        <div className={`p-4 rounded-2xl mb-4 transition-colors ${isSelected ? 'bg-white/20 dark:bg-zinc-900/10' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                          <Icon size={28} className={isSelected ? 'text-white dark:text-zinc-900' : 'text-zinc-700 dark:text-zinc-300'} />
                        </div>
                        <span className="font-semibold text-[15px]">{cat.label}</span>
                        {isSelected && (
                          <motion.div layoutId="selection-ring" className="absolute inset-0 border-2 border-emerald-500 rounded-3xl" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Condition Selection */}
              <AnimatePresence>
                {selectedCategory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="inline-flex items-center gap-3 mb-8 pt-4">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm">2</div>
                      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">How's the condition?</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CONDITIONS.map((cond) => {
                        const isSelected = selectedCondition === cond.label;
                        return (
                          <motion.button
                            key={cond.label}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedCondition(cond.label)}
                            className={`p-6 rounded-3xl border transition-all duration-200 text-left ${isSelected ? cond.selected : cond.idle}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg font-bold">{cond.label}</span>
                              {isSelected && <CheckCircle2 size={24} className={isSelected ? 'text-emerald-500' : 'text-zinc-400'} />}
                            </div>
                            <p className={`text-sm ${isSelected ? 'opacity-90' : 'text-zinc-500 dark:text-zinc-400'}`}>{cond.desc}</p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* How It Works (Below form elements) */}
              <div className="mt-12 pt-16 border-t border-zinc-200 dark:border-white/10">
                <div className="inline-flex items-center gap-2 mb-10">
                  <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Process</span>
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight ml-2">How it works</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {STEPS.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.step} className="p-6 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-white/10 hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-6`}>
                          <Icon size={24} className={step.color} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{step.title}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Right Sticky Column (The Quote/Form Box) */}
            <div className="lg:w-5/12 xl:w-1/3 w-full lg:sticky lg:top-32 relative">
              <div className="bg-white dark:bg-zinc-900/80 backdrop-blur rounded-[2rem] border border-zinc-200 dark:border-white/10 p-8 shadow-xl relative overflow-hidden group">
                {/* Decorative gleam */}
                <div className="absolute top-0 right-0 p-32 bg-white opacity-[0.05] rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />

                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">Your Quote</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">Complete the steps to see your device's market value.</p>

                <div className="space-y-6 relative z-10">
                  {/* Status Item: Device */}
                  <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">Device Type</span>
                    <span className="font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm">
                      {selectedCategory ? selectedCategory : "Awaiting..."}
                    </span>
                  </div>

                  {/* Status Item: Condition */}
                  <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">Condition</span>
                    <span className="font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm">
                      {selectedCondition ? selectedCondition : "Awaiting..."}
                    </span>
                  </div>

                  {/* Value Range */}
                  <div className="pt-4">
                    <div className="text-zinc-500 dark:text-zinc-400 font-medium text-sm mb-4">Estimated Value</div>

                    {valueRange ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                      >
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">Up to</span>
                        <div className="text-4xl md:text-5xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums tracking-tight">
                          ${valueRange[1]}
                        </div>
                        <div className="text-xs font-medium text-emerald-600/70 dark:text-emerald-400/70 mt-3 flex items-center justify-center gap-1.5">
                          <AlertCircle size={14} /> Estimates range from ${valueRange[0]}-${valueRange[1]}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                        <DollarSign size={32} className="text-zinc-300 dark:text-zinc-600 mb-3" />
                        <span className="text-zinc-400 dark:text-zinc-500 font-medium text-sm">Select options to see estimate</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Details Button */}
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!valueRange}
                    className={`w-full mt-6 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${valueRange
                        ? "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 shadow-xl shadow-zinc-200 dark:shadow-none"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                      }`}
                  >
                    Proceed with Drop-off
                  </motion.button>

                  {valueRange && (
                    <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-4 px-4 font-medium">
                      No obligation quote. Final value depends on in-store assessment.
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
