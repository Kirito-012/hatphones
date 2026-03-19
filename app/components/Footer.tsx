import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-zinc-950 border-t-4 border-zinc-900 dark:border-white/20">
      <div className="container mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-b-2 border-zinc-900 dark:border-white/20 pb-16">
          
          <div className="col-span-1 md:col-span-2">
            <div className="w-12 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-black text-2xl mb-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              H
            </div>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-4">Hatphones</h3>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 max-w-sm">
              The premium destination for curated, inspected, and guaranteed secondary tech. Minimal friction, maximum trust.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Buy Devices</a></li>
              <li><a href="#" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Sell Your Tech</a></li>
              <li><a href="#" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Repair Services</a></li>
              <li><a href="#" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Instant Valuation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Visit Store</a></li>
              <li><a href="#" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Wholesale</a></li>
            </ul>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
          <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Hatphones. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
              <a 
                key={i}
                href="#" 
                className="w-10 h-10 border-2 border-zinc-900 dark:border-white/20 flex items-center justify-center text-zinc-900 dark:text-white bg-transparent hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-colors shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
              >
                <Icon size={18} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
