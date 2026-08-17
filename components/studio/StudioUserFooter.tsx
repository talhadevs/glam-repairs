import Link from "next/link";

import { SettingsIcon } from "@/components/studio/StudioIcons";
import StudioSignOutButton from "@/components/studio/StudioSignOutButton";
import type { StudioMember } from "@/lib/studio/member";

function ProfileIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 text-brand-primary"
      fill="none"
    >
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 18.5c1.4-2.8 3.7-4.2 6.5-4.2s5.1 1.4 6.5 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type StudioUserFooterProps = {
  member: StudioMember;
};

export default function StudioUserFooter({ member }: StudioUserFooterProps) {
  return (
    <div className="mt-auto border-t border-brand-lavender/60 pt-3">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple-soft">
          <ProfileIcon />
        </span>
        <p className="min-w-0 truncate text-sm font-medium text-brand-ink">
          {member.displayName}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="w-[70%]">
          <StudioSignOutButton filled />
        </div>
        <Link
          href="/studio/settings"
          aria-label="Settings"
          className="flex h-8 w-[30%] items-center justify-center rounded-full border border-brand-border-light text-brand-gray transition-colors hover:border-brand-light hover:bg-brand-purple-soft hover:text-brand-primary"
        >
          <SettingsIcon />
        </Link>
      </div>
    </div>
  );
}
