import type { AnswerRow } from "@/lib/studio/answers";

type AnswerListProps = {
  answers: AnswerRow[];
  whatsappSummary?: string;
};

export default function AnswerList({
  answers,
  whatsappSummary,
}: AnswerListProps) {
  if (answers.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-brand-lavender bg-white px-4 py-6 text-sm text-brand-gray">
        No quiz answers stored for this customer.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <dl className="divide-y divide-brand-lavender/60 overflow-hidden rounded-2xl border border-brand-lavender/70 bg-white">
        {answers.map((row) => (
          <div key={row.key} className="px-4 py-3">
            <dt className="text-sm font-medium text-brand-primary">{row.label}</dt>
            <dd className="mt-1 text-sm text-brand-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
      {whatsappSummary ? (
        <div className="overflow-hidden rounded-2xl border border-brand-lavender/70 bg-white">
          <h3 className="border-b border-brand-lavender/60 px-4 py-3 font-serif text-lg text-brand-primary">
            WhatsApp summary
          </h3>
          <p className="whitespace-pre-wrap px-4 py-4 text-sm leading-relaxed text-brand-ink">
            {whatsappSummary}
          </p>
        </div>
      ) : null}
    </div>
  );
}
