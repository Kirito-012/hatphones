"use client";

import { motion } from "framer-motion";

const brands = [
  "Apple",
  "Samsung",
  "Google Pixel",
  "Android Phones",
  "iPad/Tablets"
];

// Combine and duplicate for seamless looping
const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

export function Brands() {
  return (
    <section className="relative w-full py-12 md:py-16 bg-white dark:bg-zinc-950 border-t-2 border-b-2 border-zinc-900 dark:border-white/20 overflow-hidden flex flex-col items-center justify-center">

      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

      <h3 className="absolute left-6 top-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 z-20 hidden md:block">
        Premium Ecosystems
      </h3>

      <div className="flex w-full overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex items-center gap-12 lg:gap-24 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
        >
          {duplicatedBrands.map((brand, i) => (
            <div key={i} className="flex items-center gap-12 lg:gap-24">
              <span
                className={`text-5xl md:text-7xl font-black tracking-tighter uppercase ${i % 2 === 0
                  ? "text-transparent"
                  : "text-zinc-900 dark:text-white"
                  }`}
                style={{
                  WebkitTextStroke: i % 2 === 0 ? "2px currentColor" : "none",
                  color: i % 2 === 0 ? "var(--foreground)" : undefined // rely on tailwind text-colors above
                }}
              >
                {brand}
              </span>
              <span className="text-3xl text-zinc-300 dark:text-zinc-800 font-bold">＊</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
