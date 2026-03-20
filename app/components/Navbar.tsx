"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

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
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 px-4 md:px-6 py-4 flex items-center justify-between"
    >
      
      {/* Logo */}
      <div className="flex items-center group cursor-pointer lg:mr-0 shrink-0 select-none">
        <span className="text-xl lg:text-2xl font-black tracking-tighter text-black dark:text-white leading-none uppercase">
          HAT <span className="font-light opacity-80">PHONES</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-6">
        {["Home", "Buy", "Sell", "Repair", "Value Check", "Contact"].map((item) => (
          <a
            key={item}
            href={item === "Home" ? "/" : item === "Contact" ? "/contact" : item === "Buy" ? "/buy" : `/#${item.toLowerCase().replace(" ", "-")}`}
            className="group relative px-2 py-1 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 dark:bg-indigo-400 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4 shrink-0">
        
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        {/* CTA */}
        <button className="hidden sm:block px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm">
          Get Quote
        </button>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 overflow-hidden md:hidden shadow-xl -z-10"
          >
            <div className="p-6 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-white/10 flex flex-col gap-6">
              {["Home", "Buy", "Sell", "Repair", "Value Check", "Contact"].map((item) => (
                <a 
                  key={item}
                  href={item === "Home" ? "/" : item === "Contact" ? "/contact" : item === "Buy" ? "/buy" : `/#${item.toLowerCase().replace(" ", "-")}`} 
                  className="group relative w-fit text-lg font-semibold text-zinc-900 dark:text-zinc-100 pb-2 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 dark:bg-indigo-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </a>
              ))}
              <button className="w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-sm">
                Get Instant Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

