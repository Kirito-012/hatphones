"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  CalendarDays,
  Clock3,
  ShieldCheck,
  Smartphone,
  Wrench,
  Battery,
  Camera,
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

const repairServices = [
  {
    title: "Screen Replacement",
    eta: "45–90 mins",
    price: "From $79",
    icon: Smartphone,
    issueKey: "Cracked Screen",
    chip: "Most Common",
    chipTone: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
    strip: "from-indigo-500 to-blue-500",
    borderTint: "border-indigo-100 dark:border-indigo-500/20",
    iconBg: "bg-indigo-50 dark:bg-indigo-500/15",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Battery Replacement",
    eta: "30–60 mins",
    price: "From $59",
    icon: Battery,
    issueKey: "Battery Draining Fast",
    chip: "Most Popular",
    chipTone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    strip: "from-emerald-500 to-teal-500",
    borderTint: "border-emerald-100 dark:border-emerald-500/20",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Charging Port Repair",
    eta: "45–75 mins",
    price: "From $49",
    icon: Wrench,
    issueKey: "Charging Port Not Working",
    chip: "Quick Fix",
    chipTone: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    strip: "from-amber-500 to-orange-500",
    borderTint: "border-amber-100 dark:border-amber-500/20",
    iconBg: "bg-amber-50 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Camera & Audio Fix",
    eta: "60–120 mins",
    price: "From $69",
    icon: Camera,
    issueKey: "Camera Problem",
    chip: "Expert Care",
    chipTone: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    strip: "from-violet-500 to-fuchsia-500",
    borderTint: "border-violet-100 dark:border-violet-500/20",
    iconBg: "bg-violet-50 dark:bg-violet-500/15",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];

const ISSUE_OPTIONS = [
  "Cracked Screen",
  "Battery Draining Fast",
  "Charging Port Not Working",
  "Camera Problem",
  "Speaker / Mic Problem",
  "General Diagnostics",
];

const ISSUE_PRICE_MAP: Record<string, string> = {
  "Cracked Screen": "$79 – $149",
  "Battery Draining Fast": "$59 – $89",
  "Charging Port Not Working": "$49 – $79",
  "Camera Problem": "$69 – $119",
  "Speaker / Mic Problem": "$49 – $89",
  "General Diagnostics": "Free",
};

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
];

const appointmentSteps = [
  {
    number: "01",
    title: "Fill the Form",
    detail: "Tell us your device model and what's wrong. Takes under 2 minutes.",
    icon: User,
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    color: "text-indigo-600 dark:text-indigo-400",
    chipBg: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    number: "02",
    title: "Get Confirmation",
    detail: "We'll reach out via call or text to confirm your slot within store hours.",
    icon: CheckCircle2,
    bg: "bg-sky-50 dark:bg-sky-500/10",
    color: "text-sky-600 dark:text-sky-400",
    chipBg: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    number: "03",
    title: "Drop Off Your Device",
    detail: "Bring your phone in at your scheduled time. Walk-ins welcome too.",
    icon: Smartphone,
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    color: "text-emerald-600 dark:text-emerald-400",
    chipBg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    number: "04",
    title: "Pick It Up Fixed",
    detail: "Most repairs are done same day. We'll notify you when it's ready.",
    icon: ShieldCheck,
    bg: "bg-amber-50 dark:bg-amber-500/10",
    color: "text-amber-600 dark:text-amber-400",
    chipBg: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition";

const inputWithIconClass =
  "w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition";

export default function RepairPage() {
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [device, setDevice] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");

  const scrollToAppointment = (event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event?.preventDefault();
    const el = document.getElementById("schedule-appointment");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#schedule-appointment");
  };

  const handleServiceClick = (issueKey: string) => {
    setSelectedIssue(issueKey);
    setTimeout(() => {
      const el = document.getElementById("schedule-appointment");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/repair-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          device,
          issue: selectedIssue,
          preferredDate,
          preferredTime: selectedSlot,
          notes,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError("");
    setSelectedIssue("");
    setName("");
    setContact("");
    setDevice("");
    setPreferredDate("");
    setNotes("");
    setSelectedSlot("11:00 AM");
  };

  const estimatedPrice = selectedIssue ? ISSUE_PRICE_MAP[selectedIssue] : null;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />

      <div className="flex-1 pt-20">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950" />
          <div className="absolute inset-0 opacity-80 dark:opacity-40 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_60%_85%,rgba(16,185,129,0.08),transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20" />

          <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-zinc-900 dark:text-white"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-white/20 bg-white/80 dark:bg-white/10 px-4 py-2 backdrop-blur mb-6">
                <ShieldCheck size={16} className="text-indigo-600 dark:text-indigo-300" />
                <span className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-100">Certified Local Technicians</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                Repair Your Device,
                <span className="block text-indigo-600 dark:text-indigo-300">Book Your Appointment</span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
                Fast diagnostics, transparent pricing, and same-day fixes for common issues. Pick a service below and we&apos;ll pre-fill your form.
              </p>

              <div className="mt-7">
                <motion.a
                  href="#schedule-appointment"
                  onClick={scrollToAppointment}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 font-semibold shadow-sm transition-colors"
                >
                  <CalendarDays size={18} />
                  Schedule an Appointment
                </motion.a>
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
                  { val: "30+ mins", label: "Quick jobs" },
                  { val: "Same Day", label: "Most repairs" },
                  { val: "90 Days", label: "Service warranty" },
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

        {/* ── Section 1: Fixes we handle daily ── */}
        <section className="relative w-full py-24 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="container mx-auto max-w-7xl">

            <div className="mb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm"
              >
                <Wrench size={13} className="text-indigo-500" />
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Common Repairs</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.08 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight"
              >
                Fixes we handle{" "}
                <span className="text-zinc-400 dark:text-zinc-600">daily.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.14 }}
                className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl"
              >
                Click any service to pre-fill your booking form and skip the back-and-forth.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {repairServices.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.button
                    key={service.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.38, delay: i * 0.07 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleServiceClick(service.issueKey)}
                    className={`relative text-left overflow-hidden rounded-3xl border ${service.borderTint} bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col cursor-pointer`}
                  >
                    {/* Gradient top strip */}
                    <div className={`h-1 w-full bg-gradient-to-r ${service.strip}`} />

                    <div className="p-6 flex flex-col flex-1">
                      {/* Icon + chip */}
                      <div className="flex items-start justify-between mb-5">
                        <div className={`w-11 h-11 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
                          <Icon size={21} className={service.iconColor} strokeWidth={1.75} />
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${service.chipTone}`}>
                          {service.chip}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white tracking-tight mb-1.5">
                        {service.title}
                      </h3>

                      {/* ETA */}
                      <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-sm mb-5">
                        <Clock3 size={12} />
                        <span>{service.eta}</span>
                      </div>

                      {/* Price + CTA */}
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-base font-bold text-zinc-900 dark:text-white">{service.price}</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-400 group-hover:text-indigo-500 transition-colors font-medium">
                          Book this <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 2: How your appointment works ── */}
        <section className="relative w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start">

              {/* Left: Sticky header */}
              <div className="lg:w-1/3 lg:sticky lg:top-40 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm self-start"
                >
                  <CalendarDays size={13} className="text-indigo-500" />
                  <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Booking Process</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tight"
                >
                  How your
                  <br />
                  <span className="text-zinc-400 dark:text-zinc-600">appointment</span>
                  <br />
                  works.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.18 }}
                  className="text-lg text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed"
                >
                  Simple steps from booking to picking up your fixed device. No surprises.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.24 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToAppointment}
                  className="self-start inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm cursor-pointer"
                >
                  <CalendarDays size={16} />
                  Book Appointment
                </motion.button>
              </div>

              {/* Right: Steps */}
              <div className="lg:w-2/3 lg:pl-16 flex flex-col gap-6 lg:pt-20 pb-8">
                {appointmentSteps.map((step, i) => {
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
                      {/* Ghost step number */}
                      <div className="hidden md:block absolute -left-12 md:-left-20 top-0 text-[96px] font-black pointer-events-none text-zinc-100 dark:text-zinc-800/60 select-none leading-none transition-transform duration-700 group-hover:-translate-y-1.5">
                        {step.number}
                      </div>

                      {/* Icon block */}
                      <div className={`shrink-0 w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105`}>
                        <Icon size={24} className={step.color} strokeWidth={2} />
                      </div>

                      {/* Card */}
                      <div className="relative z-10 flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl px-7 py-6 shadow-sm hover:shadow-md transition-shadow">
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

        {/* ── Section 3: Schedule a Consultation ── */}
        <section
          id="schedule-appointment"
          className="relative w-full py-24 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-900/40 scroll-mt-20"
        >
          <div className="container mx-auto max-w-7xl">

            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm"
              >
                <CalendarDays size={13} className="text-indigo-500" />
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Book a Slot</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.08 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight"
              >
                Schedule a{" "}
                <span className="text-indigo-600 dark:text-indigo-400">Consultation.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.14 }}
                className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl"
              >
                Fill in your details and we&apos;ll confirm your appointment within store hours.
              </motion.p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl bg-emerald-500 dark:bg-emerald-600 overflow-hidden"
                >
                  <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-8">
                      <CheckCircle2 size={40} className="text-white" />
                    </div>

                    <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                      Request Sent!
                    </h3>
                    <p className="text-emerald-100 text-lg max-w-md mb-3 leading-relaxed">
                      We&apos;ll confirm your appointment during store hours. See you soon.
                    </p>
                    <p className="text-emerald-200 text-sm mb-10">
                      A confirmation email has been sent to <span className="font-semibold text-white">{contact}</span>
                    </p>

                    {/* Summary pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                      {[
                        { label: "Device", value: device },
                        { label: "Issue", value: selectedIssue },
                        { label: "Time", value: `${preferredDate} · ${selectedSlot}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white/15 border border-white/25 rounded-2xl px-5 py-3 text-left">
                          <p className="text-[11px] font-semibold text-emerald-200 uppercase tracking-widest mb-0.5">{label}</p>
                          <p className="text-sm font-bold text-white">{value}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={resetForm}
                      className="px-6 py-3 text-sm font-semibold text-emerald-700 bg-white hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer shadow-sm"
                    >
                      Book Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start"
                >
                  {/* ── Form ── */}
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/10 p-8 md:p-10 shadow-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Full Name</label>
                        <div className="relative">
                          <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=""
                            className={inputWithIconClass}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email</label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            required
                            type="email"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="you@example.com"
                            className={inputWithIconClass}
                          />
                        </div>
                      </div>

                      {/* Device */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Device Model</label>
                        <div className="relative">
                          <Smartphone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            required
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                            placeholder="e.g. iPhone 15 Pro"
                            className={inputWithIconClass}
                          />
                        </div>
                      </div>

                      {/* Issue */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Issue Type</label>
                        <select
                          required
                          value={selectedIssue}
                          onChange={(e) => setSelectedIssue(e.target.value)}
                          className={`${inputClass} appearance-none`}
                        >
                          <option value="" disabled>Select an issue</option>
                          {ISSUE_OPTIONS.map((issue) => (
                            <option key={issue} value={issue}>{issue}</option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Date */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Preferred Date</label>
                        <div className="relative">
                          <CalendarDays size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                          <input
                            required
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className={inputWithIconClass}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Time Slots */}
                    <div className="mt-6 flex flex-col gap-2">
                      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Preferred Time</label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              selectedSlot === slot
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mt-5 flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        Additional Notes{" "}
                        <span className="font-normal text-zinc-400">(optional)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-zinc-400 pointer-events-none" />
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Anything else we should know about your device or issue..."
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-8 flex flex-col gap-3">
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={loading ? {} : { y: -1 }}
                        whileTap={loading ? {} : { scale: 0.97 }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold shadow-sm transition-colors cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            <CalendarDays size={18} />
                            Schedule Consultation
                          </>
                        )}
                      </motion.button>
                      {error && (
                        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
                      )}
                    </div>
                  </form>

                  {/* ── Info panel ── */}
                  <div className="flex flex-col gap-4 lg:sticky lg:top-28">

                    {/* Price estimate — only visible when issue selected */}
                    <AnimatePresence>
                      {estimatedPrice && (
                        <motion.div
                          key="price-card"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.28 }}
                          className="rounded-2xl bg-indigo-600 p-6 text-white"
                        >
                          <p className="text-xs font-semibold text-indigo-200 uppercase tracking-widest mb-1">Estimated Cost</p>
                          <p className="text-3xl font-black">{estimatedPrice}</p>
                          <p className="text-sm text-indigo-200 mt-1.5">Final price confirmed after diagnostics.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* What happens next */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-6 shadow-sm">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white mb-4">What happens next</p>
                      <div className="flex flex-col gap-3.5">
                        {[
                          { icon: CheckCircle2, text: "We review your request", color: "text-indigo-500" },
                          { icon: Phone, text: "We call or text to confirm", color: "text-sky-500" },
                          { icon: Smartphone, text: "You drop off your device", color: "text-emerald-500" },
                          { icon: ShieldCheck, text: "We fix it, you pick it up", color: "text-amber-500" },
                        ].map(({ icon: Icon, text, color }) => (
                          <div key={text} className="flex items-center gap-3">
                            <Icon size={15} className={`${color} shrink-0`} />
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Guarantee */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-3.5">
                        <ShieldCheck size={15} className="text-indigo-500 shrink-0" />
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">Our Guarantee</p>
                      </div>
                      <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                          90-day service warranty
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                          Transparent pricing, no hidden fees
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                          Quality parts only
                        </li>
                      </ul>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
