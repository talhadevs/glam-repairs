"use client";

import { useFormStatus } from "react-dom";

import { formInputClassName } from "@/components/ui/fieldStyles";
import { CUSTOMER_STATUS_LABELS, CUSTOMER_STATUSES } from "@/lib/studio/constants";
import { updateCustomerAction } from "@/lib/studio/actions";
import type { CustomerStatus } from "@/lib/supabase/database.types";

type CustomerStatusFormProps = {
  customerId: string;
  status: CustomerStatus;
  notes: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

export default function CustomerStatusForm({
  customerId,
  status,
  notes,
}: CustomerStatusFormProps) {
  return (
    <form action={updateCustomerAction} className="space-y-4">
      <input type="hidden" name="id" value={customerId} />
      <label className="block text-sm text-brand-gray">
        Status
        <select
          name="status"
          defaultValue={status}
          className={`${formInputClassName} mt-2`}
        >
          {CUSTOMER_STATUSES.map((value) => (
            <option key={value} value={value}>
              {CUSTOMER_STATUS_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-brand-gray">
        Notes
        <textarea
          name="notes"
          rows={4}
          defaultValue={notes}
          className={`${formInputClassName} mt-2`}
        />
      </label>
      <SubmitButton />
    </form>
  );
}
