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

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      <StructuredData data={websiteSchema} />
      <Navbar />
      <Hero />
      <Brands />
      <ShopFor />
      <Services />
      <Process />
      <WhyUs />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
