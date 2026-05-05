export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";

export const metadata: Metadata = {
  title: "Buy Certified Pre-Owned Phones",
  description:
    "Shop HatPhones' selection of certified pre-owned iPhones, Samsung, and more in Medicine Hat, AB. Every device tested and quality-checked.",
  alternates: { canonical: "https://www.hatphones.ca/buy/" },
  openGraph: {
    url: "https://www.hatphones.ca/buy/",
    title: "Buy Certified Pre-Owned Phones | HatPhones",
    description:
      "Shop certified pre-owned iPhones, Samsung, and more in Medicine Hat, AB. Every device tested and quality-checked.",
    images: [{ url: "/og-image-buy.png", width: 1200, height: 630, alt: "Buy Certified Pre-Owned Phones — HatPhones Medicine Hat" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image-buy.png"],
  },
};
import { Footer } from "../components/Footer";
import StructuredData from "../components/StructuredData";
import FAQ from "../components/FAQ";
import Image from "next/image";
import buyBg from "../assets/buy_bg.webp";
import { getProducts } from "@/lib/shopify";
import ProductsGrid from "./products-grid";

const buyFAQs = [
  {
    q: "Are your used phones unlocked?",
    a: "Yes — all phones we sell are fully unlocked and compatible with any Canadian carrier, including Rogers, Bell, Telus, Freedom, and Koodo. You can pop in your existing SIM and go.",
  },
  {
    q: "What warranty comes with a used phone from HatPhones?",
    a: "Every certified pre-owned device we sell comes with a warranty. Come in and ask about the specific coverage for the model you're interested in — we stand behind every device we sell.",
  },
  {
    q: "Do you accept trade-ins toward a purchase?",
    a: "Yes. Bring in your old phone and we'll apply its trade-in value toward any device in our inventory. Use our Value Check tool for an estimate on what your device is worth before you visit.",
  },
  {
    q: "How do you test your devices before selling?",
    a: "Every device goes through a multi-point inspection — screen quality, battery health, cameras, speakers, buttons, charging port, and cellular connectivity. Only phones that pass are listed for sale.",
  },
  {
    q: "What brands and models do you typically carry?",
    a: "We stock iPhones, Samsung Galaxy phones, and Google Pixel devices most frequently. Inventory changes often — call or text us to check availability on a specific model.",
  },
];

const buyFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: buyFAQs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; maxPrice?: string }>
}) {
  const { category, maxPrice } = await searchParams;
  const products = await getProducts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.hatphones.ca" },
      { "@type": "ListItem", position: 2, name: "Buy Phones", item: "https://www.hatphones.ca/buy/" },
    ],
  };

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Certified Pre-Owned Phones — HatPhones Medicine Hat",
    description: "Used and refurbished phones available for purchase at HatPhones, Medicine Hat, AB.",
    url: "https://www.hatphones.ca/buy/",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.title,
        url: `https://www.hatphones.ca/buy/`,
        image: p.image || undefined,
        brand: {
          "@type": "Brand",
          name: p.category.includes("Apple") ? "Apple"
            : p.category.includes("Samsung") ? "Samsung"
            : p.category.includes("Google") ? "Google"
            : "Other",
        },
        condition: "https://schema.org/RefurbishedCondition",
        offers: {
          "@type": "Offer",
          price: p.price.toFixed(2),
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "LocalBusiness", name: "HatPhones" },
          itemCondition: "https://schema.org/RefurbishedCondition",
          ...(p.specs.condition && { description: `Condition: ${p.specs.condition}` }),
          ...(p.specs.storage && { name: `${p.title} — ${p.specs.storage}` }),
        },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={buyFAQSchema} />
      <StructuredData data={productListSchema} />
      <Navbar />

      <div className="flex-1 flex flex-col pt-20 relative z-20">
        {/* Banner */}
        <div className="w-full min-h-[500px] md:min-h-[550px] relative overflow-hidden shadow-sm">
          <Image
            src={buyBg}
            alt="Shop Devices Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
              <div className="max-w-3xl text-white">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in">
                  Shop Devices
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-zinc-200/90 leading-relaxed font-medium max-w-2xl">
                  HatPhones sells certified pre-owned iPhones, Samsung Galaxy phones, Google Pixels, tablets, and MacBooks in Medicine Hat, AB. Every device is multi-point inspected, fully unlocked, and comes with a warranty. Trade-ins accepted.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ProductsGrid
          products={products}
          initialCategory={category ?? "All"}
          initialMaxPrice={maxPrice ? parseInt(maxPrice) : undefined}
        />
      </div>

      {/* ── FAQ ── */}
      <section className="w-full py-24 md:py-32 px-6 bg-white dark:bg-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Common Questions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-[1.1] mb-4">
              Buying a phone —{" "}
              <span className="text-zinc-400 dark:text-zinc-600">answered.</span>
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Everything you need to know before buying a certified pre-owned phone from HatPhones.
            </p>
          </div>
          <FAQ items={buyFAQs} accent="indigo" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
