"use client";

import { useFormStatus } from "react-dom";

import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";
import { signInAction, signUpOwnerAction } from "@/lib/studio/actions";

const ERROR_COPY: Record<string, string> = {
  missing: "Email and password are required.",
  invalid: "Those credentials did not match a studio account.",
  auth: "Sign-in link expired. Please sign in again.",
  expired:
    "That invite or email link is invalid or has expired. Ask the owner to send a new invite, then click Accept invite on the page.",
  schema:
    "Studio tables are missing. Run the studio SQL migration in Supabase, then try again.",
  "owner-only":
    "Only the configured owner email can create the first Studio account.",
  "owner-exists": "An owner already exists. Ask them to invite you.",
  signup: "Could not create the owner account. Try signing in instead.",
};

type LoginFormProps = {
  nextPath?: string;
  errorCode?: string;
  checkEmail?: boolean;
};

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-medium tracking-[0.08em] text-white disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

function CreateOwnerButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-sm text-brand-primary hover:underline disabled:opacity-60"
    >
      {pending ? "Creating…" : "Create owner account"}
    </button>
  );
}

export default function LoginForm({
  nextPath,
  errorCode,
  checkEmail = false,
}: LoginFormProps) {
  return (
    <div className="space-y-6">
      {checkEmail ? (
        <p className="rounded-xl bg-brand-purple-soft px-4 py-3 text-sm text-brand-ink">
          Owner account is ready. Sign in with the password you just set.
        </p>
      ) : null}
      <form action={signInAction} className="space-y-4">
        {errorCode && ERROR_COPY[errorCode] ? (
          <p
            role="alert"
            className="rounded-xl bg-brand-error/10 px-4 py-3 text-sm text-brand-error-strong"
          >
            {ERROR_COPY[errorCode]}
          </p>
        ) : null}
        <input type="hidden" name="next" value={nextPath || "/studio"} />
        <FormField id="studio-email" label="Email" required>
          <TextInput
            id="studio-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </FormField>
        <FormField id="studio-password" label="Password" required>
          <TextInput
            id="studio-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </FormField>
        <SignInButton />
      </form>
      <form action={signUpOwnerAction} className="text-center">
        <p className="mb-2 text-xs text-brand-gray">
          First time? Use the owner email from your environment.
        </p>
        <CreateOwnerFields />
      </form>
    </div>
  );
}

function CreateOwnerFields() {
  return (
    <div className="space-y-3">
      <TextInput
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Owner email"
        required
      />
      <TextInput
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Password (8+ characters)"
        minLength={8}
        required
      />
      <CreateOwnerButton />
    </div>
  );
}
