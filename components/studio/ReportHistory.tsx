import type { StudioReport } from "@/lib/studio/reports";
import { formatStudioDateTime } from "@/lib/studio/formatDate";

type ReportHistoryProps = {
  reports: StudioReport[];
  customerId: string;
};

export default function ReportHistory({
  reports,
  customerId,
}: ReportHistoryProps) {
  if (reports.length === 0) {
    return (
      <p className="text-sm text-brand-gray">No PDF reports sent yet.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {reports.map((report) => (
        <li
          key={report.id}
          className="rounded-2xl border border-brand-lavender/70 bg-white px-4 py-3"
        >
          <p className="text-sm font-medium text-brand-ink">
            Skin guidance report
          </p>
          <p className="mt-1 text-xs text-brand-gray">
            {formatStudioDateTime(report.createdAt)} · {report.authorName}
            {report.sentAt ? " · Sent" : " · Saved"}
          </p>
          <a
            href={`/studio/customers/${customerId}/reports/${report.id}`}
            className="mt-2 inline-flex text-sm text-brand-primary hover:underline"
          >
            Download PDF
          </a>
        </li>
      ))}
    </ul>
  );
}
