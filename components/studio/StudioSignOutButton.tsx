"use client";

import { signOutAction } from "@/lib/studio/actions";
import { cn } from "@/lib/cn";

type StudioSignOutButtonProps = {
  className?: string;
  filled?: boolean;
};

export default function StudioSignOutButton({
  className = "",
  filled = false,
}: StudioSignOutButtonProps) {
  return (
    <form action={signOutAction} className={filled ? "w-full" : undefined}>
      <button
        type="submit"
        className={cn(
          "text-xs font-medium uppercase tracking-[0.12em] text-brand-gray transition-colors hover:text-brand-primary",
          filled &&
            "w-full rounded-full border border-brand-border-light bg-white py-1.5 hover:border-brand-light hover:bg-brand-purple-soft",
          className,
        )}
      >
        Sign out
      </button>
    </form>
  );
}
