"use client";

import { useFormStatus } from "react-dom";

import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";
import { changeStudioPasswordAction } from "@/lib/studio/actions";

const ERROR_COPY: Record<string, string> = {
  short: "New password must be at least 8 characters.",
  mismatch: "New passwords do not match.",
  current: "Current password is incorrect.",
  update: "Could not update password. Try again.",
};

type ChangePasswordFormProps = {
  errorCode?: string;
  saved?: boolean;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Saving…" : "Update password"}
    </button>
  );
}

export default function ChangePasswordForm({
  errorCode,
  saved = false,
}: ChangePasswordFormProps) {
  return (
    <form action={changeStudioPasswordAction} className="max-w-lg space-y-4">
      {saved ? (
        <p className="rounded-xl bg-brand-success/15 px-4 py-3 text-sm text-brand-success-strong">
          Password updated.
        </p>
      ) : null}
      {errorCode && ERROR_COPY[errorCode] ? (
        <p
          role="alert"
          className="rounded-xl bg-brand-error/10 px-4 py-3 text-sm text-brand-error-strong"
        >
          {ERROR_COPY[errorCode]}
        </p>
      ) : null}
      <FormField id="studio-current-password" label="Current password" required>
        <TextInput
          id="studio-current-password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
      </FormField>
      <FormField id="studio-settings-password" label="New password" required>
        <TextInput
          id="studio-settings-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </FormField>
      <FormField
        id="studio-settings-confirm"
        label="Confirm new password"
        required
      >
        <TextInput
          id="studio-settings-confirm"
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
