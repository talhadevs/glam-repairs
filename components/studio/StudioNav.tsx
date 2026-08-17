"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

export const STUDIO_NAV_LINKS = [
  { href: "/studio", label: "Home", exact: true },
  { href: "/studio/customers", label: "Customers" },
  { href: "/studio/broadcast", label: "Broadcast" },
  { href: "/studio/chat", label: "Chat" },
  { href: "/studio/team", label: "Team" },
] as const;

type StudioNavProps = {
  onNavigate?: () => void;
  includeSettings?: boolean;
};

export default function StudioNav({ onNavigate, includeSettings }: StudioNavProps) {
  const pathname = usePathname();
  const links = includeSettings
    ? [...STUDIO_NAV_LINKS, { href: "/studio/settings", label: "Settings" }]
    : STUDIO_NAV_LINKS;

  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const exact = "exact" in link && link.exact;
        const active = exact
          ? pathname === link.href
          : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm transition-colors",
              active
                ? "bg-brand-primary text-white"
                : "text-brand-gray hover:bg-brand-purple-soft hover:text-brand-primary",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
