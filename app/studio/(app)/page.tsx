import Link from "next/link";

import OverviewCharts from "@/components/studio/OverviewCharts";
import { getStudioOverviewCounts } from "@/lib/studio/customers";
import { listStudioLogs } from "@/lib/studio/logs";
import { getStudioOverviewCharts } from "@/lib/studio/overview";

type StudioOverviewPageProps = {
  searchParams: Promise<{ month?: string }>;
};

export default async function StudioOverviewPage({
  searchParams,
}: StudioOverviewPageProps) {
  const query = await searchParams;
  const [counts, charts, logs] = await Promise.all([
    getStudioOverviewCounts(),
    getStudioOverviewCharts(query.month),
    listStudioLogs(8),
  ]);

  const cards = [
    { label: "Customers", value: counts.customers, href: "/studio/customers" },
    { label: "New leads", value: counts.newLeads, href: "/studio/customers" },
    {
      label: "Photos available",
      value: counts.photosAvailable,
      href: "/studio/customers",
    },
    { label: "Team", value: counts.teamSize, href: "/studio/team" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-brand-primary">Home</h1>
      <p className="mt-2 text-sm text-brand-gray">
        Customers, photos, and team activity in one place.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-brand-lavender/70 bg-white px-5 py-6 transition-colors hover:border-brand-light"
          >
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-gray">
              {card.label}
            </p>
            <p className="mt-3 font-serif text-4xl text-brand-primary">
              {card.value}
            </p>
          </Link>
        ))}
      </div>
      <OverviewCharts
        customerTrend={charts.customerTrend}
        months={charts.months}
        selectedMonth={charts.selectedMonth}
        teamWork={charts.teamWork}
        payment={charts.payment}
        logs={logs}
      />
    </div>
  );
}
