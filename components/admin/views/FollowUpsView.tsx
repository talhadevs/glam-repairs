import {
  FOLLOW_UP_STATUS_LABELS,
  PLAN_LABELS,
  formatJoinedDate,
} from "@/lib/admin/planLabels";
import type { AdminUser, FollowUpStatus } from "@/types/admin";

const statusStyles: Record<FollowUpStatus, string> = {
  due: "border-brand-error/30 bg-brand-error/10 text-brand-error-strong",
  upcoming: "border-brand-cream bg-brand-cream-light text-[#9a6b00]",
  done: "border-brand-success/30 bg-brand-success/15 text-brand-success-strong",
};

type FollowUpRow = {
  user: AdminUser;
  followUpId: string;
  label: string;
  dueDate: string;
  status: FollowUpStatus;
};

type FollowUpsViewProps = {
  users: AdminUser[];
  onMarkDone: (userId: string, followUpId: string) => void;
};

export default function FollowUpsView({
  users,
  onMarkDone,
}: FollowUpsViewProps) {
  const rows: FollowUpRow[] = users
    .flatMap((user) =>
      user.followUps.map((followUp) => ({
        user,
        followUpId: followUp.id,
        label: followUp.label,
        dueDate: followUp.dueDate,
        status: followUp.status,
      })),
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="overflow-x-auto rounded-3xl border border-brand-lavender/50 bg-white p-4 shadow-sm sm:p-6">
      <div className="min-w-[48rem]">
        <div className="grid grid-cols-[1.4fr_1.3fr_1.2fr_1fr_0.9fr_1fr] rounded-t-2xl bg-brand-purple-soft px-4 py-3.5 text-xs font-medium tracking-[0.02em] text-brand-primary sm:text-[13px]">
          <span>Name</span>
          <span>Plan</span>
          <span>Follow-up</span>
          <span>Due</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>
        <div className="overflow-hidden rounded-b-2xl border border-t-0 border-brand-border-light">
          {rows.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-brand-gray">
              No follow-ups scheduled.
            </p>
          ) : (
            rows.map((row) => (
              <div
                key={`${row.user.id}-${row.followUpId}`}
                className="grid grid-cols-[1.4fr_1.3fr_1.2fr_1fr_0.9fr_1fr] items-center border-b border-brand-border-light/70 bg-white px-4 py-3.5 last:border-b-0"
              >
                <span className="truncate pr-3 text-sm font-medium text-brand-ink">
                  {row.user.fullName}
                </span>
                <span className="text-sm text-brand-gray">
                  {PLAN_LABELS[row.user.plan]}
                </span>
                <span className="text-sm text-brand-ink">{row.label}</span>
                <span className="text-sm text-brand-gray">
                  {formatJoinedDate(row.dueDate)}
                </span>
                <span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium sm:text-xs ${statusStyles[row.status]}`}
                  >
                    {FOLLOW_UP_STATUS_LABELS[row.status]}
                  </span>
                </span>
                <div className="flex justify-end">
                  {row.status === "done" ? (
                    <span className="text-[11px] text-brand-gray">Completed</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onMarkDone(row.user.id, row.followUpId)}
                      className="cursor-pointer rounded-full bg-brand-success-strong px-3.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Mark done
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
