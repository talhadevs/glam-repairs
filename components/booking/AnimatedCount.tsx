"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCountProps = {
  value: number;
  duration?: number;
  className?: string;
};

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

export default function AnimatedCount({
  value,
  duration = 2200,
  className = "",
}: AnimatedCountProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasAnimated(true);
        observer.disconnect();

        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [duration, hasAnimated, value]);

  return (
    <span ref={ref} className={`animated-count tabular-nums ${className}`.trim()}>
      {formatCount(displayValue)}
    </span>
  );
}
