"use client";

import { useState, type ReactNode } from "react";
import ReportStatusBadge from "@/components/admin/ReportStatusBadge";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import { PLAN_LABELS } from "@/lib/admin/planLabels";
import type { AdminUser, ReportDraft } from "@/types/admin";

type ReportReviewProps = {
  user: AdminUser;
  onBack: () => void;
  onSaveDraft: (userId: string, draft: ReportDraft) => void;
  onApprove: (userId: string, draft: ReportDraft) => void;
};

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-brand-lavender/50 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="font-serif text-lg text-brand-primary sm:text-xl">{title}</h3>
      {description ? (
        <p className="mt-1 text-xs text-brand-gray sm:text-[13px]">{description}</p>
      ) : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-brand-gray sm:text-xs">{label}</p>
      <p className="mt-0.5 text-sm leading-snug text-brand-ink sm:text-[0.9375rem]">
        {value}
      </p>
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-full border border-brand-border-light px-3 py-1 text-[11px] font-medium text-brand-gray transition-colors hover:border-brand-error hover:text-brand-error-strong"
    >
      Remove
    </button>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-full border border-dashed border-brand-lavender px-3.5 py-1.5 text-xs font-medium text-brand-primary transition-colors hover:bg-brand-purple-soft"
    >
      + {label}
    </button>
  );
}

export default function ReportReview({
  user,
  onBack,
  onSaveDraft,
  onApprove,
}: ReportReviewProps) {
  const [draft, setDraft] = useState<ReportDraft>(() => ({
    noticed: user.report.noticed.map((item) => ({ ...item })),
    morningRoutine: user.report.morningRoutine.map((item) => ({ ...item })),
    nightRoutine: user.report.nightRoutine.map((item) => ({ ...item })),
    avoid: [...user.report.avoid],
  }));

  const updateNoticed = (index: number, key: "title" | "description", value: string) => {
    setDraft((prev) => ({
      ...prev,
      noticed: prev.noticed.map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    }));
  };

  const updateRoutine = (
    field: "morningRoutine" | "nightRoutine",
    index: number,
    key: "week" | "text",
    value: string,
  ) => {
    setDraft((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    }));
  };

  const updateAvoid = (index: number, value: string) => {
    setDraft((prev) => ({
      ...prev,
      avoid: prev.avoid.map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer rounded-full border border-brand-border-light px-3.5 py-1.5 text-xs font-medium text-brand-gray transition-colors hover:border-brand-lavender hover:text-brand-primary"
          >
            ← Back to list
          </button>
          <ReportStatusBadge status={user.reportStatus} />
        </div>
        <div>
          <h2 className="font-serif text-xl text-brand-primary sm:text-2xl">
            {user.fullName}
          </h2>
          <p className="text-xs text-brand-gray sm:text-sm">
            {PLAN_LABELS[user.plan]} · {user.email}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.4fr]">
        <section className="h-fit rounded-2xl border border-brand-lavender/50 bg-brand-purple-soft/60 p-4 shadow-sm sm:p-5">
          <h3 className="font-serif text-lg text-brand-primary sm:text-xl">
            Patient details
          </h3>
          <p className="mt-1 text-xs text-brand-gray sm:text-[13px]">
            Read-only — captured from the user&apos;s assessment.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3.5">
            <InfoField label="Client Name" value={user.fullName} />
            <InfoField label="Gender" value={user.demographics.gender} />
            <InfoField label="Age" value={user.demographics.age} />
            <InfoField label="Concern" value={user.demographics.concern} />
            <InfoField label="Plan" value={PLAN_LABELS[user.plan]} />
            <InfoField label="Location" value={user.demographics.location} />
          </div>
        </section>

        <div className="space-y-4">
          <SectionCard
            title="What we noticed"
            description="Observations shared with the patient in their report."
          >
            {draft.noticed.map((item, index) => (
              <div
                key={index}
                className="space-y-2.5 rounded-xl border border-brand-border-light/70 p-3"
              >
                <TextInput
                  value={item.title}
                  onChange={(event) =>
                    updateNoticed(index, "title", event.target.value)
                  }
                  placeholder="Observation title"
                />
                <TextArea
                  rows={2}
                  value={item.description}
                  onChange={(event) =>
                    updateNoticed(index, "description", event.target.value)
                  }
                  placeholder="Describe what was noticed"
                />
                <div className="flex justify-end">
                  <RemoveButton
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        noticed: prev.noticed.filter((_, i) => i !== index),
                      }))
                    }
                  />
                </div>
              </div>
            ))}
            <AddButton
              label="Add observation"
              onClick={() =>
                setDraft((prev) => ({
                  ...prev,
                  noticed: [...prev.noticed, { title: "", description: "" }],
                }))
              }
            />
          </SectionCard>

          {(["morningRoutine", "nightRoutine"] as const).map((field) => (
            <SectionCard
              key={field}
              title={field === "morningRoutine" ? "Morning routine" : "Night routine"}
            >
              {draft[field].map((item, index) => (
                <div
                  key={index}
                  className="space-y-2.5 rounded-xl border border-brand-border-light/70 p-3"
                >
                  <TextInput
                    value={item.week}
                    onChange={(event) =>
                      updateRoutine(field, index, "week", event.target.value)
                    }
                    placeholder="Week label (e.g. Week 1)"
                  />
                  <TextArea
                    rows={2}
                    value={item.text}
                    onChange={(event) =>
                      updateRoutine(field, index, "text", event.target.value)
                    }
                    placeholder="Step instructions"
                  />
                  <div className="flex justify-end">
                    <RemoveButton
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          [field]: prev[field].filter((_, i) => i !== index),
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
              <AddButton
                label="Add step"
                onClick={() =>
                  setDraft((prev) => ({
                    ...prev,
                    [field]: [...prev[field], { week: "", text: "" }],
                  }))
                }
              />
            </SectionCard>
          ))}

          <SectionCard title="What to avoid">
            {draft.avoid.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <TextInput
                  value={item}
                  onChange={(event) => updateAvoid(index, event.target.value)}
                  placeholder="Item to avoid"
                />
                <RemoveButton
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      avoid: prev.avoid.filter((_, i) => i !== index),
                    }))
                  }
                />
              </div>
            ))}
            <AddButton
              label="Add item"
              onClick={() =>
                setDraft((prev) => ({ ...prev, avoid: [...prev.avoid, ""] }))
              }
            />
          </SectionCard>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-brand-border-light/70 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onSaveDraft(user.id, draft)}
          className="cursor-pointer rounded-full border border-brand-primary px-6 py-2.5 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-purple-soft"
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={() => onApprove(user.id, draft)}
          className="cursor-pointer rounded-full bg-brand-primary px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Approve &amp; Send
        </button>
      </div>
    </div>
  );
}
