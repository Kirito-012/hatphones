"use client";

import { useState, useMemo } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Image from "next/image";
import buyBg from "../assets/buy_bg.png";

// Mock Data
const MOCK_PRODUCTS = [
  { id: 1, name: "iPhone 14 Pro Max", brand: "Apple", category: "Apple iPhones", originalPrice: 1099, price: 899, condition: "Excellent", image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500&q=80", dateAdded: "2024-02-15", specs: { network: "Unlocked – works with all carriers", storage: "256GB", battery: "100%", warranty: "1 Year Warranty Included" } },
  { id: 2, name: "Samsung Galaxy S23 Ultra", brand: "Samsung", category: "Samsung Phones", originalPrice: 999, price: 799, condition: "Good", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", dateAdded: "2024-01-20", specs: { network: "Unlocked – works with all carriers", storage: "512GB", battery: "95%", warranty: "6 Months Warranty Included" } },
  { id: 3, name: "iPad Pro 12.9 (M2)", brand: "Apple", category: "Tablets", originalPrice: 1199, price: 950, condition: "Like New", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", dateAdded: "2024-03-01", specs: { network: "Wi-Fi Only", storage: "256GB", battery: "100%", warranty: "1 Year AppleCare Included" } },
  { id: 4, name: "MacBook Air M2", brand: "Apple", category: "Macbooks", originalPrice: 1299, price: 1050, condition: "Excellent", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", dateAdded: "2024-02-28", specs: { cpu: "M2 Chip (8-Core)", storage: "512GB", ram: "8GB Unified", warranty: "1 Year Warranty Included" } },
  { id: 5, name: "iPhone 13", brand: "Apple", category: "Apple iPhones", originalPrice: 699, price: 549, condition: "Fair", image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80", dateAdded: "2023-11-10", specs: { network: "Unlocked – works with all carriers", storage: "128GB", battery: "85%", warranty: "30 Days Warranty Included" } },
  { id: 6, name: "Galaxy Z Fold 4", brand: "Samsung", category: "Samsung Phones", originalPrice: 1250, price: 850, condition: "Good", image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/260533_0_gckzjc.png", dateAdded: "2024-03-10", specs: { network: "Unlocked – works with all carriers", storage: "256GB", battery: "90%", warranty: "6 Months Warranty Included" } },
  { id: 7, name: "MacBook Pro 14 (M3)", brand: "Apple", category: "Macbooks", originalPrice: 1999, price: 1699, condition: "Like New", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", dateAdded: "2024-03-15", specs: { cpu: "M3 Pro (11-Core)", storage: "1TB SSD", ram: "18GB Unified", warranty: "1 Year Warranty Included" } },
  { id: 8, name: "iPad Air 5th Gen", brand: "Apple", category: "Tablets", originalPrice: 599, price: 499, condition: "Excellent", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", dateAdded: "2024-01-05", specs: { network: "Wi-Fi Only", storage: "256GB", battery: "92%", warranty: "6 Months Warranty Included" } },
];

const CATEGORIES = ["All", "Apple iPhones", "Samsung Phones", "Tablets", "Macbooks"];
const SORT_OPTIONS = [
  { value: "newest", label: "Date: Newer to Older" },
  { value: "oldest", label: "Date: Older to Newer" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const getConditionStyles = (condition: string) => {
  switch (condition) {
    case "Like New":
    case "Excellent":
      return "bg-emerald-100/90 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300";
    case "Good":
      return "bg-blue-100/90 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300";
    case "Fair":
      return "bg-amber-100/90 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300";
    default:
      return "bg-zinc-100/90 text-zinc-800 dark:bg-zinc-500/20 dark:text-zinc-300";
  }
};

export default function BuyPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Category
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Max Price
    result = result.filter(p => p.price <= maxPrice);

    // Search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "oldest":
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        case "newest":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

    return result;
  }, [activeCategory, maxPrice, sortBy, searchQuery]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col pt-20">
        {/* Banner Section */}
        <div className="w-full min-h-[500px] md:min-h-[550px] relative overflow-hidden shadow-sm">
          <Image
            src={buyBg}
            alt="Spring Sale Banner"
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

            {/* Sidebar (Filters) */}
            <aside className={`lg:w-72 shrink-0 flex-col gap-8 ${mobileFiltersOpen ? 'flex' : 'hidden'} lg:flex`}>

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
                  {CATEGORIES.map(category => (
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
                    style={{ width: `${(maxPrice / 2000) * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="absolute w-full h-2 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-md cursor-pointer z-10 hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                  />
                </div>
                <div className="flex justify-between text-xs text-zinc-500 font-medium">
                  <span>$0</span>
                  <span>$2000</span>
                </div>
              </div>

            </aside>

            {/* Main Content (Products Grid) */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Top Bar */}
              <div className="hidden lg:flex items-center justify-between bg-white dark:bg-zinc-900 p-4 px-6 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Showing <span className="text-indigo-600 dark:text-indigo-400">{filteredProducts.length}</span> results
                </span>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Sort by:</label>
                  <div className="relative group">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      {SORT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Mobile Top Bar (Sort Only) */}
              <div className={`lg:hidden flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Sort by</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[160px]"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              {/* Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-300 ease-out group flex flex-col cursor-pointer">
                      {/* Image Area */}
                      <div className="h-56 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${getConditionStyles(product.condition)}`}>
                          {product.condition}
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{product.category}</div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 line-clamp-1">{product.name}</h3>

                        {/* Product Specs Details */}
                        <div className="flex flex-col gap-3 mb-8">
                          <div className="flex items-start text-xs sm:text-sm gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Model:</span>
                            <span className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">{product.name}</span>
                          </div>
                          <div className="flex items-start text-xs sm:text-sm gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Storage:</span>
                            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.specs.storage}</span>
                          </div>
                          {product.specs.battery && (
                            <div className="flex items-start text-xs sm:text-sm gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                              <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Battery:</span>
                              <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.specs.battery} Health</span>
                            </div>
                          )}
                          <div className="flex items-start text-xs sm:text-sm gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Condition:</span>
                            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{product.condition}</span>
                          </div>
                          <div className="flex items-start text-xs sm:text-sm gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span className="text-zinc-500 dark:text-zinc-400 font-medium w-20 shrink-0">Warranty:</span>
                            <span className="text-zinc-900 dark:text-zinc-100 font-semibold leading-snug">{product.specs.warranty}</span>
                          </div>
                          {product.specs.network && (
                            <div className="flex items-start text-xs sm:text-sm gap-3 pt-1 border-t border-zinc-100 dark:border-white/5">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                              <span className="text-zinc-900 dark:text-zinc-100 font-semibold leading-snug">{product.specs.network}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm text-zinc-400 dark:text-zinc-500 line-through font-medium">
                              ${product.originalPrice}
                            </span>
                            <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                              ${product.price}
                            </span>
                          </div>
                          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md active:scale-95 duration-200">
                            Buy now
                          </button>
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
                      setMaxPrice(2000);
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
      </div>

      <Footer />
    </main>
  );
}
