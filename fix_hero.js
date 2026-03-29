const fs = require('fs');

const path = 'app/sell/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldHero = `{/* Sleek Minimalist Hero */}
        <section className="relative overflow-hidden w-full py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-zinc-50 to-zinc-50 dark:from-emerald-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] pointer-events-none" />
          <div className="container relative z-10 mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-zinc-900 dark:text-white"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 backdrop-blur mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">
                  Instant Quote & Same-Day Payment
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Turn your tech into
                <span className="block text-emerald-600 dark:text-emerald-400 mt-2">cash today.</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                Skip the hassle of online marketplaces. Get a fair offer for your old phone, tablet, or laptop and get paid safely, securely, and instantly.
              </p>
            </motion.div>
          </div>
        </section>`;

const newHero = `{/* Hero */}
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
          <div className="absolute inset-0 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-zinc-900 dark:via-[#0a0a0a] dark:to-[#0a0a0a] pointer-events-none" />
          <div className="absolute inset-0 opacity-80 dark:opacity-40 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.15),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(52,211,153,0.12),transparent_30%),radial-gradient(circle_at_60%_85%,rgba(4,120,87,0.12),transparent_35%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20 pointer-events-none" />

          <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 lg:py-28 z-10">
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
                  onClick={() => {
                    document.getElementById("get-quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Zap size={18} />
                  Get an Instant Quote
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
        </section>`;

if (content.includes(oldHero)) {
  content = content.replace(oldHero, newHero);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully updated hero section.');
} else {
  console.log('Could not find exact hero block. Here is a snippet of what is near "Sleek Minimalist Hero":');
  console.log(content.slice(content.indexOf('Sleek Minimalist') - 50, content.indexOf('Sleek Minimalist') + 500));
}
