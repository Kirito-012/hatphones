"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Cart } from "@/lib/shopify";

type CartContextType = {
  cart: Cart | null;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (variantId: string) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  totalQuantity: number;
  loading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (!cartId) return;
    fetch(`/api/cart?cartId=${cartId}`)
      .then((r) => r.json())
      .then(({ cart }) => {
        if (cart) setCart(cart);
        else localStorage.removeItem("shopify_cart_id");
      })
      .catch(() => {});
  }, []);

  const addToCart = useCallback(async (variantId: string) => {
    setLoading(true);
    try {
      const cartId = localStorage.getItem("shopify_cart_id");
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          cartId
            ? { action: "add", cartId, variantId }
            : { action: "create", variantId }
        ),
      });
      const { cart } = await res.json();
      if (cart) {
        localStorage.setItem("shopify_cart_id", cart.id);
        setCart(cart);
        setCartOpen(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (!cartId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", cartId, lineId }),
      });
      const { cart } = await res.json();
      setCart(cart);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (!cartId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", cartId, lineId, quantity }),
      });
      const { cart } = await res.json();
      setCart(cart);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalQuantity: cart?.totalQuantity ?? 0,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
