"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Image from "next/image";
import { ShopifyProduct, createCheckoutUrl } from "@/lib/shopify";

const CATEGORIES = ["All", "Apple iPhones", "Android Phones", "Samsung Phones", "Google Pixel", "Tablets", "Laptops"];

const ANDROID_CATEGORIES = ["Samsung Phones", "Google Pixel", "Android Phones"];
const CONDITIONS = ["Like New", "Excellent", "Good", "Poor"];

const SORT_OPTIONS = [
  { value: "newest", label: "Date: Newer to Older" },
  { value: "oldest", label: "Date: Older to Newer" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const CONDITION_STYLES: Record<string, string> = {
  "like new": "bg-emerald-100/90 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  "excellent": "bg-emerald-100/90 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  "good": "bg-blue-100/90 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300",
  "poor": "bg-amber-100/90 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
};

function getConditionStyles(condition: string) {
  return (
    CONDITION_STYLES[condition.toLowerCase()] ??
    "bg-zinc-100/90 text-zinc-800 dark:bg-zinc-500/20 dark:text-zinc-300"
  );
}

function formatBattery(battery: string | null): string | null {
  if (!battery) return null;
  const num = parseFloat(battery);
  if (!isNaN(num)) return `${num}% Health`;
  return battery; // fallback if it's a word like "Replaced"
}

function BuyButton({ variantId }: { variantId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const url = await createCheckoutUrl(variantId);
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md active:scale-95 duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Loading..." : "Buy now"}
    </button>
  );
}

export default function ProductsGrid({
  products,
  initialCategory = "All",
  initialMaxPrice,
}: {
  products: ShopifyProduct[]
  initialCategory?: string
  initialMaxPrice?: number
}) {
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.includes(initialCategory) ? initialCategory : "All"
  );
  const [activeConditions, setActiveConditions] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice ?? 2000);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const maxProductPrice = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price), 2000) / 100) * 100,
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory === "Android Phones") {
      result = result.filter((p) => ANDROID_CATEGORIES.includes(p.category));
    } else if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    result = result.filter((p) => p.price <= maxPrice);

    if (activeConditions.length > 0) {
      result = result.filter((p) =>
        activeConditions.some(
          (c) => p.specs.condition.toLowerCase() === c.toLowerCase()
        )
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [products, activeCategory, activeConditions, maxPrice, sortBy, searchQuery]);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 pb-16 md:pb-24 pt-8 md:pt-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white"
          >
            <SlidersHorizontal size={20} />
            Filter & Sort
          </button>
          <span className="text-sm text-zinc-500 font-medium">{filteredProducts.length} Results</span>
        </div>

        {/* Sidebar */}
        <aside className={`lg:w-72 shrink-0 flex-col gap-8 ${mobileFiltersOpen ? "flex" : "hidden"} lg:flex`}>

          {/* Search */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Search</h3>
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Galaxy S23, iPhone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Categories</h3>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-left px-4 py-2.5 rounded-xl font-medium transition-colors text-sm ${
                    activeCategory === category
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Max Price</h3>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">${maxPrice}</span>
            </div>
            <div className="relative h-3 w-full flex items-center mt-2 mb-2">
              <div className="absolute w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div
                className="absolute h-2 bg-indigo-600 rounded-lg pointer-events-none transition-all duration-75"
                style={{ width: `${(maxPrice / maxProductPrice) * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max={maxProductPrice}
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="absolute w-full h-2 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-md cursor-pointer z-10 hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform"
              />
            </div>
            <div className="flex justify-between text-xs text-zinc-500 font-medium">
              <span>$0</span>
              <span>${maxProductPrice}</span>
            </div>

          {/* Condition Filter */}
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Condition</h3>
            <div className="flex flex-col gap-2">
              {CONDITIONS.map((condition) => {
                const checked = activeConditions.includes(condition);
                return (
                  <label
                    key={condition}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setActiveConditions((prev) =>
                          checked ? prev.filter((c) => c !== condition) : [...prev, condition]
                        )
                      }
                      className="w-4 h-4 rounded accent-indigo-600"
                    />
                    <span className={`text-sm font-medium ${checked ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-600 dark:text-zinc-400"}`}>
                      {condition}
                    </span>
                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${getConditionStyles(condition)}`}>
                      {condition}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Desktop Top Bar */}
          <div className="hidden lg:flex items-center justify-between bg-white dark:bg-zinc-900 p-4 px-6 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Showing <span className="text-indigo-600 dark:text-indigo-400">{filteredProducts.length}</span> results
            </span>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Sort by:</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Mobile Sort Bar */}
          <div className={`lg:hidden flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm ${mobileFiltersOpen ? "block" : "hidden"}`}>
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Sort by</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[160px]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-300 ease-out group flex flex-col"
                >
                  {/* Image */}
                  <div className="h-56 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">No image</div>
                    )}
                    {product.specs.condition && (
                      <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${getConditionStyles(product.specs.condition)}`}>
                        {product.specs.condition}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{product.category}</div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 line-clamp-1">{product.title}</h3>

                    {/* Specs */}
                    <div className="flex flex-col gap-3 mb-8">
                      {product.specs.storage && (
                        <div className="flex items-start text-xs sm:text-sm gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Storage:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.specs.storage}</span>
                        </div>
                      )}
                      {product.specs.color && (
                        <div className="flex items-start text-xs sm:text-sm gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Color:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.specs.color}</span>
                        </div>
                      )}
                      {formatBattery(product.specs.battery) && (
                        <div className="flex items-start text-xs sm:text-sm gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Battery:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{formatBattery(product.specs.battery)}</span>
                        </div>
                      )}
                      {product.specs.condition && (
                        <div className="flex items-start text-xs sm:text-sm gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Condition:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.specs.condition}</span>
                        </div>
                      )}
                      {product.specs.warranty && (
                        <div className="flex items-start text-xs sm:text-sm gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Warranty:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.specs.warranty}</span>
                        </div>
                      )}
                      {product.specs.network && (
                        <div className="flex items-start text-xs sm:text-sm gap-3 pt-1 border-t border-zinc-100 dark:border-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">
                            {product.specs.network.toLowerCase() === "unlocked"
                              ? "Unlocked – works with all carriers"
                              : product.specs.network}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price + Buy */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-sm text-zinc-400 dark:text-zinc-500 line-through font-medium">
                            ${product.compareAtPrice.toFixed(0)}
                          </span>
                        )}
                        <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                          ${product.price.toFixed(0)}
                        </span>
                      </div>
                      <BuyButton variantId={product.variantId} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
                <Search size={24} className="text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No devices found</h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
                We couldn&apos;t find any devices matching your current filters. Try removing some filters or expanding your search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveConditions([]);
                  setMaxPrice(maxProductPrice);
                  setSearchQuery("");
                }}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
