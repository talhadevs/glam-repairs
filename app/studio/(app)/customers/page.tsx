import Link from "next/link";

import CustomerSearch from "@/components/studio/CustomerSearch";
import CustomerTable from "@/components/studio/CustomerTable";
import { listStudioCustomers } from "@/lib/studio/customers";
import { listStudioMembers, requireStudioMember } from "@/lib/studio/member";

type CustomersPageProps = {
  searchParams: Promise<{
    q?: string;
    plan?: string;
    payment?: string;
    assigned?: string;
    added?: string;
  }>;
};

export default async function StudioCustomersPage({
  searchParams,
}: CustomersPageProps) {
  const params = await searchParams;
  const { member } = await requireStudioMember();
  const isOwner = member?.role === "owner";
  const [customers, members] = await Promise.all([
    listStudioCustomers({
      search: params.q,
      plan: params.plan,
      payment: params.payment,
      assigned: isOwner ? params.assigned : undefined,
    }),
    isOwner ? listStudioMembers() : Promise.resolve([]),
  ]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-brand-primary">Customers</h1>
          <p className="mt-1 text-sm text-brand-gray">
            {isOwner
              ? "Assign funnel leads and customers to a team member."
              : "Customers assigned to you by the owner."}
          </p>
        </div>
        <Link
          href="/studio/customers/new"
          className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-sm text-white"
        >
          Add customer
        </Link>
      </div>
      {params.added ? (
        <p className="mt-6 rounded-xl bg-brand-success/15 px-4 py-3 text-sm text-brand-success-strong">
          Customer saved. The owner will assign it to a team member.
        </p>
      ) : null}
      <div className="mt-6">
        <CustomerSearch
          initialQuery={params.q}
          initialPlan={params.plan}
          initialPayment={params.payment}
          initialAssigned={params.assigned}
          members={members}
          showAssignmentFilter={isOwner}
        />
      </div>
      <div className="mt-6">
        <CustomerTable
          customers={customers}
          showAssignment={isOwner}
          emptyMessage={
            isOwner
              ? "No customers match this search yet."
              : "No customers have been assigned to you yet."
          }
        />
      </div>
    </div>
  );
}
