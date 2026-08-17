"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Logo from "@/components/home/Logo";
import { CloseIcon, MenuIcon } from "@/components/studio/StudioIcons";
import StudioNav from "@/components/studio/StudioNav";

export default function StudioMobileHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 lg:hidden">
      <div className="relative z-20 flex items-center justify-between gap-3 border-b border-brand-lavender/70 bg-white px-4 py-3">
        <Link href="/studio" className="min-w-0">
          <Logo variant="color" className="h-8" />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-border-light text-brand-primary"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-10 bg-brand-ink/25"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-20 border-b border-brand-lavender/70 bg-white px-4 py-3 shadow-lg">
            <StudioNav includeSettings onNavigate={() => setOpen(false)} />
          </div>
        </>
      ) : null}
    </header>
  );
}
