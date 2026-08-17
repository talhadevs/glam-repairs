"use client";

import { useFormStatus } from "react-dom";

import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";
import { formInputClassName } from "@/components/ui/fieldStyles";
import { sendBroadcastAction } from "@/lib/studio/actions";

type BroadcastFormProps = {
  paidCount: number;
  pendingCount: number;
  abandonedCount: number;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send broadcast"}
    </button>
  );
}

export default function BroadcastForm({
  paidCount,
  pendingCount,
  abandonedCount,
}: BroadcastFormProps) {
  return (
    <form action={sendBroadcastAction} className="space-y-5">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-brand-ink">
          Audience
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-lavender/70 bg-white p-4">
            <input type="checkbox" name="audience" value="paid" className="mt-1" />
            <span>
              <span className="block text-sm font-medium text-brand-ink">
                Paid
              </span>
              <span className="mt-1 block text-xs text-brand-gray">
                {paidCount} verified payments
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-lavender/70 bg-white p-4">
            <input
              type="checkbox"
              name="audience"
              value="pending"
              className="mt-1"
            />
            <span>
              <span className="block text-sm font-medium text-brand-ink">
                Pending payment
              </span>
              <span className="mt-1 block text-xs text-brand-gray">
                {pendingCount} finished funnel, not paid
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-lavender/70 bg-white p-4">
            <input
              type="checkbox"
              name="audience"
              value="abandoned"
              className="mt-1"
            />
            <span>
              <span className="block text-sm font-medium text-brand-ink">
                Left funnel
              </span>
              <span className="mt-1 block text-xs text-brand-gray">
                {abandonedCount} started and did not finish
              </span>
            </span>
          </label>
        </div>
      </fieldset>
      <FormField id="broadcast-subject" label="Subject" required>
        <TextInput id="broadcast-subject" name="subject" required />
      </FormField>
      <FormField id="broadcast-body" label="Message" required>
        <textarea
          id="broadcast-body"
          name="body"
          required
          rows={8}
          className={formInputClassName}
          placeholder="Write one email. It will go to everyone in the selected groups who has an email address."
        />
      </FormField>
      <SubmitButton />
    </form>
  );
}
