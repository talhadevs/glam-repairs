import {
  DonutChart,
  Gauge,
  MiniBars,
  TrendChart,
} from "@/components/admin/charts/Charts";
import { monthlyRevenue, weeklySignups } from "@/lib/admin/dashboardData";
import { PLAN_PRICES, formatCurrency } from "@/lib/admin/planLabels";
import type { AdminUser } from "@/types/admin";

type MetricCardProps = {
  label: string;
  value: string;
  delta?: string;
  bars?: number[];
  highlight?: boolean;
};

function MetricCard({ label, value, delta, bars, highlight }: MetricCardProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-4 shadow-sm sm:p-5 ${
        highlight
          ? "border-transparent bg-brand-primary text-white"
          : "border-brand-lavender/50 bg-white"
      }`}
    >
      <p
        className={`text-xs sm:text-sm ${highlight ? "text-white/80" : "text-brand-gray"}`}
      >
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p
            className={`font-serif text-2xl sm:text-3xl ${highlight ? "text-white" : "text-brand-primary"}`}
          >
            {value}
          </p>
          {delta ? (
            <p
              className={`mt-1.5 text-[11px] font-medium ${highlight ? "text-white/80" : "text-brand-success-strong"}`}
            >
              {delta}
            </p>
          ) : null}
        </div>
        {bars ? (
          <MiniBars values={bars} tone={highlight ? "white" : "accent"} />
        ) : null}
      </div>
    </div>
  );
}

export default function DashboardOverview({ users }: { users: AdminUser[] }) {
  const totalUsers = users.length;
  const leadCount = users.filter((u) => u.plan === "starter").length;
  const paidCustomers = users.filter((u) => u.plan !== "starter").length;
  const activePlans = users.filter(
    (u) => u.plan !== "starter" && u.planStatus === "active",
  ).length;
  const revenue = users
    .filter((u) => u.paymentStatus === "paid")
    .reduce((sum, u) => sum + u.amount, 0);

  const clarityCount = users.filter((u) => u.plan === "clarity").length;
  const transformCount = users.filter((u) => u.plan === "transform").length;
  const clarityRevenue = clarityCount * PLAN_PRICES.clarity;
  const transformRevenue = transformCount * PLAN_PRICES.transform;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MetricCard
            label="Total users"
            value={String(totalUsers)}
            delta={`${paidCustomers} paid · ${leadCount} free`}
            bars={[8, 5, 11, 7, 12]}
          />
          <MetricCard
            label="Leads (Free)"
            value={String(leadCount)}
            delta="▲ 0% from last week"
            bars={[2, 4, 3, 6, 5]}
          />
          <MetricCard
            label="Active plans"
            value={String(activePlans)}
            delta="▲ 0% from last week"
            bars={[4, 7, 6, 9, 8]}
          />
          <MetricCard
            label="Total revenue"
            value={formatCurrency(revenue)}
            delta="▲ +12% than last month"
            bars={[5, 8, 6, 10, 12]}
            highlight
          />
        </div>

        <div className="rounded-2xl border border-brand-lavender/50 bg-white p-5 shadow-sm">
          <p className="text-center text-sm font-medium text-brand-primary">
            Active subscriptions this month
          </p>
          <div className="mt-3">
            <Gauge
              value={activePlans}
              total={paidCustomers}
              label="active plans"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-brand-purple-soft/70 px-3 py-2.5 text-center">
              <p className="text-[11px] text-brand-gray">Clarity</p>
              <p className="font-serif text-lg text-brand-primary">
                {clarityCount}
              </p>
            </div>
            <div className="rounded-xl bg-brand-purple-soft/70 px-3 py-2.5 text-center">
              <p className="text-[11px] text-brand-gray">Transform</p>
              <p className="font-serif text-lg text-brand-primary">
                {transformCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-brand-lavender/50 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-brand-primary sm:text-xl">
              Revenue trend
            </h3>
            <span className="rounded-full bg-brand-success/15 px-2.5 py-1 text-[11px] font-medium text-brand-success-strong">
              Last 7 months
            </span>
          </div>
          <div className="mt-4">
            <TrendChart data={monthlyRevenue} />
          </div>
        </div>

        <div className="rounded-2xl border border-brand-lavender/50 bg-white p-5 shadow-sm">
          <h3 className="font-serif text-lg text-brand-primary sm:text-xl">
            Revenue by plan
          </h3>
          <div className="mt-5">
            <DonutChart
              segments={[
                { label: "Clarity", value: clarityRevenue, color: "#a88ec3" },
                { label: "Transform", value: transformRevenue, color: "#662d91" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-lavender/50 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-brand-primary sm:text-xl">
            Weekly signups
          </h3>
          <span className="text-xs text-brand-gray">This month</span>
        </div>

        {(() => {
          const max = Math.max(...weeklySignups.map((p) => p.value), 1);
          const ticks = 4;
          return (
            <div className="mt-5 flex gap-3">
              <div className="flex h-40 w-6 shrink-0 flex-col justify-between py-1 text-right text-[10px] text-brand-gray">
                {Array.from({ length: ticks + 1 }).map((_, i) => (
                  <span key={i}>{Math.round((max / ticks) * (ticks - i))}</span>
                ))}
              </div>

              <div className="relative flex-1">
                <div className="absolute inset-0 flex flex-col justify-between py-1">
                  {Array.from({ length: ticks + 1 }).map((_, i) => (
                    <span
                      key={i}
                      className="block h-px w-full bg-brand-border-light/70"
                    />
                  ))}
                </div>

                <div className="relative flex h-40 items-end gap-3 px-1 sm:gap-6">
                  {weeklySignups.map((point) => (
                    <div
                      key={point.month}
                      className="flex flex-1 flex-col items-center justify-end"
                    >
                      <span className="mb-1 text-xs font-semibold text-brand-primary">
                        {point.value}
                      </span>
                      <div
                        className="w-7 rounded-t-lg bg-gradient-to-t from-brand-light to-brand-accent transition-all sm:w-10"
                        style={{ height: `${(point.value / max) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        <div className="mt-2 flex gap-3">
          <div className="w-6 shrink-0" />
          <div className="flex flex-1 gap-3 px-1 sm:gap-6">
            {weeklySignups.map((point) => (
              <span
                key={point.month}
                className="flex-1 text-center text-xs text-brand-gray"
              >
                {point.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
