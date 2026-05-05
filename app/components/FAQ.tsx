"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
  accent?: "indigo" | "emerald";
}

export default function FAQ({ items, accent = "indigo" }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  const ring = accent === "emerald"
    ? "focus-visible:ring-emerald-500/30"
    : "focus-visible:ring-indigo-500/30";

  const dot = accent === "emerald"
    ? "bg-emerald-500"
    : "bg-indigo-500";

  const chevronColor = accent === "emerald"
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-indigo-600 dark:text-indigo-400";

  const chipBg = accent === "emerald"
    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
    : "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20";

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border bg-white dark:bg-zinc-900 shadow-sm overflow-hidden transition-colors ${
              isOpen
                ? chipBg
                : "border-zinc-200 dark:border-white/10"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 ${ring} cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${dot}`} />
                <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white leading-snug">
                  {item.q}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0"
              >
                <ChevronDown size={18} className={chevronColor} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-[2.625rem]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
