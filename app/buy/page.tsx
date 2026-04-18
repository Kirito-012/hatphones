export const dynamic = 'force-dynamic';

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Image from "next/image";
import buyBg from "../assets/buy_bg.png";
import { getProducts } from "@/lib/shopify";
import ProductsGrid from "./products-grid";

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; maxPrice?: string }>
}) {
  const { category, maxPrice } = await searchParams;
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
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
                  Find huge savings on certified pre-owned phones, tablets, and MacBooks. Every device is rigorously tested to ensure complete reliability.
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

      <Footer />
    </main>
  );
}
