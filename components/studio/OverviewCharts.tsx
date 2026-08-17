import CustomerTrendChart from "@/components/studio/CustomerTrendChart";
import StudioDonutChart from "@/components/studio/StudioDonutChart";
import StudioGroupedBarChart from "@/components/studio/StudioGroupedBarChart";
import StudioLogList from "@/components/studio/StudioLogList";
import type { StudioLog } from "@/lib/studio/logs";
import type {
  CustomerTrendPoint,
  MonthOption,
  PaymentSplit,
  TeamWorkRow,
} from "@/lib/studio/overview";

type OverviewChartsProps = {
  customerTrend: CustomerTrendPoint[];
  months: MonthOption[];
  selectedMonth: string;
  teamWork: TeamWorkRow[];
  payment: PaymentSplit;
  logs: StudioLog[];
};

const TEAM_SERIES = [
  { key: "reviews", label: "Reviews", color: "#662d91" },
  { key: "reports", label: "Reports", color: "#a88ec3" },
  { key: "emails", label: "Emails", color: "#bda8d4" },
];

export default function OverviewCharts({
  customerTrend,
  months,
  selectedMonth,
  teamWork,
  payment,
  logs,
}: OverviewChartsProps) {
  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl border border-brand-lavender/70 bg-white p-5">
        <CustomerTrendChart
          points={customerTrend}
          months={months}
          selectedMonth={selectedMonth}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-brand-lavender/70 bg-white p-5">
          <h2 className="font-serif text-xl text-brand-primary">Team work</h2>
          <p className="mt-1 text-sm text-brand-gray">
            Photo reviews, PDF reports, and emails sent by each person.
          </p>
          <div className="mt-4">
            <StudioGroupedBarChart
              series={TEAM_SERIES}
              groups={teamWork.map((row) => ({
                id: row.userId,
                label: row.name,
                values: {
                  reviews: row.reviews,
                  reports: row.reports,
                  emails: row.emails,
                },
              }))}
              ariaLabel="Bar chart of reviews, reports, and emails by team member"
              emptyMessage="No team reviews, reports, or emails yet."
            />
          </div>
        </section>

        <section className="rounded-2xl border border-brand-lavender/70 bg-white p-5">
          <h2 className="font-serif text-xl text-brand-primary">
            Paid vs pending
          </h2>
          <p className="mt-1 text-sm text-brand-gray">
            How many customers have verified payment.
          </p>
          <div className="mt-6">
            <StudioDonutChart paid={payment.paid} pending={payment.pending} />
          </div>
        </section>
      </div>

      <section>
        <h2 className="font-serif text-xl text-brand-primary">Studio logs</h2>
        <p className="mt-1 text-sm text-brand-gray">
          Latest customer and team activity.
        </p>
        <div className="mt-4">
          <StudioLogList logs={logs} showAllHref="/studio/logs" />
        </div>
      </section>
    </div>
  );
}
