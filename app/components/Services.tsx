"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Wrench, ShoppingBag, ArrowRight } from "lucide-react";

const services = [
  {
    id: "buy",
    title: "Buy Certified Phones",
    description: "Shop our selection of thoroughly tested, pre-owned devices at great prices. Every phone comes with yesterday's performance and today's reliability.",
    icon: ShoppingBag,
    gradient: "from-blue-500 to-indigo-500",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    delay: 0.1,
    href: "/buy",
    cta: "Shop Devices",
  },
  {
    id: "sell",
    title: "Sell Your Phone",
    description: "Get a competitive, fair cash offer for your old device today. Trade it in for cash or upgrade to a newer model we have in stock.",
    icon: Search,
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    delay: 0.3,
    href: "/#sell",
    cta: "Get Sell Quote",
  },
  {
    id: "repair",
    title: "Fast Repairs",
    description: "Cracked screen or dead battery? We fix it fast using high-quality parts. Our experienced technicians have you covered.",
    icon: Wrench,
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50",
    bgDark: "dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    delay: 0.5,
    href: "/repair",
    cta: "Book Repair",
  }
];

export function Services() {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden bg-white dark:bg-zinc-950 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">

      <div className="container mx-auto max-w-7xl">
        <div className="text-center md:text-left mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10"
          >
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Our Services</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight"
          >
            Everything for your phone. <br className="hidden md:block" />
            <span className="text-zinc-500 dark:text-zinc-500">In one place.</span>
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group relative h-full bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-white/10 p-8 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-white/20"
              >
                {/* Subtle top accent */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10 flex-1 flex flex-col h-full mt-2">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 rounded-2xl ${service.bgLight} ${service.bgDark} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={28} className={service.iconColor} strokeWidth={2.5} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>

                  <Link href={service.href} className="mt-auto pt-6 flex items-center gap-2 text-zinc-900 dark:text-white font-semibold group/link">
                    <span>{service.cta}</span>
                    <ArrowRight size={18} className="transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

