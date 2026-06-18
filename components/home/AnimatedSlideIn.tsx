"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setInView(true));
          });
        } else {
          setInView(false);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (!inView) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      requestAnimationFrame(() => setVisible(true));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [inView, delay]);

  return (
    <div ref={ref} className={className}>
      <div
        className={`will-change-transform transform motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
          inView
            ? "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : "transition-none"
        } ${
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
