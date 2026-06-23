"use client";

import { useEffect, useState, type ReactNode } from "react";
import Logo from "@/components/home/Logo";
import { waitForPreloadImages } from "@/lib/waitForPageImages";

type PageLoaderProps = {
  children: ReactNode;
  preloadUrls?: readonly string[];
  timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 12000;

export default function PageLoader({
  children,
  preloadUrls = [],
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: PageLoaderProps) {
  const [ready, setReady] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    document.body.style.overflow = "hidden";

    const finish = () => {
      if (cancelled) {
        return;
      }

      setReady(true);
    };

    const loadImages = async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });

      await waitForPreloadImages([...preloadUrls]);
      finish();
    };

    Promise.race([
      loadImages(),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, timeoutMs);
      }),
    ]).then(finish);

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, [preloadUrls, timeoutMs]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    document.body.style.overflow = "";
  }, [ready]);

  return (
    <>
      {overlayVisible ? (
        <div
          aria-hidden={ready}
          aria-live="polite"
          aria-busy={!ready}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-primary transition-opacity duration-500 ease-out ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={() => {
            if (ready) {
              setOverlayVisible(false);
            }
          }}
        >
          <Logo className="h-16 sm:h-20" />
          <div
            className="mt-8 h-10 w-10 animate-spin rounded-full border-[3px] border-white/25 border-t-brand-cream"
            role="status"
            aria-label="Loading page"
          />
          <p className="mt-4 text-sm font-light tracking-wide text-white/80">
            Loading...
          </p>
        </div>
      ) : null}

      <div
        aria-hidden={!ready}
        className={`transition-opacity duration-500 ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
