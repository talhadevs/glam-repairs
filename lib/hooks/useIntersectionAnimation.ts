import { useEffect, useRef, useState, RefObject } from "react";

type UseIntersectionAnimationOptions = {
  threshold?: number | number[];
  rootMargin?: string;
};

/**
 * Hook for triggering animations when element enters viewport.
 * Provides a ref to attach to an element and a visible boolean for animation state.
 *
 * @example
 * const [ref, visible] = useIntersectionAnimation({ threshold: 0.35 });
 * return (
 *   <div ref={ref} className={visible ? "opacity-100" : "opacity-0"}>
 *     Content
 *   </div>
 * );
 */
export function useIntersectionAnimation(
  options: UseIntersectionAnimationOptions = { threshold: 0.35 },
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true));
          });
        } else {
          setVisible(false);
        }
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, visible];
}
