import { LEAD_STATUS_LABELS, formatJoinedDate } from "@/lib/admin/planLabels";
import type { AdminUser, LeadStatus } from "@/types/admin";

const statusStyles: Record<LeadStatus, string> = {
  new: "border-brand-info/40 bg-brand-info/10 text-[#2563eb]",
  contacted: "border-brand-cream bg-brand-cream-light text-[#9a6b00]",
  converted: "border-brand-success/30 bg-brand-success/15 text-brand-success-strong",
};

type LeadsViewProps = {
  leads: AdminUser[];
  onMarkContacted: (userId: string) => void;
  onViewReport: (userId: string) => void;
};

export default function LeadsView({
  leads,
  onMarkContacted,
  onViewReport,
}: LeadsViewProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-brand-lavender/50 bg-white p-4 shadow-sm sm:p-6">
      <div className="min-w-[52rem]">
        <div className="grid grid-cols-[1.4fr_1.7fr_1.4fr_1fr_1.4fr] rounded-t-2xl bg-brand-purple-soft px-4 py-3.5 text-xs font-medium tracking-[0.02em] text-brand-primary sm:text-[13px]">
          <span>Name</span>
          <span>Email</span>
          <span>Interest</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="overflow-hidden rounded-b-2xl border border-t-0 border-brand-border-light">
          {leads.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-brand-gray">
              No free-tier leads yet.
            </p>
          ) : (
            leads.map((lead) => {
              const status = lead.leadStatus ?? "new";
              return (
                <div
                  key={lead.id}
                  className="grid grid-cols-[1.4fr_1.7fr_1.4fr_1fr_1.4fr] items-center border-b border-brand-border-light/70 bg-white px-4 py-3.5 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-brand-ink">
                      {lead.fullName}
                    </p>
                    <p className="text-[11px] text-brand-gray">
                      Joined {formatJoinedDate(lead.joinedAt)}
                    </p>
                  </div>
                  <span className="truncate pr-3 text-sm text-brand-gray">
                    {lead.email}
                  </span>
                  <span className="truncate pr-3 text-sm text-brand-ink">
                    {lead.demographics.concern}
                  </span>
                  <span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium sm:text-xs ${statusStyles[status]}`}
                    >
                      {LEAD_STATUS_LABELS[status]}
                    </span>
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onViewReport(lead.id)}
                      className="cursor-pointer rounded-full border border-brand-primary px-3 py-1.5 text-xs font-medium text-brand-primary transition-colors hover:bg-brand-purple-soft"
                    >
                      View report
                    </button>
                    {status === "new" ? (
                      <button
                        type="button"
                        onClick={() => onMarkContacted(lead.id)}
                        className="cursor-pointer rounded-full bg-brand-accent px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                      >
                        Mark contacted
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
