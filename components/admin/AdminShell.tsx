import type { ReactNode } from "react";

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-brand-purple-tint">{children}</div>
  );
}
