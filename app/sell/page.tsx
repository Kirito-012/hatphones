"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  ShieldCheck,
  Zap,
  Lock,
  Banknote,
  Smartphone,
  Search,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  EyeOff,
  Store,
} from "lucide-react";

const privacyFeatures = [
  {
    icon: EyeOff,
    title: "Your Data, Erased",
    description: "We fully wipe every device before processing. Your personal data never leaves with us.",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    color: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-100 dark:border-emerald-500/20",
  },
  {
    icon: Lock,
    title: "No Records Kept",
    description: "We don't store your personal information beyond what's needed to complete the transaction.",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    color: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-100 dark:border-indigo-500/20",
  },
  {
    icon: Store,
    title: "Local & Trusted",
    description: "No strangers from Marketplace. Walk into our store, deal with real people face to face.",
    bg: "bg-sky-50 dark:bg-sky-500/10",
    color: "text-sky-600 dark:text-sky-400",
    border: "border-sky-100 dark:border-sky-500/20",
  },
  {
    icon: Banknote,
    title: "Secure Payment",
    description: "Get paid in cash or e-transfer the same day. No waiting, no uncertainty.",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    color: "text-amber-600 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-500/20",
  },
];

const steps = [
  {
    number: "01",
    title: "Check Your Device Value",
    detail: "Use our Value Check tool to get an instant estimate for your device based on model, condition, and storage.",
    icon: Search,
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    color: "text-emerald-600 dark:text-emerald-400",
    chipBg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    number: "02",
    title: "Bring Your Device In",
    detail: "Drop into our store at a time that works for you. No appointment needed — walk-ins are always welcome.",
    icon: Smartphone,
    bg: "bg-sky-50 dark:bg-sky-500/10",
    color: "text-sky-600 dark:text-sky-400",
    chipBg: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    number: "03",
    title: "We Inspect & Verify",
    detail: "Our team does a quick in-person inspection to confirm condition. Transparent and straightforward, no surprises.",
    icon: ShieldCheck,
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    color: "text-indigo-600 dark:text-indigo-400",
    chipBg: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    number: "04",
    title: "Get Paid Today",
    detail: "Walk out with cash or e-transfer — same day, every time. Fair market value, no lowball offers.",
    icon: Banknote,
    bg: "bg-amber-50 dark:bg-amber-500/10",
    color: "text-amber-600 dark:text-amber-400",
    chipBg: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

export default function SellPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex flex-col transition-colors duration-500">
      <Navbar />

      <div className="flex-1 pt-20">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-zinc-900 dark:via-[#0a0a0a] dark:to-[#0a0a0a]" />
          <div className="absolute inset-0 opacity-80 dark:opacity-40 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.15),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(52,211,153,0.12),transparent_30%),radial-gradient(circle_at_60%_85%,rgba(4,120,87,0.08),transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20" />

          <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-zinc-900 dark:text-white"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-white/20 bg-white/80 dark:bg-white/10 px-4 py-2 backdrop-blur mb-6">
                <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-300" />
                <span className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-100">Safe, Secure & Instant</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                Sell Your Device,
                <span className="block text-emerald-600 dark:text-emerald-400">Get Paid Today</span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
                Skip the hassle of online marketplaces. Get a fair offer for your old phone, tablet, or laptop and get paid safely, securely, and instantly.
              </p>

              <div className="mt-7">
                <motion.button
                  onClick={() => router.push("/value-check")}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Zap size={18} />
                  Check Your Device Value
                </motion.button>
              </div>

              <motion.div
                className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
                }}
              >
                {[
                  { val: "500+", label: "Devices purchased" },
                  { val: "Same Day", label: "Payment guaranteed" },
                  { val: "Top Dollar", label: "Fair market value" },
                ].map((chip) => (
                  <motion.div
                    key={chip.label}
                    variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                    className="rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/85 dark:bg-white/10 backdrop-blur px-4 py-3 shadow-sm"
                  >
                    <p className="text-2xl font-bold">{chip.val}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-200/90">{chip.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Section 1: Privacy & Security ── */}
        <section className="relative w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              {/* Left: Text */}
              <div className="lg:w-5/12 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm self-start"
                >
                  <Lock size={13} className="text-emerald-500" />
                  <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Privacy First</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.08 }}
                  className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-[1.1]"
                >
                  We protect your
                  <br />
                  <span className="text-zinc-400 dark:text-zinc-600">data, not just</span>
                  <br />
                  your device.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.14 }}
                  className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm"
                >
                  Selling a phone shouldn&apos;t mean risking your privacy. Here&apos;s how we keep your information safe at every step.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 pt-2"
                >
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    No data ever shared with third parties
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.24 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    Every device wiped before it leaves your hands
                  </div>
                </motion.div>
              </div>

              {/* Right: Feature cards 2x2 */}
              <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {privacyFeatures.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.38, delay: i * 0.07 }}
                      className={`rounded-2xl border ${feature.border} bg-white dark:bg-zinc-900 p-6 shadow-sm`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                        <Icon size={19} className={feature.color} strokeWidth={2} />
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">{feature.title}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ── Section 2: 4-Step Process ── */}
        <section className="relative w-full py-24 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start">

              {/* Left: Sticky header */}
              <div className="lg:w-1/3 lg:sticky lg:top-40 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm self-start"
                >
                  <Zap size={13} className="text-emerald-500" />
                  <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">How It Works</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.08 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tight"
                >
                  Selling is
                  <br />
                  <span className="text-zinc-400 dark:text-zinc-600">this easy.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.16 }}
                  className="text-lg text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed"
                >
                  Four simple steps. No listings, no waiting, no strangers showing up at your door.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.22 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/value-check")}
                  className="self-start inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                >
                  <Search size={15} />
                  Check Device Value
                </motion.button>
              </div>

              {/* Right: Steps */}
              <div className="lg:w-2/3 lg:pl-16 flex flex-col gap-6 lg:pt-20 pb-8">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      className="relative flex gap-6 items-start group"
                    >
                      {/* Ghost number */}
                      <div className="hidden md:block absolute -left-12 md:-left-20 top-0 text-[96px] font-black pointer-events-none text-zinc-100 dark:text-zinc-800/60 select-none leading-none transition-transform duration-700 group-hover:-translate-y-1.5">
                        {step.number}
                      </div>

                      {/* Icon block */}
                      <div className={`shrink-0 w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105`}>
                        <Icon size={24} className={step.color} strokeWidth={2} />
                      </div>

                      {/* Card */}
                      <div className="relative z-10 flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl px-7 py-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${step.chipBg}`}>
                          Step {step.number}
                        </span>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">
                          {step.title}
                        </h3>
                        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ── Section 3: Ready to Sell — Contact Options ── */}
        <section className="relative w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950">
          <div className="container mx-auto max-w-7xl">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-2xl mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm mb-6">
                <Zap size={13} className="text-emerald-500" />
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Ready to Sell?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-[1.1] mb-4">
                Three ways to get started
              </h2>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Pick whatever works best for you. No pressure, no commitment until you walk in the door.
              </p>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Option 1 — Call or Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0 }}
                className="flex flex-col rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 p-8 gap-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                  <MessageCircle size={22} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Option 1</span>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Call or text us</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    The fastest way. Give us a call or shoot a text and we&apos;ll get back to you same day.
                  </p>
                </div>
                <a
                  href="tel:+14039570532"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm self-start"
                >
                  <MessageCircle size={15} />
                  (403) 957-0532
                </a>
              </motion.div>

              {/* Option 2 — Value Check + Send Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.08 }}
                className="flex flex-col rounded-3xl border-2 border-emerald-400 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-500/5 p-8 gap-6 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  Recommended
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-emerald-500/10 flex items-center justify-center shadow-sm">
                  <Search size={22} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Option 2</span>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Check value &amp; send details</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Use our value tool to get an instant estimate, then send us your device info with one tap. We&apos;ll take it from there.
                  </p>
                </div>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/value-check")}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm self-start cursor-pointer"
                >
                  <Search size={15} />
                  Get my estimate
                  <ArrowRight size={14} />
                </motion.button>
              </motion.div>

              {/* Option 3 — Contact form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.16 }}
                className="flex flex-col rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 p-8 gap-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                  <CheckCircle2 size={22} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Option 3</span>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Send us a message</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Have questions before committing? Drop us a message through our contact form and we&apos;ll reply promptly.
                  </p>
                </div>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/contact")}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-zinc-900 dark:bg-white hover:bg-zinc-700 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-semibold text-sm transition-colors shadow-sm self-start cursor-pointer"
                >
                  Contact us
                  <ArrowRight size={14} />
                </motion.button>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Section 4: Value Check CTA ── */}
        <section className="relative w-full py-14 md:py-20 px-6 overflow-hidden bg-zinc-50 dark:bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] opacity-60 dark:opacity-100" />
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 lg:p-20 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #059669 0%, #065f46 100%)" }}
            >
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-300/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-semibold mb-8">
                  <Zap size={15} className="text-emerald-200" />
                  <span>Instant Estimate — No Commitment</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5">
                  What&apos;s your device worth?
                </h2>

                <p className="text-lg text-emerald-100 max-w-xl mx-auto mb-10 leading-relaxed">
                  Get an instant estimate for your phone in seconds. No sign-up, no hassle — just an honest number so you know what to expect.
                </p>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/value-check")}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 rounded-2xl font-bold text-base hover:bg-emerald-50 transition-colors shadow-lg cursor-pointer"
                >
                  <Search size={18} />
                  Check Your Device Value
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <p className="mt-5 text-sm text-emerald-200">
                  Takes less than 30 seconds
                </p>
              </div>
            </motion.div>

            {/* ── Section 5: Contact CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.12 }}
              className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl px-8 py-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-zinc-500 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">Still have questions?</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">We&apos;re happy to help before you commit to anything.</p>
                </div>
              </div>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/contact")}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-semibold text-sm hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Contact Us
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>

          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
