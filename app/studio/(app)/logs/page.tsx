import StudioLogList from "@/components/studio/StudioLogList";
import { listStudioLogs } from "@/lib/studio/logs";

export default async function StudioLogsPage() {
  const logs = await listStudioLogs(200);

  return (
    <div>
      <h1 className="font-serif text-3xl text-brand-primary">Studio logs</h1>
      <p className="mt-2 text-sm text-brand-gray">
        Recent customer, review, report, and email activity.
      </p>
      <div className="mt-8">
        <StudioLogList logs={logs} />
      </div>
    </div>
  );
}
