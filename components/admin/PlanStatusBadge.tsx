import { PLAN_STATUS_LABELS } from "@/lib/admin/planLabels";
import type { PlanStatus } from "@/types/admin";

const styles: Record<PlanStatus, string> = {
  pending: "border-brand-cream bg-brand-cream-light text-[#9a6b00]",
  active: "border-brand-success/30 bg-brand-success/15 text-brand-success-strong",
  disabled: "border-brand-border-light bg-brand-surface text-brand-gray",
};

export default function PlanStatusBadge({ status }: { status: PlanStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.02em] sm:text-xs ${styles[status]}`}
    >
      {PLAN_STATUS_LABELS[status]}
    </span>
  );
}
