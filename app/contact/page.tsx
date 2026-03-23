"use client";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";
import contactBg from "../assets/contact_bg.png";

export default function Contact() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col pt-20">
        {/* Banner Section */}
        <div className="w-full min-h-[400px] md:min-h-[500px] relative overflow-hidden shadow-sm">
          <Image
            src={contactBg}
            alt="Contact Us Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
              <div className="max-w-3xl text-white">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in">
                  Get in Touch
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-zinc-200/90 leading-relaxed font-medium max-w-2xl">
                  Whether you&apos;re looking to sell your old device, need a fast repair, or just have a question, our local experts are here to help.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 pb-20 md:pb-28 pt-20 md:pt-28">

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          
          {/* Left Column: Contact Info & Form */}
          <div className="flex flex-col gap-8 lg:gap-12 order-1 lg:order-1">
            
            {/* Info Cards - forced 2x2 on mobile */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              
              <div className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col items-start gap-2.5 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-0.5 md:mb-1">Our Store</h3>
                  <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 line-clamp-2 md:line-clamp-none">
                    516 3rd St SE<br/>Medicine Hat, AB, Canada
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col items-start gap-2.5 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-0.5 md:mb-1">Call Us</h3>
                  <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 line-clamp-2 md:line-clamp-none">
                    (555) 123-4567<br/>Support: 987-6543
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col items-start gap-2.5 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-0.5 md:mb-1">Email</h3>
                  <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 line-clamp-2 md:line-clamp-none break-all sm:break-normal">
                    hello@hatphones.com<br/>support@hatphones.com
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col items-start gap-2.5 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                  <Clock size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-white mb-0.5 md:mb-1">Hours</h3>
                  <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 line-clamp-2 md:line-clamp-none">
                    Mon–Fri: 10am – 6pm<br/>Sat: 11am – 6pm<br/>Sun: Closed
                  </p>
                </div>
              </div>
              
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-200 dark:border-white/10 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-4 md:mb-6">Send us a message</h2>
              <form className="flex flex-col gap-4 md:gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-1.5 md:gap-2">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Name</label>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-white text-sm sm:text-base" />
                  </div>
                  <div className="flex flex-col gap-1.5 md:gap-2">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email</label>
                    <input type="email" placeholder="you@email.com" className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-white text-sm sm:text-base" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Subject</label>
                  <select className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-white appearance-none text-sm sm:text-base">
                    <option>General Inquiry</option>
                    <option>Device Repair Quote</option>
                    <option>Sell a Device</option>
                    <option>Order Status</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Message</label>
                  <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-white resize-none text-sm sm:text-base" />
                </div>
                <button type="submit" className="w-full py-3.5 md:py-4 mt-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm text-sm sm:text-base">
                  Send Message
                </button>
              </form>
            </div>
            
          </div>

          {/* Right Column: Integrated Map */}
          <div className="h-[300px] sm:h-[400px] lg:h-auto lg:min-h-[600px] bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-300 dark:border-white/10 shadow-lg relative group order-2 lg:order-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5124.824235460429!2d-110.6775265!3d50.0411107!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x455a734e3fc2448f%3A0x61bd1a1be602f915!2sHat%20Phones!5e0!3m2!1sen!2sin!4v1774074756408!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>

            {/* Overlay instruction for the user to change the map later if needed */}
            <div className="absolute top-4 left-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-lg opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden lg:block">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Map Integration Active
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                You can easily update the `src` URL of this iframe to point to your exact store location using Google Maps "Embed a map" feature.
              </p>
            </div>
          </div>

        </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
