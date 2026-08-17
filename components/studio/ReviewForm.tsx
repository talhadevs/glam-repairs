"use client";

import { useFormStatus } from "react-dom";

import FormField from "@/components/ui/FormField";
import { formInputClassName } from "@/components/ui/fieldStyles";
import { submitCustomerReviewAction } from "@/lib/studio/actions";
import {
  REVIEW_DECISION_LABELS,
  REVIEW_DECISIONS,
} from "@/lib/studio/constants";

type ReviewFormProps = {
  leadId: string;
  isOwner?: boolean;
};

function SubmitButton({ isOwner }: { isOwner?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm text-white disabled:opacity-60"
    >
      {pending
        ? "Saving review…"
        : isOwner
          ? "Save review"
          : "Send review to owner"}
    </button>
  );
}

export default function ReviewForm({ leadId, isOwner }: ReviewFormProps) {
  return (
    <form action={submitCustomerReviewAction} className="space-y-4">
      <input type="hidden" name="leadId" value={leadId} />
      <p className="text-sm text-brand-gray">
        {isOwner
          ? "Add your own photo decision, or use the team reviews on the right when writing the PDF."
          : "Review the customer photos, then send your decision to the owner."}
      </p>
      <FormField id="decision" label="Decision" required>
        <select
          id="decision"
          name="decision"
          required
          defaultValue="ready_for_report"
          className={formInputClassName}
        >
          {REVIEW_DECISIONS.map((value) => (
            <option key={value} value={value}>
              {REVIEW_DECISION_LABELS[value]}
            </option>
          ))}
        </select>
      </FormField>
      <FormField id="findings" label="Photo review" required>
        <textarea
          id="findings"
          name="findings"
          required
          rows={5}
          placeholder="What do you see in the photos? Skin type, concerns, anything the owner should know."
          className={formInputClassName}
        />
      </FormField>
      <FormField id="noticed" label="Suggested: what we noticed">
        <textarea
          id="noticed"
          name="noticed"
          rows={3}
          placeholder="Optional notes the owner can use in the PDF report."
          className={formInputClassName}
        />
      </FormField>
      <FormField id="morningRoutine" label="Suggested morning routine">
        <textarea
          id="morningRoutine"
          name="morningRoutine"
          rows={3}
          className={formInputClassName}
        />
      </FormField>
      <FormField id="nightRoutine" label="Suggested night routine">
        <textarea
          id="nightRoutine"
          name="nightRoutine"
          rows={3}
          className={formInputClassName}
        />
      </FormField>
      <FormField id="avoidItems" label="Suggested: what to avoid">
        <textarea
          id="avoidItems"
          name="avoidItems"
          rows={3}
          placeholder="One item per line"
          className={formInputClassName}
        />
      </FormField>
      <FormField id="extraNotes" label="Extra notes for the owner">
        <textarea
          id="extraNotes"
          name="extraNotes"
          rows={2}
          className={formInputClassName}
        />
      </FormField>
      <SubmitButton isOwner={isOwner} />
    </form>
  );
}
