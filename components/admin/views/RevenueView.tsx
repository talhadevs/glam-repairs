import {
  PAYMENT_STATUS_LABELS,
  PLAN_LABELS,
  formatCurrency,
  formatJoinedDate,
} from "@/lib/admin/planLabels";
import type { AdminUser, PaymentStatus } from "@/types/admin";

const paymentStyles: Record<PaymentStatus, string> = {
  paid: "border-brand-success/30 bg-brand-success/15 text-brand-success-strong",
  pending: "border-brand-cream bg-brand-cream-light text-[#9a6b00]",
  refunded: "border-brand-error/30 bg-brand-error/10 text-brand-error-strong",
  free: "border-brand-border-light bg-brand-surface text-brand-gray",
};

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-lavender/50 bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5">
      <p className="text-xs text-brand-gray sm:text-sm">{label}</p>
      <p className="mt-1.5 font-serif text-2xl text-brand-primary sm:text-3xl">
        {value}
      </p>
      {hint ? <p className="mt-1 text-[11px] text-brand-gray">{hint}</p> : null}
    </div>
  );
}

export default function RevenueView({ users }: { users: AdminUser[] }) {
  const collected = users
    .filter((user) => user.paymentStatus === "paid")
    .reduce((sum, user) => sum + user.amount, 0);
  const pending = users
    .filter((user) => user.paymentStatus === "pending")
    .reduce((sum, user) => sum + user.amount, 0);
  const refunded = users
    .filter((user) => user.paymentStatus === "refunded")
    .reduce((sum, user) => sum + user.amount, 0);
  const paidCount = users.filter((user) => user.paymentStatus === "paid").length;

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard
          label="Total revenue"
          value={formatCurrency(collected)}
          hint={`${paidCount} paid order${paidCount === 1 ? "" : "s"}`}
        />
        <StatCard label="Pending revenue" value={formatCurrency(pending)} />
        <StatCard label="Refunded" value={formatCurrency(refunded)} />
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-brand-lavender/50 bg-white p-4 shadow-sm sm:p-6">
        <div className="min-w-[44rem]">
          <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1fr_1fr] rounded-t-2xl bg-brand-purple-soft px-4 py-3.5 text-xs font-medium tracking-[0.02em] text-brand-primary sm:text-[13px]">
            <span>Name</span>
            <span>Plan</span>
            <span>Amount</span>
            <span>Payment</span>
            <span>Joined</span>
          </div>
          <div className="overflow-hidden rounded-b-2xl border border-t-0 border-brand-border-light">
            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-[1.5fr_1.2fr_1fr_1fr_1fr] items-center border-b border-brand-border-light/70 bg-white px-4 py-3.5 last:border-b-0"
              >
                <span className="truncate pr-3 text-sm font-medium text-brand-ink">
                  {user.fullName}
                </span>
                <span className="text-sm text-brand-gray">
                  {PLAN_LABELS[user.plan]}
                </span>
                <span className="text-sm font-medium text-brand-ink">
                  {formatCurrency(user.amount)}
                </span>
                <span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium sm:text-xs ${paymentStyles[user.paymentStatus]}`}
                  >
                    {PAYMENT_STATUS_LABELS[user.paymentStatus]}
                  </span>
                </span>
                <span className="text-sm text-brand-gray">
                  {formatJoinedDate(user.joinedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
