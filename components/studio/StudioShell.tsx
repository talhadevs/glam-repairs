import Link from "next/link";

import Logo from "@/components/home/Logo";
import StudioMobileHeader from "@/components/studio/StudioMobileHeader";
import StudioNav from "@/components/studio/StudioNav";
import StudioUserFooter from "@/components/studio/StudioUserFooter";
import type { StudioMember } from "@/lib/studio/member";

type StudioShellProps = {
  member: StudioMember;
  children: React.ReactNode;
};

export default function StudioShell({ member, children }: StudioShellProps) {
  return (
    <div className="min-h-dvh bg-brand-purple-tint text-brand-ink lg:h-dvh lg:overflow-hidden">
      <div className="flex min-h-dvh lg:h-full">
        <aside className="hidden h-dvh w-64 shrink-0 flex-col overflow-y-auto border-r border-brand-lavender/70 bg-white px-5 py-6 lg:flex">
          <div className="mb-6">
            <Link href="/studio" className="block leading-none">
              <Logo variant="color" className="block h-10" />
            </Link>
            <p className="-mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-brand-accent">
              Studio
            </p>
          </div>
          <StudioNav />
          <StudioUserFooter member={member} />
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:overflow-y-auto">
          <StudioMobileHeader />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
