import Link from "next/link";
import { Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10">
      <div className="container mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-b border-zinc-200 dark:border-white/10 pb-16">

          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center group cursor-pointer lg:mr-0 shrink-0 mb-8 select-none">
              <span className="text-xl lg:text-2xl font-black tracking-tighter text-black dark:text-white leading-none uppercase">
                HAT <span className="font-light opacity-80">PHONES</span>
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              Your reliable local destination for quality pre-owned phones, fast repairs, and fair trade-ins. Honest service guaranteed.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/buy" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Buy Devices</Link></li>
              <li><Link href="/sell" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Sell Your Tech</Link></li>
              <li><Link href="/repair" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Repair Services</Link></li>
              <li><Link href="/repair#schedule-appointment" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Visit Store</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Warranty Info</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Hatphones. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.instagram.com/hat_phones"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 transition-colors"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

