"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import TextInput from "@/components/ui/TextInput";
import { formInputClassName } from "@/components/ui/fieldStyles";
import { PAYMENT_STATUS_LABELS, PLAN_OPTIONS } from "@/lib/studio/constants";

type TeamOption = {
  userId: string;
  role: "owner" | "staff";
  displayName: string;
};

type CustomerSearchProps = {
  initialQuery?: string;
  initialPlan?: string;
  initialPayment?: string;
  initialAssigned?: string;
  members?: TeamOption[];
  showAssignmentFilter?: boolean;
};

const selectClassName = `${formInputClassName} sm:w-44`;

export default function CustomerSearch({
  initialQuery = "",
  initialPlan = "",
  initialPayment = "",
  initialAssigned = "",
  members = [],
  showAssignmentFilter = false,
}: CustomerSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [plan, setPlan] = useState(initialPlan);
  const [payment, setPayment] = useState(initialPayment);
  const [assigned, setAssigned] = useState(initialAssigned);

  function applyFilters(
    nextQuery: string,
    nextPlan: string,
    nextPayment: string,
    nextAssigned: string,
  ) {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextPlan) params.set("plan", nextPlan);
    if (nextPayment) params.set("payment", nextPayment);
    if (nextAssigned) params.set("assigned", nextAssigned);
    router.push(
      params.size > 0
        ? `/studio/customers?${params.toString()}`
        : "/studio/customers",
    );
  }

  const team = members.filter((member) => member.role === "staff");

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"
      onSubmit={(event) => {
        event.preventDefault();
        applyFilters(query, plan, payment, assigned);
      }}
    >
      <TextInput
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search name, email, or plan"
        className="max-w-md"
      />
      <select
        name="plan"
        value={plan}
        aria-label="Filter by plan"
        className={selectClassName}
        onChange={(event) => {
          const nextPlan = event.target.value;
          setPlan(nextPlan);
          applyFilters(query, nextPlan, payment, assigned);
        }}
      >
        <option value="">All plans</option>
        {PLAN_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <select
        name="payment"
        value={payment}
        aria-label="Filter by payment"
        className={selectClassName}
        onChange={(event) => {
          const nextPayment = event.target.value;
          setPayment(nextPayment);
          applyFilters(query, plan, nextPayment, assigned);
        }}
      >
        <option value="">All payments</option>
        <option value="pending">{PAYMENT_STATUS_LABELS.pending}</option>
        <option value="verified">{PAYMENT_STATUS_LABELS.verified}</option>
      </select>
      {showAssignmentFilter ? (
        <select
          name="assigned"
          value={assigned}
          aria-label="Filter by assignment"
          className={selectClassName}
          onChange={(event) => {
            const nextAssigned = event.target.value;
            setAssigned(nextAssigned);
            applyFilters(query, plan, payment, nextAssigned);
          }}
        >
          <option value="">All assignments</option>
          <option value="unassigned">Unassigned</option>
          {team.map((member) => (
            <option key={member.userId} value={member.userId}>
              {member.displayName}
            </option>
          ))}
        </select>
      ) : null}
      <button
        type="submit"
        className="rounded-full bg-brand-primary px-4 py-2 text-sm text-white"
      >
        Filter
      </button>
    </form>
  );
}
