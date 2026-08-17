"use client";

import { useFormStatus } from "react-dom";

import FormField from "@/components/ui/FormField";
import { formInputClassName } from "@/components/ui/fieldStyles";
import { sendCustomerReportAction } from "@/lib/studio/actions";

type ReportDefaults = {
  noticed: string;
  morningRoutine: string;
  nightRoutine: string;
  avoidItems: string;
  extraNotes: string;
};

type CreateReportFormProps = {
  leadId: string;
  toEmail: string;
  defaults?: ReportDefaults;
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Sending PDF…" : "Send PDF report"}
    </button>
  );
}

export default function CreateReportForm({
  leadId,
  toEmail,
  defaults,
}: CreateReportFormProps) {
  const canSend = Boolean(toEmail);

  return (
    <form action={sendCustomerReportAction} className="space-y-4">
      <input type="hidden" name="leadId" value={leadId} />
      {!canSend ? (
        <p className="text-sm text-brand-gray">
          Add an email address before sending a PDF report.
        </p>
      ) : (
        <p className="text-sm text-brand-gray">
          The PDF will be emailed to{" "}
          <span className="font-medium text-brand-ink">{toEmail}</span>
          {defaults?.noticed
            ? ". Fields below are filled from the latest team review — edit before sending."
            : "."}
        </p>
      )}
      <FormField id="noticed" label="What we noticed" required>
        <textarea
          id="noticed"
          name="noticed"
          required
          rows={4}
          disabled={!canSend}
          defaultValue={defaults?.noticed}
          placeholder="Write what you observed from the photos and quiz answers."
          className={formInputClassName}
        />
      </FormField>
      <FormField id="morningRoutine" label="Morning routine" required>
        <textarea
          id="morningRoutine"
          name="morningRoutine"
          required
          rows={4}
          disabled={!canSend}
          defaultValue={defaults?.morningRoutine}
          placeholder="Step-by-step AM routine for this customer."
          className={formInputClassName}
        />
      </FormField>
      <FormField id="nightRoutine" label="Night routine" required>
        <textarea
          id="nightRoutine"
          name="nightRoutine"
          required
          rows={4}
          disabled={!canSend}
          defaultValue={defaults?.nightRoutine}
          placeholder="Step-by-step PM routine for this customer."
          className={formInputClassName}
        />
      </FormField>
      <FormField id="avoidItems" label="What to avoid" required>
        <textarea
          id="avoidItems"
          name="avoidItems"
          required
          rows={4}
          disabled={!canSend}
          defaultValue={defaults?.avoidItems}
          placeholder={"One item per line\nHarsh scrubs\nSteroid creams"}
          className={formInputClassName}
        />
      </FormField>
      <FormField id="extraNotes" label="Extra notes">
        <textarea
          id="extraNotes"
          name="extraNotes"
          rows={3}
          disabled={!canSend}
          defaultValue={defaults?.extraNotes}
          placeholder="Optional follow-up, lifestyle, or monitoring notes."
          className={formInputClassName}
        />
      </FormField>
      <SubmitButton disabled={!canSend} />
    </form>
  );
}
