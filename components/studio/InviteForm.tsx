"use client";

import { useFormStatus } from "react-dom";

import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";
import { inviteTeamMemberAction } from "@/lib/studio/actions";

const ERROR_COPY: Record<string, string> = {
  forbidden: "Only the owner can invite teammates.",
  invalid: "Name and a valid email are required.",
  invite: "Could not send the invite. Check the email and try again.",
  owner: "That account is already the studio owner.",
  remove: "Could not remove that teammate.",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Inviting…" : "Send invite"}
    </button>
  );
}

type InviteFormProps = {
  errorCode?: string;
};

export default function InviteForm({ errorCode }: InviteFormProps) {
  return (
    <form action={inviteTeamMemberAction} className="max-w-lg space-y-4">
      {errorCode && ERROR_COPY[errorCode] ? (
        <p
          role="alert"
          className="rounded-xl bg-brand-error/10 px-4 py-3 text-sm text-brand-error-strong"
        >
          {ERROR_COPY[errorCode]}
        </p>
      ) : null}
      <FormField id="invite-name" label="Name" required>
        <TextInput id="invite-name" name="displayName" required />
      </FormField>
      <FormField id="invite-email" label="Email" required>
        <TextInput id="invite-email" name="email" type="email" required />
      </FormField>
      <SubmitButton />
    </form>
  );
}
