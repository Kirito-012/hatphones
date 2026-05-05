import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";
import StructuredData from "./components/StructuredData";

export const metadata: Metadata = {
  title: "Buy, Sell & Repair Phones in Medicine Hat",
  description:
    "HatPhones is Medicine Hat's go-to store for certified pre-owned phones, instant sell quotes, and same-day device repair. Visit us at 516 3rd St SE.",
  alternates: { canonical: "https://www.hatphones.ca" },
  openGraph: {
    url: "https://www.hatphones.ca",
    title: "HatPhones | Buy, Sell & Repair Phones in Medicine Hat, AB",
    description:
      "Medicine Hat's go-to store for certified pre-owned phones, instant sell quotes, and same-day device repair.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HatPhones — Buy, Sell & Repair Phones in Medicine Hat" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Brands } from "./components/Brands";
import { ShopFor } from "./components/ShopFor";
import { WhyUs } from "./components/WhyUs";
import { About } from "./components/About";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import FAQ from "./components/FAQ";

const homeFAQs = [
  {
    q: "Do you buy broken or damaged phones?",
    a: "It depends on the condition — the best way to find out is to bring your device in. Our team will inspect it on the spot and let you know what we can offer. You can also use our Value Check tool to get a rough estimate before you visit.",
  },
  {
    q: "How long does a phone repair take?",
    a: "Most common repairs — screen replacements, battery swaps, and charging port fixes — are completed same day, often within 30 to 90 minutes. Complex issues like camera or logic board repairs may take longer. We'll give you a time estimate when you drop off.",
  },
  {
    q: "Do your used phones come with a warranty?",
    a: "Yes. Every certified pre-owned phone we sell comes with a warranty so you can buy with confidence. Ask us in store for the specific coverage on the device you're interested in.",
  },
  {
    q: "Where is HatPhones located in Medicine Hat?",
    a: "We're at 516 3rd St SE, Medicine Hat, AB T1A 0H2. We're open Monday to Friday 10 AM–6 PM and Saturday 11 AM–6 PM. Walk-ins are always welcome — no appointment needed.",
  },
  {
    q: "Do you accept trade-ins?",
    a: "Absolutely. You can trade in your old device toward a new purchase. Use our Value Check tool to get an estimate on what your device is worth, then bring it in and we'll sort it out.",
  },
  {
    q: "What brands do you carry and repair?",
    a: "We buy, sell, and repair iPhones, Samsung Galaxy devices, Google Pixels, and most other popular Android brands. If you're unsure whether we service your specific model, give us a call or text.",
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://www.hatphones.ca",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.hatphones.ca/buy?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const homeFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFAQs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      <StructuredData data={websiteSchema} />
      <StructuredData data={homeFAQSchema} />
      <Navbar />
      <Hero />
      <Brands />
      <ShopFor />
      <Services />
      <Process />
      <WhyUs />
      <About />

      {/* ── FAQ ── */}
      <section className="w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Common Questions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-[1.1] mb-4">
              Frequently asked{" "}
              <span className="text-zinc-400 dark:text-zinc-600">questions.</span>
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Everything you need to know about buying, selling, and repairing phones at HatPhones in Medicine Hat.
            </p>
          </div>
          <FAQ items={homeFAQs} accent="indigo" />
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
