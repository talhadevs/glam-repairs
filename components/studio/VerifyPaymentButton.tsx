"use client";

import { useFormStatus } from "react-dom";

import { verifyCustomerPaymentAction } from "@/lib/studio/actions";
import { PAYMENT_STATUS_LABELS } from "@/lib/studio/constants";
import type { PaymentStatus } from "@/lib/supabase/database.types";

type VerifyPaymentButtonProps = {
  customerId: string;
  paymentStatus: PaymentStatus;
  canVerify: boolean;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Saving…" : "Verify payment"}
    </button>
  );
}

export default function VerifyPaymentButton({
  customerId,
  paymentStatus,
  canVerify,
}: VerifyPaymentButtonProps) {
  if (paymentStatus === "verified") {
    return (
      <p className="rounded-full bg-brand-success/15 px-3 py-2 text-center text-sm font-medium text-brand-success-strong">
        {PAYMENT_STATUS_LABELS.verified}
      </p>
    );
  }

  if (!canVerify) {
    return (
      <p className="text-sm text-brand-gray">
        {PAYMENT_STATUS_LABELS.pending}. You do not have permission to verify
        payments.
      </p>
    );
  }

  return (
    <form action={verifyCustomerPaymentAction} className="space-y-2">
      <p className="text-sm text-brand-gray">
        {PAYMENT_STATUS_LABELS.pending}. Click when the client has paid.
      </p>
      <input type="hidden" name="id" value={customerId} />
      <SubmitButton />
    </form>
  );
}
