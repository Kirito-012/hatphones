"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // Hide when scrolling down
    } else {
      setHidden(false); // Show when scrolling up
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-zinc-950 border-b-4 border-zinc-900 dark:border-white/20 px-4 md:px-6 py-4 flex items-center justify-between"
    >
      
      {/* Logo */}
      <div className="flex items-center gap-3 lg:gap-4 group cursor-pointer mr-2 lg:mr-0 shrink-0">
        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-zinc-900 dark:bg-white border-2 border-transparent dark:border-white/20 flex items-center justify-center text-white dark:text-black font-black text-lg lg:text-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.4)] transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
          H
        </div>
        <span className="text-xl lg:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase hidden sm:block">
          Hatphones
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-4">
        {["Home", "Buy", "Sell", "Repair", "Value Check", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-xs lg:text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 px-3 py-2 border-2 border-transparent hover:border-zinc-900 dark:hover:border-white/20 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-0 active:translate-x-0 active:shadow-none"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center border-2 border-zinc-900 dark:border-white/20 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:-translate-y-1 hover:-translate-x-1 transition-transform active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_0px_rgba(24,24,27,1)]"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
        </button>
        
        {/* CTA */}
        <button className="hidden sm:block px-4 lg:px-6 py-2 lg:py-2.5 border-2 border-zinc-900 dark:border-white/20 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black text-xs lg:text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_0px_rgba(24,24,27,1)]">
          Get Quote
        </button>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center text-zinc-900 dark:text-zinc-100 border-2 border-transparent hover:border-zinc-900 dark:hover:border-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 p-6 bg-white dark:bg-zinc-950 border-b-4 border-zinc-900 dark:border-white/20 flex flex-col gap-6 md:hidden shadow-[0px_8px_0px_0px_rgba(24,24,27,1)] dark:shadow-[0px_8px_0px_0px_rgba(255,255,255,0.1)]">
          {["Home", "Buy", "Sell", "Repair", "Value Check", "Contact"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`} 
              className="text-lg font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 border-b-2 border-zinc-900/10 dark:border-white/10 pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full px-6 py-4 border-2 border-zinc-900 dark:border-white/20 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black text-lg uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_0px_rgba(24,24,27,1)]">
            Get Instant Quote
          </button>
        </div>
      )}
    </motion.header>
  );
}
