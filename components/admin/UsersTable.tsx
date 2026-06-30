"use client";

import { useMemo, useState } from "react";
import PlanStatusBadge from "@/components/admin/PlanStatusBadge";
import ReportStatusBadge from "@/components/admin/ReportStatusBadge";
import TextInput from "@/components/ui/TextInput";
import { PLAN_LABELS, formatJoinedDate } from "@/lib/admin/planLabels";
import type { AdminUser, PlanId, PlanStatus } from "@/types/admin";

type PlanFilter = "all" | PlanId;
type StatusFilter = "all" | PlanStatus;

const planFilters: { id: PlanFilter; label: string }[] = [
  { id: "all", label: "All plans" },
  { id: "clarity", label: "Clarity" },
  { id: "transform", label: "Transform" },
];

const statusFilters: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "active", label: "Active" },
  { id: "disabled", label: "Disabled" },
];

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-[13px] ${
        active
          ? "border-brand-primary bg-brand-primary text-white"
          : "border-brand-border-light bg-white text-brand-gray hover:border-brand-lavender"
      }`}
    >
      {label}
    </button>
  );
}

type UsersTableProps = {
  users: AdminUser[];
  onTogglePlan: (userId: string) => void;
  onReview: (userId: string) => void;
};

export default function UsersTable({
  users,
  onTogglePlan,
  onReview,
}: UsersTableProps) {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<PlanFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesPlan = planFilter === "all" || user.plan === planFilter;
      const matchesStatus =
        statusFilter === "all" || user.planStatus === statusFilter;
      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [users, search, planFilter, statusFilter]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <TextInput
            id="admin-search"
            type="search"
            placeholder="Search by name or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <FilterPill
              key={filter.id}
              active={statusFilter === filter.id}
              label={filter.label}
              onClick={() => setStatusFilter(filter.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {planFilters.map((filter) => (
          <FilterPill
            key={filter.id}
            active={planFilter === filter.id}
            label={filter.label}
            onClick={() => setPlanFilter(filter.id)}
          />
        ))}
      </div>

      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[52rem]">
          <div className="grid grid-cols-[1.4fr_1.6fr_1fr_0.9fr_1fr_1.4fr] rounded-t-2xl bg-brand-purple-soft px-4 py-3.5 text-xs font-medium tracking-[0.02em] text-brand-primary sm:text-[13px]">
            <span>Name</span>
            <span>Email</span>
            <span>Plan</span>
            <span>Plan status</span>
            <span>Report</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="overflow-hidden rounded-b-2xl border border-t-0 border-brand-border-light">
            {filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-brand-gray">
                No users match your filters.
              </p>
            ) : (
              filtered.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[1.4fr_1.6fr_1fr_0.9fr_1fr_1.4fr] items-center border-b border-brand-border-light/70 bg-white px-4 py-3.5 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-brand-ink">
                      {user.fullName}
                    </p>
                    <p className="text-[11px] text-brand-gray">
                      Joined {formatJoinedDate(user.joinedAt)}
                    </p>
                  </div>
                  <span className="truncate pr-3 text-sm text-brand-gray">
                    {user.email}
                  </span>
                  <span className="text-sm text-brand-ink">
                    {PLAN_LABELS[user.plan]}
                  </span>
                  <span>
                    <PlanStatusBadge status={user.planStatus} />
                  </span>
                  <span>
                    <ReportStatusBadge status={user.reportStatus} />
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onTogglePlan(user.id)}
                      className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 ${
                        user.planStatus === "active"
                          ? "bg-brand-error-strong"
                          : "bg-brand-success-strong"
                      }`}
                    >
                      {user.planStatus === "active" ? "Disable" : "Enable"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onReview(user.id)}
                      className="cursor-pointer rounded-full bg-brand-accent px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
