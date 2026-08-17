"use client";

import { useFormStatus } from "react-dom";

import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";
import { setPasswordAction } from "@/lib/studio/actions";

const ERROR_COPY: Record<string, string> = {
  short: "Password must be at least 8 characters.",
  mismatch: "Passwords do not match.",
  update: "Could not update password. Try the invite link again.",
};

type SetPasswordFormProps = {
  errorCode?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-medium tracking-[0.08em] text-white disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save password"}
    </button>
  );
}

export default function SetPasswordForm({ errorCode }: SetPasswordFormProps) {
  return (
    <form action={setPasswordAction} className="space-y-4">
      {errorCode && ERROR_COPY[errorCode] ? (
        <p
          role="alert"
          className="rounded-xl bg-brand-error/10 px-4 py-3 text-sm text-brand-error-strong"
        >
          {ERROR_COPY[errorCode]}
        </p>
      ) : null}
      <FormField id="studio-new-password" label="New password" required>
        <TextInput
          id="studio-new-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </FormField>
      <FormField id="studio-confirm-password" label="Confirm password" required>
        <TextInput
          id="studio-confirm-password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </FormField>
      <SubmitButton />
    </form>
  );
}
