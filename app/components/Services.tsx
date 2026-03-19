"use client";

import { motion } from "framer-motion";
import { Search, Wrench, ShoppingBag } from "lucide-react";

const services = [
  {
    id: "buy",
    title: "Buy Premium Devices",
    description: "Browse curated second-hand phones. Every device undergoes a strict 50-point inspection and comes with a guarantee.",
    icon: ShoppingBag,
    gradient: "from-blue-400 to-indigo-500",
    delay: 0.1,
  },
  {
    id: "sell",
    title: "Sell & Value Check",
    description: "Find out the exact value of your phone instantly. Trade it in for top dollar or upgrade to a newer model.",
    icon: Search,
    gradient: "from-pink-400 to-purple-500",
    delay: 0.3,
  },
  {
    id: "repair",
    title: "Expert Repair Services",
    description: "Shattered screen? Battery dying? Our certified technicians use original parts to bring your device back to life.",
    icon: Wrench,
    gradient: "from-emerald-400 to-teal-500",
    delay: 0.5,
  }
];

export function Services() {
  return (
    <section className="relative w-full py-32 px-6 overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-t-2 border-b-2 border-zinc-900 dark:border-white/10">

      <div className="container mx-auto max-w-7xl">
        <div className="text-center md:text-left mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 border-2 border-zinc-900 dark:border-white/20 bg-white dark:bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
          >
            <span className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest">Our Ecosystem</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight uppercase"
          >
            Everything you need. <br className="hidden md:block" />
            <span className="text-zinc-500 dark:text-zinc-500">In one place.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 w-full">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: service.delay, type: "spring", stiffness: 100 }}
                className="group relative h-[26rem] bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-white/20 p-8 flex flex-col overflow-hidden transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_rgba(24,24,27,1)] dark:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.15)]"
              >
                {/* Subtle top accent */}
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${service.gradient}`} />

                <div className="relative z-10 flex-1 flex flex-col h-full mt-2">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white/20 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300">
                      <Icon size={28} className="text-zinc-900 dark:text-white" strokeWidth={2.5} />
                    </div>

                    <div className="w-10 h-10 border-2 border-zinc-900 dark:border-white/20 flex items-center justify-center text-zinc-900 dark:text-white bg-white dark:bg-zinc-950 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300">
                      <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-lg font-black">→</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight uppercase border-b-2 border-zinc-200 dark:border-white/10 pb-4">
                    {service.title}
                  </h3>

                  <p className="text-base text-zinc-700 dark:text-zinc-400 leading-relaxed mb-8 flex-grow font-medium">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-6 border-t-2 border-zinc-900 dark:border-white/20 flex items-center justify-between">
                    <span className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">Learn more</span>
                    <div className="w-12 h-1 bg-zinc-900 dark:bg-white group-hover:w-20 transition-all duration-300"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
