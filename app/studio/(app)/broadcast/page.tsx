import BroadcastForm from "@/components/studio/BroadcastForm";
import { isAbandonedFunnel, listStudioCustomers } from "@/lib/studio/customers";

type BroadcastPageProps = {
  searchParams: Promise<{
    sent?: string;
    failed?: string;
    error?: string;
    message?: string;
  }>;
};

export default async function StudioBroadcastPage({
  searchParams,
}: BroadcastPageProps) {
  const query = await searchParams;
  const customers = await listStudioCustomers();
  const paidCount = customers.filter(
    (customer) => customer.paymentStatus === "verified",
  ).length;
  const abandonedCount = customers.filter(isAbandonedFunnel).length;
  const pendingCount = customers.filter(
    (customer) =>
      customer.paymentStatus === "pending" && !isAbandonedFunnel(customer),
  ).length;

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-brand-primary">Broadcast</h1>
      <p className="mt-2 text-sm text-brand-gray">
        Email paid clients, pending payments, or people who started the funnel
        and left.
      </p>
      {query.sent ? (
        <p className="mt-6 rounded-xl bg-brand-success/15 px-4 py-3 text-sm text-brand-success-strong">
          Sent {query.sent} email{query.sent === "1" ? "" : "s"}
          {query.failed ? ` · ${query.failed} failed` : ""}.
        </p>
      ) : null}
      {query.error ? (
        <p className="mt-6 rounded-xl bg-brand-error/10 px-4 py-3 text-sm text-brand-error-strong">
          {query.message || "Could not send the broadcast."}
        </p>
      ) : null}
      <div className="mt-8 rounded-2xl border border-brand-lavender/70 bg-white p-5">
        <BroadcastForm
          paidCount={paidCount}
          pendingCount={pendingCount}
          abandonedCount={abandonedCount}
        />
      </div>
    </div>
  );
}
