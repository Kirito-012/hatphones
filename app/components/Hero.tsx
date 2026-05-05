"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// Floating stat chip — CSS fade-in, no JS animation cost on load
function StatChip({
  icon,
  label,
  value,
  className,
  accentBg = "bg-white/90 dark:bg-zinc-900/90",
  accentBorder = "border-zinc-100 dark:border-white/10",
  labelColor = "text-zinc-500",
  iconBg,
  style,
}: {
  icon: string;
  label: string;
  value: string;
  className?: string;
  accentBg?: string;
  accentBorder?: string;
  labelColor?: string;
  iconBg?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`absolute z-40 flex items-center gap-2.5 px-4 py-3 backdrop-blur-md rounded-2xl border shadow-lg opacity-0 animate-fadeIn ${accentBg} ${accentBorder} ${className}`}
    >
      <span className={`text-xl w-8 h-8 flex items-center justify-center rounded-xl ${iconBg ?? ""}`}>{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className={`text-[10px] font-semibold tracking-wider ${labelColor}`}>{label}</span>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
    </div>
  );
}

// Phone mockup — float animation via CSS, no framer-motion on mount
function PhoneMockup({ shouldAnimate }: { shouldAnimate: boolean }) {
  return (
    <div className={`relative z-20 w-[220px] h-[460px] select-none ${shouldAnimate ? "animate-float" : ""}`}>
      {/* Phone Shell */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-white dark:bg-zinc-800 border-[4px] border-zinc-200 dark:border-zinc-600 shadow-xl" />
      {/* Screen Bezel */}
      <div className="absolute inset-[4px] rounded-[2.2rem] bg-zinc-950 overflow-hidden">
        {/* Screen Content */}
        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 flex flex-col">

          {/* Header */}
          <div className="px-4 pt-5 pb-3 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-[10px] font-black tracking-tighter text-zinc-900 dark:text-white uppercase">HAT <span className="font-light opacity-60">PHONES</span></p>
            <p className="text-[8px] text-zinc-500 mt-0.5">Medicine Hat, AB</p>
          </div>

          {/* Featured listing */}
          <div className="mx-3 mt-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-3 shadow-sm">
            <p className="text-[8px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Featured</p>
            <p className="text-xs font-bold text-white leading-tight">iPhone 15 Pro</p>
            <p className="text-[8px] text-indigo-200 mb-2">256GB · Excellent condition</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-white">$600</span>
              <div className="px-2.5 py-1 bg-white rounded-lg text-[8px] font-bold text-indigo-600">In Stock</div>
            </div>
          </div>

          {/* Listings */}
          <p className="text-[8px] font-semibold text-zinc-500 px-3 mt-3 mb-1.5 uppercase tracking-widest">Available Now</p>
          <div className="flex flex-col gap-1.5 px-3">
            {[
              { name: "Samsung S24 Ultra", detail: "512GB · Good", price: "$749", dot: "bg-emerald-400" },
              { name: "Google Pixel 9 Pro", detail: "128GB · Excellent", price: "$599", dot: "bg-emerald-400" },
              { name: "iPhone 14", detail: "128GB · Fair", price: "$449", dot: "bg-amber-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-semibold text-zinc-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-[7px] text-zinc-500">{item.detail}</p>
                </div>
                <p className="text-[9px] font-bold text-zinc-900 dark:text-white shrink-0">{item.price}</p>
              </div>
            ))}
          </div>

          {/* Footer strip */}
          <div className="mt-auto mx-3 mb-3 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/30 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-emerald-700 dark:text-emerald-400">Same-day repairs available</p>
            <span className="text-[8px]">🔧</span>
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute right-[-2px] top-24 w-[2px] h-10 rounded-r-full bg-zinc-300 dark:bg-zinc-600" />
      <div className="absolute left-[-2px] top-20 w-[2px] h-7 rounded-l-full bg-zinc-300 dark:bg-zinc-600" />
      <div className="absolute left-[-2px] top-32 w-[2px] h-12 rounded-l-full bg-zinc-300 dark:bg-zinc-600" />
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-32 lg:pt-40 pb-20 bg-white dark:bg-zinc-950 [content-visibility:auto] [contain-intrinsic-size:1px_1000px]">

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-slate-100 dark:from-zinc-900 to-transparent" />
      </div>

      <div className="container relative z-10 px-6 mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

        {/* LEFT: Text Content — CSS fade-in, zero JS blocking */}
        <div className="flex-1 space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 opacity-0 animate-heroFadeUp">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-sm font-semibold">Local Phone Repair &amp; Resell</span>
          </div>

          {/* Headline — LCP element, no animation delay */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Your Trusted
            <br />
            Phone{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Shop
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            We buy, sell, and repair phones. Get a fair price for your old device or find a great deal on a certified pre-owned phone.
          </p>

          {/* Trust stats row */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-2">
            {[
              { value: "1yr", label: "Warranty", sub: "on devices above $200" },
              { value: "Same Day", label: "Repairs", sub: null },
            ].map((stat) => (
              <div key={stat.value} className="flex flex-col">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">{stat.value} <span className="text-sm text-zinc-500 font-medium">{stat.label}</span></span>
                {stat.sub && <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{stat.sub}</span>}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-4 pt-6 items-center lg:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
              <a
                href="/buy/"
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 w-full sm:w-auto transition-colors shadow-sm text-center"
              >
                Shop Phones
              </a>
              <a
                href="/sell/"
                className="px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 w-full sm:w-auto transition-colors shadow-sm text-center"
              >
                Sell Your Phone
              </a>
            </div>
            <a
              href="/value-check/"
              className="px-8 py-4 bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/50 rounded-xl font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 w-full sm:w-auto transition-colors shadow-sm text-center"
            >
              Get a Repair Quote
            </a>
          </div>
        </div>

        {/* RIGHT: Phone Mockup Scene — CSS spin rings, deferred float */}
        <div className="flex-1 relative w-full h-[500px] lg:h-[600px] flex items-center justify-center opacity-0 animate-heroFadeUp [animation-delay:150ms]">
          {/* Spinning rings — pure CSS */}
          <div className={`absolute z-10 w-80 h-80 border border-dashed border-zinc-200 dark:border-white/10 rounded-full ${mounted && isInView ? "animate-spinSlow" : ""}`} />
          <div className={`absolute z-10 w-[420px] h-[420px] border border-solid border-zinc-100 dark:border-white/5 rounded-full ${mounted && isInView ? "animate-spinSlowReverse" : ""}`} />

          {/* Phone */}
          <PhoneMockup shouldAnimate={mounted && isInView} />

          {/* Floating Chips — CSS fade-in with delay */}
          <StatChip
            icon="💸"
            label="Fair Value"
            value="$450 Cash"
            className="-left-4 lg:-left-6 top-16"
            accentBg="bg-violet-600"
            accentBorder="border-violet-500"
            labelColor="text-violet-100"
            iconBg="bg-violet-500"
            style={{ animationDelay: "500ms" }}
          />

          <StatChip
            icon="🛡️"
            label="Condition"
            value="Certified"
            className="-right-4 lg:-right-6 top-24"
            accentBg="bg-teal-500"
            accentBorder="border-teal-400"
            labelColor="text-white"
            iconBg="bg-teal-400"
            style={{ animationDelay: "650ms" }}
          />

          <StatChip
            icon="🔧"
            label="Fix it fast"
            value="Screen Repair"
            className="-left-2 lg:-left-4 bottom-24"
            accentBg="bg-orange-500"
            accentBorder="border-orange-400"
            labelColor="text-white"
            iconBg="bg-orange-400"
            style={{ animationDelay: "800ms" }}
          />

          {/* Just Sold chip */}
          <div
            className="absolute -right-4 lg:-right-6 bottom-16 z-40 px-5 py-4 bg-fuchsia-600 backdrop-blur-md rounded-2xl border border-fuchsia-500 shadow-lg opacity-0 animate-fadeIn"
            style={{ animationDelay: "900ms" }}
          >
            <p className="text-[10px] font-semibold text-fuchsia-200 uppercase tracking-widest mb-1">Just Sold</p>
            <p className="text-sm font-bold text-white">iPhone 14 Pro</p>
            <p className="text-xs text-fuchsia-200 mt-1">Found a new home 🏠</p>
          </div>
        </div>
      </div>
    </section>
  );
}
