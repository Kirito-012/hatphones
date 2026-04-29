"use client";

import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function useScrollReveal(delay: number) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Only hide elements that are genuinely below the fold at mount time.
    // Elements already in the viewport stay visible — no flash.
    if (el.getBoundingClientRect().top >= window.innerHeight) {
      setHidden(true);
    }
  }, []);

  const shouldHide = hidden && !isInView;

  return {
    ref,
    animate: { opacity: shouldHide ? 0 : 1, y: shouldHide ? 10 : 0 },
    // Snap instantly to hidden (off-screen, user can't see it), smooth reveal when in view.
    transition: shouldHide
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: EASE },
  };
}

type DivProps = Omit<HTMLMotionProps<"div">, "animate" | "transition" | "ref"> & { delay?: number };
type ButtonProps = Omit<HTMLMotionProps<"button">, "animate" | "transition" | "ref"> & { delay?: number };

export function ScrollReveal({ delay = 0, ...props }: DivProps) {
  const { ref, animate, transition } = useScrollReveal(delay);
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      animate={animate}
      transition={transition}
      {...props}
    />
  );
}

export function ScrollRevealButton({ delay = 0, ...props }: ButtonProps) {
  const { ref, animate, transition } = useScrollReveal(delay);
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      animate={animate}
      transition={transition}
      {...props}
    />
  );
}
