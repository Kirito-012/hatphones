"use client";

import { useState } from "react";
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
    Mic,
} from "lucide-react";

const repairServices = [
    {
        title: "Screen Replacement",
        eta: "45-90 mins",
        price: "From $79",
        icon: Smartphone,
        desc: "Cracked glass, dead touch, or display issues fixed using high-quality parts.",
        tone: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
        strip: "from-indigo-500 to-blue-500",
        cardTint: "bg-gradient-to-br from-indigo-50/70 to-white dark:from-indigo-500/10 dark:to-zinc-900",
        borderTint: "border-indigo-200/70 dark:border-indigo-400/20",
        chip: "Easy Win",
        chipTone: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
    },
    {
        title: "Battery Replacement",
        eta: "30-60 mins",
        price: "From $59",
        icon: Battery,
        desc: "Restore battery life, reduce random shutdowns, and bring back all-day usage.",
        tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
        strip: "from-emerald-500 to-teal-500",
        cardTint: "bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-500/10 dark:to-zinc-900",
        borderTint: "border-emerald-200/70 dark:border-emerald-400/20",
        chip: "Most Popular",
        chipTone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    },
    {
        title: "Charging Port Repair",
        eta: "45-75 mins",
        price: "From $49",
        icon: Wrench,
        desc: "Fix loose charging, non-detection, or intermittent power connection issues.",
        tone: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
        strip: "from-amber-500 to-orange-500",
        cardTint: "bg-gradient-to-br from-amber-50/70 to-white dark:from-amber-500/10 dark:to-zinc-900",
        borderTint: "border-amber-200/70 dark:border-amber-400/20",
        chip: "Quick Fix",
        chipTone: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    },
    {
        title: "Camera and Audio Fix",
        eta: "60-120 mins",
        price: "From $69",
        icon: Camera,
        desc: "Resolve blurry camera, autofocus failures, speaker distortion, and mic problems.",
        tone: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
        strip: "from-violet-500 to-fuchsia-500",
        cardTint: "bg-gradient-to-br from-violet-50/70 to-white dark:from-violet-500/10 dark:to-zinc-900",
        borderTint: "border-violet-200/70 dark:border-violet-400/20",
        chip: "Expert Care",
        chipTone: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    },
];

const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
];

const appointmentFlow = [
    {
        title: "Select Device",
        detail: "Choose your phone model and issue type.",
        icon: Smartphone,
        accent: "bg-indigo-500",
        tint: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
        title: "Choose Slot",
        detail: "Pick your preferred day and time.",
        icon: CalendarDays,
        accent: "bg-sky-500",
        tint: "bg-sky-50 dark:bg-sky-500/10",
    },
    {
        title: "Get Confirmation",
        detail: "We confirm by call or text during store hours.",
        icon: Clock3,
        accent: "bg-emerald-500",
        tint: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
        title: "Drop Off and Repair",
        detail: "Bring your device in and track the repair update.",
        icon: ShieldCheck,
        accent: "bg-amber-500",
        tint: "bg-amber-50 dark:bg-amber-500/10",
    },
];

export default function RepairPage() {
    const [selectedSlot, setSelectedSlot] = useState("11:00 AM");

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
            <Navbar />

            <div className="flex-1 pt-20">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950" />
                    <div className="absolute inset-0 opacity-80 dark:opacity-40 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_60%_85%,rgba(16,185,129,0.12),transparent_35%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20" />

                    <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 lg:py-28">
                        <div className="max-w-3xl text-zinc-900 dark:text-white">
                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-white/20 bg-white/80 dark:bg-white/10 px-4 py-2 backdrop-blur mb-6">
                                <ShieldCheck size={16} className="text-indigo-600 dark:text-indigo-200" />
                                <span className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-100">Certified Local Technicians</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                                Repair Your Device
                                <span className="block text-indigo-600 dark:text-indigo-300">Book Your Appointment</span>
                            </h1>

                            <p className="mt-6 text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
                                Fast diagnostics, transparent pricing, and same-day fixes for common issues. Choose your repair and schedule a time slot that works for you.
                            </p>

                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
                                <div className="rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/85 dark:bg-white/10 backdrop-blur px-4 py-3 shadow-sm">
                                    <p className="text-2xl font-bold">30+ mins</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-200/90">Quick jobs</p>
                                </div>
                                <div className="rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/85 dark:bg-white/10 backdrop-blur px-4 py-3 shadow-sm">
                                    <p className="text-2xl font-bold">Same Day</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-200/90">Most repairs</p>
                                </div>
                                <div className="rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/85 dark:bg-white/10 backdrop-blur px-4 py-3 col-span-2 sm:col-span-1 shadow-sm">
                                    <p className="text-2xl font-bold">90 Days</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-200/90">Service warranty</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12 items-start">
                        <div className="xl:col-span-3 flex flex-col gap-6">
                            <div>
                                <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    <Wrench size={16} className="text-indigo-600 dark:text-indigo-400" />
                                    Repair Services
                                </p>
                                <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                    Popular Fixes We Handle Daily
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {repairServices.map((service) => {
                                    const Icon = service.icon;
                                    return (
                                        <article
                                            key={service.title}
                                            className={`relative overflow-hidden rounded-3xl border p-6 shadow-sm hover:shadow-md transition-shadow ${service.cardTint} ${service.borderTint}`}
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.strip}`} />
                                            <div className="flex items-start justify-between gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${service.tone}`}>
                                                    <Icon size={22} />
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Estimated Time</p>
                                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{service.eta}</p>
                                                </div>
                                            </div>

                                            <span className={`inline-flex mt-4 px-2.5 py-1 rounded-full text-[11px] font-semibold ${service.chipTone}`}>
                                                {service.chip}
                                            </span>

                                            <h3 className="mt-5 text-xl font-bold text-zinc-900 dark:text-white">{service.title}</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{service.desc}</p>

                                            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Starting Price</p>
                                                <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">{service.price}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm">
                                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">How Your Appointment Works</h3>
                                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">A simple 4-step flow from booking to completion.</p>

                                <div className="relative mt-6">
                                    <div className="hidden lg:block absolute left-10 right-10 top-10 h-px bg-zinc-200 dark:bg-zinc-700" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {appointmentFlow.map((item, index) => {
                                            const Icon = item.icon;
                                            return (
                                                <div key={item.title} className={`relative rounded-2xl border border-zinc-200 dark:border-white/10 p-4 ${item.tint}`}>
                                                    <span className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${item.accent}`} />
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 flex items-center justify-center">
                                                            <Icon size={18} />
                                                        </div>
                                                        <span className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500">STEP {index + 1}</span>
                                                    </div>
                                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{item.title}</h4>
                                                    <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{item.detail}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="schedule-appointment" className="xl:col-span-2 xl:sticky xl:top-28">
                            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center">
                                        <CalendarDays size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Schedule an Appointment</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Reserve a repair slot in under 1 minute</p>
                                    </div>
                                </div>

                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Alex"
                                                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Phone</label>
                                            <input
                                                type="tel"
                                                placeholder="(555) 123-4567"
                                                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Device</label>
                                        <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                            <option>iPhone</option>
                                            <option>Samsung Galaxy</option>
                                            <option>Google Pixel</option>
                                            <option>iPad / Tablet</option>
                                            <option>Other Device</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Issue Type</label>
                                        <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                            <option>Cracked Screen</option>
                                            <option>Battery Draining Fast</option>
                                            <option>Charging Port Not Working</option>
                                            <option>Camera Problem</option>
                                            <option>Speaker / Mic Problem</option>
                                            <option>General Diagnostics</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Preferred Date</label>
                                        <input
                                            type="date"
                                            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Preferred Time Slot</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {timeSlots.map((slot) => (
                                                <button
                                                    type="button"
                                                    key={slot}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`rounded-lg px-2 py-2 text-xs font-semibold border transition-colors ${selectedSlot === slot
                                                        ? "border-indigo-500 bg-indigo-600 text-white"
                                                        : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:border-indigo-300"
                                                        }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Extra Notes (Optional)</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Tell us anything important before your appointment"
                                            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 transition-colors"
                                    >
                                        Confirm Appointment
                                    </button>
                                </form>

                                <div className="mt-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/70 dark:bg-indigo-500/10 p-4 flex items-start gap-3">
                                    <Clock3 size={18} className="text-indigo-600 dark:text-indigo-400 mt-0.5" />
                                    <p className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Appointment confirmation is shared during store hours: Mon-Fri 10am-6pm, Sat 11am-6pm.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-900 text-white p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Mic size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-300">Need urgent help?</p>
                                        <p className="text-lg font-bold">Call (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
