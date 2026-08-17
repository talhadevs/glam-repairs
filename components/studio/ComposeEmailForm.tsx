"use client";

import { useFormStatus } from "react-dom";

import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";
import { formInputClassName } from "@/components/ui/fieldStyles";
import { sendCustomerEmailAction } from "@/lib/studio/actions";

type ComposeEmailFormProps = {
  leadId: string;
  toEmail: string;
  customerName: string;
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-full bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send email"}
    </button>
  );
}

export default function ComposeEmailForm({
  leadId,
  toEmail,
  customerName,
}: ComposeEmailFormProps) {
  const canSend = Boolean(toEmail);

  return (
    <form action={sendCustomerEmailAction} className="space-y-4">
      <input type="hidden" name="leadId" value={leadId} />
      <input type="hidden" name="toEmail" value={toEmail} />
      <input type="hidden" name="customerName" value={customerName} />
      {!canSend ? (
        <p className="text-sm text-brand-gray">
          Add an email address before sending a message.
        </p>
      ) : (
        <p className="text-sm text-brand-gray">
          Sending to <span className="font-medium text-brand-ink">{toEmail}</span>
        </p>
      )}
      <FormField id="email-subject" label="Subject" required>
        <TextInput
          id="email-subject"
          name="subject"
          required
          disabled={!canSend}
        />
      </FormField>
      <FormField id="email-body" label="Message" required>
        <textarea
          id="email-body"
          name="body"
          required
          rows={6}
          disabled={!canSend}
          className={formInputClassName}
        />
      </FormField>
      <SubmitButton disabled={!canSend} />
    </form>
  );
}
