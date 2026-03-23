import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

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
              <li><a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Buy Devices</a></li>
              <li><a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Sell Your Tech</a></li>
              <li><a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Repair Services</a></li>
              <li><a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Get a Quote</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Visit Store</a></li>
              <li><a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Warranty Info</a></li>
            </ul>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Hatphones. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
              <a 
                key={i}
                href="#" 
                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

