"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<import("lenis").default | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let rafId: number;

    // Defer Lenis init until the browser is idle to avoid forced reflow
    // on initial page load, which inflates TBT.
    const init = async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(init, { timeout: 2000 });
      return () => {
        cancelIdleCallback(id);
        cancelAnimationFrame(rafId);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      };
    } else {
      // Fallback: defer by one macro-task after paint
      const t = setTimeout(init, 200);
      return () => {
        clearTimeout(t);
        cancelAnimationFrame(rafId);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      };
    }
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
