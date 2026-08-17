"use client";

import { useFormStatus } from "react-dom";

import { formInputClassName } from "@/components/ui/fieldStyles";
import { assignCustomerAction } from "@/lib/studio/actions";

type TeamOption = {
  userId: string;
  role: "owner" | "staff";
  displayName: string;
};

type AssignCustomerFormProps = {
  customerId: string;
  assignedTo: string | null;
  members: TeamOption[];
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Assigning…" : "Assign"}
    </button>
  );
}

export default function AssignCustomerForm({
  customerId,
  assignedTo,
  members,
}: AssignCustomerFormProps) {
  const team = members.filter((member) => member.role === "staff");

  return (
    <form action={assignCustomerAction} className="space-y-4">
      <input type="hidden" name="id" value={customerId} />
      <label className="block text-sm text-brand-gray">
        Team member
        <select
          name="assignedTo"
          defaultValue={assignedTo ?? ""}
          className={`${formInputClassName} mt-2`}
        >
          <option value="">Unassigned</option>
          {team.map((member) => (
            <option key={member.userId} value={member.userId}>
              {member.displayName}
            </option>
          ))}
        </select>
      </label>
      {team.length === 0 ? (
        <p className="text-sm text-brand-gray">
          Invite a team member first, then assign this customer.
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
