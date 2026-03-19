"use client";

import { motion } from "framer-motion";

// Floating stat chip
function StatChip({
  icon,
  label,
  value,
  delay,
  className,
}: {
  icon: string;
  label: string;
  value: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={`absolute z-40 flex items-center gap-2.5 px-4 py-3 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] ${className}`}
    >
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</span>
        <span className="text-sm font-black text-zinc-900 dark:text-white uppercase">{value}</span>
      </div>
    </motion.div>
  );
}

// Realistic phone mockup shell
function PhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className="relative z-20 w-[220px] h-[460px] select-none"
    >
      {/* Phone Shell */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-white dark:bg-zinc-900 border-[6px] border-zinc-900 dark:border-zinc-700 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]" />
      {/* Screen Bezel */}
      <div className="absolute inset-[6px] rounded-[2.2rem] bg-zinc-950 border-[3px] border-zinc-900 overflow-hidden">
        {/* Screen Content */}
        <div className="absolute inset-0 bg-zinc-950 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-5 pt-4 pb-1">
            <span className="text-[9px] font-semibold text-white/60">9:41</span>
            <div className="w-24 h-5 rounded-full bg-zinc-900 border border-zinc-800 mx-auto absolute left-1/2 -translate-x-1/2" />
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px] items-end h-3">
                {[2, 3, 4, 5].map((h, i) => (
                  <div key={i} style={{ height: `${h * 2}px` }} className="w-1 rounded-sm bg-white/60" />
                ))}
              </div>
              <div className="flex items-center gap-0.5 ml-1">
                <div className="w-5 h-2.5 rounded-sm border border-white/50 p-px">
                  <div className="h-full w-4/5 bg-emerald-400 rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[9px] text-zinc-500 font-medium">Good morning,</p>
                <p className="text-xs font-bold text-white">Alex</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">A</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mx-4 mb-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-black border border-white/20">
              <span className="text-zinc-500 text-[10px]">🔍</span>
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Search</span>
            </div>
          </div>

          {/* Featured Phone Card */}
          <div className="mx-4 bg-zinc-100 border-2 border-zinc-900 p-3 mb-3 relative overflow-hidden shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
            <p className="text-[8px] font-black text-zinc-900 uppercase tracking-widest mb-0.5">Featured</p>
            <p className="text-xs font-black text-zinc-900 uppercase">iPhone 15 Pro</p>
            <p className="text-[9px] text-zinc-700 font-bold mb-2 uppercase">256GB · Natural</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-zinc-900">$899</span>
              <div className="px-2 py-1 bg-zinc-900 text-[8px] font-black text-white uppercase shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] border border-transparent">BUY</div>
            </div>
          </div>

          {/* Mini Listings */}
          <p className="text-[9px] font-black text-zinc-400 px-4 mb-2 uppercase tracking-widest">Recent Listings</p>
          <div className="flex flex-col gap-1.5 px-4">
            {[
              { name: "Samsung S24 Ultra", price: "$749", badge: "🔥", color: "bg-orange-500" },
              { name: "Google Pixel 9 Pro", price: "$599", badge: "✅", color: "bg-emerald-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2 bg-black border border-white/20">
                <div className={`w-7 h-7 ${item.color} border border-white/20 flex items-center justify-center text-[10px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]`}>{item.badge}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black text-white truncate uppercase">{item.name}</p>
                </div>
                <p className="text-[9px] font-black text-white">{item.price}</p>
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <div className="mt-auto mx-4 mb-3">
            <div className="flex justify-around p-2 rounded-2xl bg-zinc-900 border border-zinc-800">
              {["🏠", "🔍", "💬", "👤"].map((icon, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-base
                    ${i === 0 ? "bg-indigo-600" : ""}`}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute right-[-3px] top-24 w-[3px] h-10 rounded-r-full bg-zinc-500 dark:bg-zinc-600" />
      <div className="absolute left-[-3px] top-20 w-[3px] h-7 rounded-l-full bg-zinc-500 dark:bg-zinc-600" />
      <div className="absolute left-[-3px] top-32 w-[3px] h-12 rounded-l-full bg-zinc-500 dark:bg-zinc-600" />
    </motion.div>
  );
}

  export function Hero() {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-32 lg:pt-40 pb-20 bg-white dark:bg-zinc-950">
  
        {/* Background atmosphere - keeping it simple grid only */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
            style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>
  
        <div className="container relative z-10 px-6 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* ── LEFT: Text Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 space-y-7 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full bg-zinc-900 dark:bg-white opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-zinc-900 dark:bg-white border text-transparent border-zinc-900 dark:border-transparent" />
            </span>
            <span className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest">Premium Tech Exchange</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-6xl md:text-[80px] font-black tracking-[-0.03em] text-zinc-900 dark:text-white leading-[1] uppercase">
            The Smarter
            <br />
            Way to{" "}
            <span className="relative inline-block border-2 border-zinc-900 dark:border-white/20 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 mx-1 mt-2 lg:mt-0 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] -rotate-2">
              <span className="relative z-10 text-zinc-900 dark:text-white">
                Trade
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-xl font-medium text-zinc-700 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Buy, sell, or repair with zero guesswork. Instant valuations, verified devices, and expert technicians.
          </p>

          {/* Trust stats row */}
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-1">
            {[
              { value: "50K+", label: "Deals" },
              { value: "4.9★", label: "Rating" },
              { value: "24HR", label: "Speed" },
            ].map((stat) => (
              <div key={stat.value} className="flex flex-col border-2 border-zinc-900 dark:border-white/20 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                <span className="text-2xl font-black text-zinc-900 dark:text-white leading-none uppercase tracking-tight">{stat.value}</span>
                <span className="text-[10px] text-zinc-600 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-2 border-zinc-900 dark:border-white/20 font-black text-sm shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.4)] hover:-translate-y-1 hover:-translate-x-1 w-full sm:w-auto tracking-widest uppercase transition-all"
            >
              Explore Collection
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-2 border-zinc-900 dark:border-white/20 font-black text-sm shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 w-full sm:w-auto tracking-widest uppercase transition-all"
            >
              Get Trade Value
            </motion.button>
          </div>
        </motion.div>

        {/* ── RIGHT: Phone Mockup Scene ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, type: "spring", bounce: 0.3 }}
          className="flex-1 relative w-full h-[560px] lg:h-[680px] flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute z-10 w-80 h-80 border-[2px] border-dashed border-zinc-800 dark:border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 45, ease: "linear", delay: 0.5 }}
            className="absolute z-10 w-[420px] h-[420px] border-[2px] border-solid border-zinc-300 dark:border-white/5 rounded-full"
          />

          {/* Phone */}
          <PhoneMockup />

          {/* ── Floating Chips ── */}

          {/* Top-left: Trade-in */}
          <StatChip
            icon="💸"
            label="Trade-in Value"
            value="$450"
            delay={0.5}
            className="-left-4 lg:-left-10 top-16"
          />

          {/* Top-right: Verified */}
          <StatChip
            icon="🛡️"
            label="Condition"
            value="Grade A"
            delay={0.65}
            className="-right-4 lg:-right-8 top-24"
          />

          {/* Bottom-left: Repair */}
          <StatChip
            icon="🔧"
            label="Repair ETA"
            value="~45 min"
            delay={0.8}
            className="-left-2 lg:-left-8 bottom-24"
          />

          {/* Bottom-right: Sale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="absolute -right-4 lg:-right-6 bottom-20 z-40 px-4 py-3 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
          >
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Just Sold</p>
            <p className="text-sm font-black text-zinc-900 dark:text-white uppercase">iPhone 14 Pro</p>
            <p className="text-[10px] text-zinc-900 dark:text-white font-bold bg-zinc-100 dark:bg-zinc-900 px-1 border-2 border-zinc-900 dark:border-white/20 inline-block mt-1 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">IN 2 HOURS ⚡</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}