"use client";

import { Tablet, Laptop } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

const categories = [
  {
    title: "iPhones",
    description: "Latest Apple devices with certified quality.",
    type: "img" as const,
    logoUrl: "https://cdn.simpleicons.org/apple/ffffff",
    logoAlt: "Apple logo",
    accent: "from-zinc-800 to-zinc-950",
    badge: "Apple",
    badgeColor: "bg-white/10 text-white/80",
    link: "/buy?category=Apple+iPhones",
  },
  {
    title: "Androids",
    description: "Top brands like Samsung, Google, and more.",
    type: "img" as const,
    logoUrl: "https://cdn.simpleicons.org/android/ffffff",
    logoAlt: "Android logo",
    accent: "from-emerald-400 to-emerald-600",
    badge: "Android",
    badgeColor: "bg-white/20 text-white/90",
    link: "/buy?category=Android+Phones",
  },
  {
    title: "Tablets",
    description: "iPads and Android tablets for work or play.",
    type: "icon" as const,
    icon: Tablet,
    accent: "from-purple-500 to-purple-700",
    badge: "iPad & More",
    badgeColor: "bg-white/20 text-white/90",
    link: "/buy?category=Tablets",
  },
  {
    title: "Laptops",
    description: "MacBooks and Windows laptops for every budget.",
    type: "icon" as const,
    icon: Laptop,
    accent: "from-blue-500 to-blue-700",
    badge: "Mac & PC",
    badgeColor: "bg-white/20 text-white/90",
    link: "/buy?category=Laptops",
  },
];

export function ShopFor() {
  return (
    <section className="relative w-full py-14 md:py-20 px-6 bg-zinc-50 dark:bg-zinc-900/20 z-0 border-t border-zinc-200 dark:border-white/10">
      <div className="container mx-auto max-w-7xl">

        <div className="flex flex-col items-center justify-center mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 rounded-full shadow-sm mb-6">
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Explore Devices</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Shop For
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, i) => (
            <Link key={i} href={category.link}>
              <ScrollReveal
                delay={i * 0.07}
                className="group relative overflow-hidden p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
              >
                {/* Coloured gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.accent}`} />

                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-white/5" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center h-full">
                  {/* Logo: CDN image or Lucide icon */}
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 p-3 sm:p-4">
                    {category.type === "img" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={category.logoUrl}
                        alt={category.logoAlt}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <category.icon size={28} className="text-white sm:w-9 sm:h-9" strokeWidth={1.5} />
                    )}
                  </div>

                  {/* Badge */}
                  <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full mb-2 sm:mb-3 ${category.badgeColor}`}>
                    {category.badge}
                  </span>

                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed flex-grow">
                    {category.description}
                  </p>
                  <div className="mt-4 sm:mt-6 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 text-xs sm:text-sm font-semibold text-white transition-colors duration-300">
                    View All →
                  </div>
                </div>
              </ScrollReveal>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
