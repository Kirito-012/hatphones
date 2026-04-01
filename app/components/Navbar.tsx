"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const NAV_ITEMS = ["Home", "Buy", "Sell", "Repair", "Value Check", "Contact"];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const getHref = (item: string) => {
    if (item === "Home") return "/";
    if (item === "Contact") return "/contact";
    if (item === "Buy") return "/buy";
    if (item === "Sell") return "/sell";
    if (item === "Repair") return "/repair";
    if (item === "Value Check") return "/value-check";
    return `/#${item.toLowerCase().replace(" ", "-")}`;
  };

  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const isActive = (item: string) => {
    const href = getHref(item);

    if (href.startsWith("/#")) {
      return pathname === "/" && currentHash === href.slice(1);
    }

    if (href === "/") {
      return pathname === "/" && currentHash === "";
    }

    return pathname === href;
  };

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
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={getHref(item)}
            aria-current={isActive(item) ? "page" : undefined}
            className={`group relative px-2 py-1 text-sm font-semibold transition-colors ${isActive(item)
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
          >
            {item}
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 dark:bg-indigo-400 origin-center transition-transform duration-300 ease-out ${isActive(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
            />
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4 shrink-0">

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* CTA */}
        <button className="hidden sm:block px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer">
          Get Quote
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 p-4 md:hidden -z-10"
          >
            <div className="p-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  key={item}
                  href={getHref(item)}
                  aria-current={isActive(item) ? "page" : undefined}
                  className={`group relative w-full px-4 py-3 rounded-2xl text-lg font-medium transition-all duration-200 flex items-center justify-between ${isActive(item)
                    ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                    : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                  {isActive(item) && (
                    <motion.div
                      layoutId="activeMobileNav"
                      className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                    />
                  )}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 + 0.1 }}
                className="pt-4 mt-2 border-t border-zinc-200 dark:border-white/10"
              >
                <button className="w-full px-6 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-semibold text-base hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer flex justify-center items-center gap-2">
                  Get Instant Quote
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

