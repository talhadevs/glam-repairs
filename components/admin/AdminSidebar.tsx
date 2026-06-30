"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { AdminTab } from "@/types/admin";

const whiteLogo = "/svgs/logo_white.svg";

type NavItem = {
  id: AdminTab;
  label: string;
  icon: ReactNode;
};

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
      <circle cx="9" cy="7" r="3.2" />
      <path d="M22 19v-1a4 4 0 0 0-3-3.87M16 3.6a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LeadsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 8v6M23 11h-6" />
      <path d="M14 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
      <circle cx="8" cy="7" r="3.2" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 14l3.5-3.5 3 3L21 7" />
    </svg>
  );
}

function PendingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CompletedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
      <path d="M15 18l2 2 4-4" />
    </svg>
  );
}

function FollowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M16 3v3M8 3v3M3 9.5h18" />
      <path d="M9 14.5l2 2 4-4" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "users", label: "Users", icon: <UsersIcon /> },
  { id: "leads", label: "Leads (Free)", icon: <LeadsIcon /> },
  { id: "revenue", label: "Revenue", icon: <RevenueIcon /> },
  { id: "pending", label: "Pending reviews", icon: <PendingIcon /> },
  { id: "completed", label: "Completed", icon: <CompletedIcon /> },
  { id: "followups", label: "Follow-ups", icon: <FollowUpIcon /> },
];

type AdminSidebarProps = {
  activeTab: AdminTab;
  onSelect: (tab: AdminTab) => void;
  counts: Record<AdminTab, number>;
};

export default function AdminSidebar({
  activeTab,
  onSelect,
  counts,
}: AdminSidebarProps) {
  return (
    <aside className="bg-brand-primary lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:w-64 lg:shrink-0 lg:flex-col">
      <div className="flex items-center gap-2.5 pl-1 pr-5 py-6 lg:py-8">
        <Image
          src={whiteLogo}
          alt="Glam Repairs"
          width={240}
          height={80}
          priority
          unoptimized
          className="h-16 w-auto sm:h-20"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-6">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const count = counts[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                isActive
                  ? "bg-white text-brand-primary shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="whitespace-nowrap lg:flex-1 lg:text-left">
                {item.label}
              </span>
              {count > 0 ? (
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                    isActive
                      ? "bg-brand-purple-soft text-brand-primary"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
