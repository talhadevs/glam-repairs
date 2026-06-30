"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useIntersectionAnimation } from "@/lib/hooks/useIntersectionAnimation";

type AnimatedSlideInProps = {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
  threshold?: number;
};

function getHiddenClasses(direction: "left" | "right" | "up" | "down") {
  if (direction === "right") return "translate-x-16 opacity-0";
  if (direction === "up") return "translate-y-16 opacity-0";
  if (direction === "down") return "-translate-y-16 opacity-0";
  return "-translate-x-16 opacity-0";
}

export default function AnimatedSlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
  threshold = 0,
}: AnimatedSlideInProps) {
  const [ref, inView] = useIntersectionAnimation({ threshold });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate once: reveal when first in view and keep it revealed so scrolling
    // up/down does not repeatedly re-trigger the slide-in (which feels janky).
    if (!inView || visible) return;

    const timer = window.setTimeout(() => {
      requestAnimationFrame(() => setVisible(true));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [inView, delay, visible]);

  return (
    <div ref={ref} className={className}>
      <div
        className={`will-change-transform transform motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible
            ? "translate-x-0 translate-y-0 opacity-100"
            : getHiddenClasses(direction)
        }`}
      >
        {children}
      </div>
    </div>
  );
}
