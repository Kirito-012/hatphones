"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShopifyProduct } from "@/lib/shopify";

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
  "like new": "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white",
  "excellent": "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white",
  "good": "bg-blue-500 text-white dark:bg-blue-500 dark:text-white",
  "poor": "bg-amber-500 text-white dark:bg-amber-500 dark:text-white",
};

function getShopifyImageUrl(url: string, width: number): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("width", String(width));
    return u.toString();
  } catch {
    return url;
  }
}

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

  async function handleBuy(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
      });
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="px-3 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:bg-indigo-700 transition-colors shadow-md active:scale-95 duration-200 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
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
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const maxProductPrice = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price), 2000) / 100) * 100,
    [products]
  );

  useEffect(() => {
    if (selectedProduct || isImageExpanded) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('hatphones:modal-open'));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('hatphones:modal-close'));
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct, isImageExpanded]);

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
                  className={`text-left px-4 py-2.5 rounded-xl font-medium transition-colors text-sm ${activeCategory === category
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
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentImageIndex(0);
                  }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-300 ease-out group flex flex-col cursor-pointer"
                >
                  {/* Image */}
                  <div className="h-48 sm:h-56 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden flex items-center justify-center p-2 sm:p-0">
                    {product.image ? (
                      <Image
                        src={getShopifyImageUrl(product.image, 400)}
                        alt={product.title}
                        fill
                        className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500 sm:p-0 p-4"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                        quality={60}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs sm:text-sm">No image</div>
                    )}
                    {product.specs.condition && (
                      <div className={`absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold shadow-md backdrop-blur-sm ${getConditionStyles(product.specs.condition)}`}>
                        {product.specs.condition}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-6 flex flex-col flex-1">
                    <div className="text-[10px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1 sm:mb-2 line-clamp-1">{product.category}</div>
                    <h3 className="text-sm sm:text-xl font-bold text-zinc-900 dark:text-white mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-1 leading-snug">{product.title}</h3>

                    {/* Specs */}
                    <div className="flex flex-col gap-1.5 sm:gap-3 mb-4 sm:mb-8 flex-1">
                      {product.specs.storage && (
                        <div className="flex items-start text-[10px] sm:text-sm gap-1.5 sm:gap-3">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5 sm:mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-14 sm:w-20 shrink-0">Storage:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">{product.specs.storage}</span>
                        </div>
                      )}
                      {product.specs.color && (
                        <div className="hidden sm:flex items-start text-[10px] sm:text-sm gap-1.5 sm:gap-3">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5 sm:mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-14 sm:w-20 shrink-0">Color:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">{product.specs.color}</span>
                        </div>
                      )}
                      {formatBattery(product.specs.battery) && (
                        <div className="flex items-start text-[10px] sm:text-sm gap-1.5 sm:gap-3">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5 sm:mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-14 sm:w-20 shrink-0">Battery:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">{formatBattery(product.specs.battery)}</span>
                        </div>
                      )}
                      {product.specs.condition && (
                        <div className="flex items-start text-[10px] sm:text-sm gap-1.5 sm:gap-3 hidden sm:flex">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Condition:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.specs.condition}</span>
                        </div>
                      )}
                      {product.specs.warranty && (
                        <div className="flex items-start text-[10px] sm:text-sm gap-1.5 sm:gap-3 hidden sm:flex">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Warranty:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.specs.warranty}</span>
                        </div>
                      )}
                      {product.specs.network && (
                        <div className="hidden sm:flex items-start text-[10px] sm:text-sm gap-1.5 sm:gap-3 lg:pt-1 sm:border-t sm:border-zinc-100 sm:dark:border-white/5">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5 sm:mt-1.5" />
                          <span className="text-zinc-900 dark:text-zinc-100 font-semibold line-clamp-2 sm:line-clamp-1">
                            {product.specs.network.toLowerCase() === "unlocked"
                              ? "Unlocked – works with all carriers"
                              : product.specs.network}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price + Buy */}
                    <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                      <div className="flex flex-col">
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-[10px] sm:text-sm text-zinc-400 dark:text-zinc-500 line-through font-medium leading-none mb-0.5">
                            ${product.compareAtPrice.toFixed(0)}
                          </span>
                        )}
                        <span className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
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

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={() => setSelectedProduct(null)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-zinc-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] z-10"
            >
              <div className="relative h-48 sm:h-64 md:h-72 bg-zinc-100 dark:bg-zinc-800 flex shrink-0 items-center justify-center p-6 group/img cursor-zoom-in" onClick={() => setIsImageExpanded(true)}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(null);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full text-zinc-900 dark:text-white z-20 hover:scale-110 transition-transform"
                >
                  <X size={18} />
                </button>
                {selectedProduct.images?.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedProduct.images.length - 1));
                      }}
                      className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-black/60 shadow-lg backdrop-blur-md rounded-full text-zinc-900 dark:text-white z-20 hover:scale-110 transition-all border border-black/5 dark:border-white/10"
                    >
                      <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev < selectedProduct.images.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-black/60 shadow-lg backdrop-blur-md rounded-full text-zinc-900 dark:text-white z-20 hover:scale-110 transition-all border border-black/5 dark:border-white/10"
                    >
                      <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                      {selectedProduct.images.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${currentImageIndex === i ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute top-4 left-4 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full p-2 text-zinc-900 dark:text-white pointer-events-none">
                  <Maximize2 size={16} />
                </div>

                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <Image src={getShopifyImageUrl(selectedProduct.images[currentImageIndex], 800)} alt={selectedProduct.title} fill className="object-contain p-6" quality={75} sizes="(max-width: 768px) 100vw, 50vw" />
                ) : selectedProduct.image ? (
                  <Image src={getShopifyImageUrl(selectedProduct.image, 800)} alt={selectedProduct.title} fill className="object-contain p-6" quality={75} sizes="(max-width: 768px) 100vw, 50vw" />
                ) : (
                  <div className="text-zinc-400">No image</div>
                )}
              </div>

              <div className="p-4 sm:p-6 pb-6 sm:pb-6 overflow-y-auto flex-1">
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1.5 sm:mb-2">{selectedProduct.category}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6 leading-snug">{selectedProduct.title}</h3>

                {/* Full Specs List */}
                <div className="flex flex-col gap-2.5 sm:gap-3 mb-5 sm:mb-8">
                  {selectedProduct.specs.storage && (
                    <div className="flex items-start text-sm gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium w-24 shrink-0">Storage:</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{selectedProduct.specs.storage}</span>
                    </div>
                  )}
                  {selectedProduct.specs.color && (
                    <div className="flex items-start text-sm gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium w-24 shrink-0">Color:</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{selectedProduct.specs.color}</span>
                    </div>
                  )}
                  {formatBattery(selectedProduct.specs.battery) && (
                    <div className="flex items-start text-sm gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium w-24 shrink-0">Battery:</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{formatBattery(selectedProduct.specs.battery)}</span>
                    </div>
                  )}
                  {selectedProduct.specs.condition && (
                    <div className="flex items-start text-sm gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium w-24 shrink-0">Condition:</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{selectedProduct.specs.condition}</span>
                    </div>
                  )}
                  {selectedProduct.specs.warranty && (
                    <div className="flex items-start text-sm gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium w-24 shrink-0">Warranty:</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{selectedProduct.specs.warranty}</span>
                    </div>
                  )}
                  {selectedProduct.specs.network && (
                    <div className="flex items-start text-sm gap-3 pt-3 border-t border-zinc-100 dark:border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                      <span className="text-zinc-900 dark:text-zinc-100 font-semibold">
                        {selectedProduct.specs.network.toLowerCase() === "unlocked"
                          ? "Unlocked – works with all carriers"
                          : selectedProduct.specs.network}
                      </span>
                    </div>
                  )}
                </div>

                {/* Price + Buy */}
                <div className="mt-auto flex items-center justify-between pt-4 sm:pt-6 border-t border-zinc-200 dark:border-white/10">
                  <div className="flex flex-col">
                    {selectedProduct.compareAtPrice && selectedProduct.compareAtPrice > selectedProduct.price && (
                      <span className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 line-through font-medium mb-0.5">
                        ${selectedProduct.compareAtPrice.toFixed(0)}
                      </span>
                    )}
                    <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                      ${selectedProduct.price.toFixed(0)}
                    </span>
                  </div>
                  <BuyButton variantId={selectedProduct.variantId} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image View */}
      <AnimatePresence>
        {isImageExpanded && selectedProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/95 backdrop-blur-xl" onClick={() => setIsImageExpanded(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-4xl max-h-screen flex items-center justify-center"
            >
              <button
                onClick={() => setIsImageExpanded(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white z-50 transition-colors"
              >
                <X size={24} />
              </button>

              {selectedProduct.images?.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedProduct.images.length - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white z-50 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev < selectedProduct.images.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white z-50 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Dots indicator */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-[200] bg-black/60 backdrop-blur-sm rounded-full px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                    {selectedProduct.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                        className={`rounded-full transition-all duration-200 cursor-pointer ${
                          currentImageIndex === i
                            ? "w-6 h-2.5 bg-white shadow-lg"
                            : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <Image
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain"
                    quality={100}
                  />
                ) : selectedProduct.image ? (
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain"
                    quality={100}
                  />
                ) : null}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
