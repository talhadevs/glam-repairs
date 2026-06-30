import ReportStatusBadge from "@/components/admin/ReportStatusBadge";
import { PLAN_LABELS, formatJoinedDate } from "@/lib/admin/planLabels";
import type { AdminUser } from "@/types/admin";

type ReviewsViewProps = {
  users: AdminUser[];
  mode: "pending" | "completed";
  onReview: (userId: string) => void;
};

export default function ReviewsView({
  users,
  mode,
  onReview,
}: ReviewsViewProps) {
  const emptyMessage =
    mode === "pending"
      ? "No reports waiting for review."
      : "No completed reports yet.";

  return (
    <div className="overflow-x-auto rounded-3xl border border-brand-lavender/50 bg-white p-4 shadow-sm sm:p-6">
      <div className="min-w-[46rem]">
        <div className="grid grid-cols-[1.4fr_1.7fr_1.1fr_1fr_1fr] rounded-t-2xl bg-brand-purple-soft px-4 py-3.5 text-xs font-medium tracking-[0.02em] text-brand-primary sm:text-[13px]">
          <span>Name</span>
          <span>Email</span>
          <span>Plan</span>
          <span>Report</span>
          <span className="text-right">Action</span>
        </div>
        <div className="overflow-hidden rounded-b-2xl border border-t-0 border-brand-border-light">
          {users.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-brand-gray">
              {emptyMessage}
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-[1.4fr_1.7fr_1.1fr_1fr_1fr] items-center border-b border-brand-border-light/70 bg-white px-4 py-3.5 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-brand-ink">
                    {user.fullName}
                  </p>
                  <p className="text-[11px] text-brand-gray">
                    Joined {formatJoinedDate(user.joinedAt)}
                  </p>
                </div>
                <span className="truncate pr-3 text-sm text-brand-gray">
                  {user.email}
                </span>
                <span className="text-sm text-brand-ink">
                  {PLAN_LABELS[user.plan]}
                </span>
                <span>
                  <ReportStatusBadge status={user.reportStatus} />
                </span>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onReview(user.id)}
                    className="cursor-pointer rounded-full bg-brand-accent px-3.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {mode === "pending" ? "Review" : "View"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
