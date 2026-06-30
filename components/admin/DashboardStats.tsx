import type { AdminUser } from "@/types/admin";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-brand-lavender/50 bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5">
      <p className="text-xs text-brand-gray sm:text-sm">{label}</p>
      <p className="mt-1.5 font-serif text-2xl text-brand-primary sm:text-3xl">{value}</p>
    </div>
  );
}

export default function DashboardStats({ users }: { users: AdminUser[] }) {
  const totalUsers = users.length;
  const activePlans = users.filter((user) => user.planStatus === "active").length;
  const pendingReview = users.filter(
    (user) => user.reportStatus !== "sent",
  ).length;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      <StatCard label="Total users" value={totalUsers} />
      <StatCard label="Active plans" value={activePlans} />
      <StatCard label="Reports to review" value={pendingReview} />
    </div>
  );
}
