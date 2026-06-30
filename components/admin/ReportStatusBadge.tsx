import { REPORT_STATUS_LABELS } from "@/lib/admin/planLabels";
import type { ReportStatus } from "@/types/admin";

const styles: Record<ReportStatus, string> = {
  awaiting_review: "border-brand-border-light bg-brand-surface text-brand-gray",
  in_review: "border-brand-cream bg-brand-cream-light text-[#9a6b00]",
  sent: "border-brand-success/30 bg-brand-success/15 text-brand-success-strong",
};

export default function ReportStatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.02em] sm:text-xs ${styles[status]}`}
    >
      {REPORT_STATUS_LABELS[status]}
    </span>
  );
}
