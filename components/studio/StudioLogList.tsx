import Link from "next/link";

import {
  studioLogKindLabel,
  type StudioLog,
} from "@/lib/studio/logs";
import { formatStudioDateTime } from "@/lib/studio/formatDate";

type StudioLogListProps = {
  logs: StudioLog[];
  showAllHref?: string;
};

const KIND_CLASS: Record<StudioLog["kind"], string> = {
  customer: "bg-brand-purple-soft text-brand-primary",
  review: "bg-brand-cream-light text-brand-primary-dark",
  report: "bg-brand-success/15 text-brand-success-strong",
  email: "bg-brand-info/20 text-brand-primary",
};

export default function StudioLogList({ logs, showAllHref }: StudioLogListProps) {
  if (logs.length === 0) {
    return (
      <p className="text-sm text-brand-gray">No studio activity yet.</p>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-brand-lavender/70 overflow-hidden rounded-2xl border border-brand-lavender/70 bg-white">
        {logs.map((log) => (
          <li key={log.id}>
            <LogRow log={log} />
          </li>
        ))}
      </ul>
      {showAllHref ? (
        <div className="mt-4 flex justify-end">
          <Link
            href={showAllHref}
            className="rounded-full bg-brand-primary px-5 py-2.5 text-sm text-white"
          >
            Show all
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function LogRow({ log }: { log: StudioLog }) {
  const content = (
    <>
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ${KIND_CLASS[log.kind]}`}
      >
        {studioLogKindLabel(log.kind)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-brand-ink">{log.title}</span>
        <span className="mt-0.5 block text-xs text-brand-gray">{log.detail}</span>
      </span>
      <span className="shrink-0 text-xs text-brand-gray">
        {formatStudioDateTime(log.createdAt)}
      </span>
    </>
  );

  if (!log.href) {
    return <div className="flex items-start gap-3 px-4 py-3">{content}</div>;
  }

  return (
    <Link
      href={log.href}
      className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-brand-purple-soft/50"
    >
      {content}
    </Link>
  );
}
