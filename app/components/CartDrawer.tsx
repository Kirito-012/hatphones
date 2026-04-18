"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "./CartContext";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, loading } = useCart();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const total = cart ? parseFloat(cart.cost.totalAmount.amount) : 0;
  const currency = cart?.cost.totalAmount.currencyCode ?? "CAD";

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-zinc-900/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[70] bg-white dark:bg-zinc-900 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Your Cart</h2>
                {(cart?.totalQuantity ?? 0) > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                    {cart?.totalQuantity}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {lines.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <ShoppingBag size={24} className="text-zinc-400" />
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium">Your cart is empty</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    Continue browsing
                  </button>
                </div>
              ) : (
                lines.map((line) => {
                  const imgUrl = line.merchandise.product.images.edges[0]?.node.url;
                  const price = parseFloat(line.merchandise.price.amount) * line.quantity;
                  return (
                    <div key={line.id} className="flex gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-white/5">
                      {imgUrl && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 shrink-0">
                          <Image src={imgUrl} alt={line.merchandise.product.title} fill className="object-contain p-1" sizes="80px" />
                        </div>
                      )}
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                          {line.merchandise.product.title}
                        </p>
                        {line.merchandise.title !== "Default Title" && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{line.merchandise.title}</p>
                        )}
                        <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-auto">
                          ${price.toFixed(0)} {currency}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <button
                          onClick={() => removeFromCart(line.id)}
                          disabled={loading}
                          className="text-zinc-400 hover:text-red-500 transition-colors disabled:opacity-40"
                        >
                          <Trash2 size={15} />
                        </button>
                        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-1 py-1">
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            disabled={loading || line.quantity <= 1}
                            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-bold text-zinc-900 dark:text-white w-5 text-center">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            disabled={loading}
                            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="px-6 py-5 border-t border-zinc-200 dark:border-white/10 flex flex-col gap-4 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Total</span>
                  <span className="text-xl font-black text-zinc-900 dark:text-white">
                    ${total.toFixed(0)} <span className="text-sm font-semibold text-zinc-400">{currency}</span>
                  </span>
                </div>
                <a
                  href={cart?.checkoutUrl}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm transition-colors shadow-lg"
                >
                  Checkout
                  <ArrowRight size={16} />
                </a>
                <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
                  Secure checkout powered by Shopify
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
