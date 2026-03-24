"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950 [content-visibility:auto] [contain-intrinsic-size:1px_880px]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">

          {/* Image Side */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/about-us.png"
                alt="Friendly Local Phone Shop"
                fill
                className="object-cover transition-all duration-700"
              />
            </div>
            {/* Friendly Badge Overlay */}
            <div className="absolute top-6 left-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-zinc-900 dark:text-white px-4 py-2 rounded-full font-medium text-sm shadow-sm border border-white/20">
              Serving you since 2026
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                About Us
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-tight tracking-tight mb-6">
                Your neighborhood tech experts.
              </h2>

              <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400">
                <p>
                  We started Hatphones to provide a simple, honest way to buy, sell, and repair phones. No gimmicks, just fair prices and quality service you can rely on.
                </p>
                <p>
                  Whether you need a quick screen repair, want to trade in your old phone, or are looking for a certified pre-owned device, our experienced and friendly technicians are here to help every step of the way.
                </p>
              </div>

              {/* Stats/Guarantees */}
              <div className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t border-zinc-200 dark:border-white/10">
                <div>
                  <h4 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">Thorough</h4>
                  <p className="text-sm font-medium text-zinc-500">Testing & Diagnostics</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">Quality</h4>
                  <p className="text-sm font-medium text-zinc-500">Parts Guaranteed</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

