"use client";

import { useFormStatus } from "react-dom";

import { formInputClassName } from "@/components/ui/fieldStyles";
import { allowReportSenderAction } from "@/lib/studio/actions";

type TeamOption = {
  userId: string;
  role: "owner" | "staff";
  displayName: string;
};

type AllowReportSenderFormProps = {
  customerId: string;
  reportSenderId: string | null;
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
      {pending ? "Saving…" : "Allow send"}
    </button>
  );
}

export default function AllowReportSenderForm({
  customerId,
  reportSenderId,
  members,
}: AllowReportSenderFormProps) {
  const team = members.filter((member) => member.role === "staff");

  return (
    <form action={allowReportSenderAction} className="space-y-4">
      <input type="hidden" name="id" value={customerId} />
      <p className="text-sm text-brand-gray">
        You can always send the PDF. Choose a team member who may also send it
        to the customer.
      </p>
      <label className="block text-sm text-brand-gray">
        Allowed sender
        <select
          name="reportSenderId"
          defaultValue={reportSenderId ?? ""}
          className={`${formInputClassName} mt-2`}
        >
          <option value="">Owner only</option>
          {team.map((member) => (
            <option key={member.userId} value={member.userId}>
              {member.displayName}
            </option>
          ))}
        </select>
      </label>
      {team.length === 0 ? (
        <p className="text-sm text-brand-gray">Invite a team member first.</p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
