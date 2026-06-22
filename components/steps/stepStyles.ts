export const stepTitleClassName = {
  lg: "font-serif text-[1.75rem] leading-tight text-brand-ink sm:text-[2rem]",
  sm: "font-serif text-[1.35rem] leading-snug text-brand-ink sm:text-[1.5rem]",
  statement:
    "font-serif text-[1.75rem] leading-snug text-brand-ink sm:mt-4 sm:text-[2rem]",
} as const;

export const stepSubtitleClassName =
  "mt-3 text-sm leading-relaxed text-brand-gray sm:mt-4 sm:text-[0.9375rem]";

export const stepEyebrowClassName =
  "text-xs font-medium uppercase tracking-[0.12em] text-brand-light";

export const choiceCardBaseClassName =
  "flex w-full rounded-2xl border bg-white text-left shadow-sm transition-colors";

export const choiceCardSelectedClassName =
  "border-brand-light ring-1 ring-brand-light";

export const choiceCardUnselectedClassName =
  "border-brand-border-light/60 hover:border-brand-lavender";

export const choiceLabelClassName = {
  default: "text-sm text-brand-ink sm:text-[0.9375rem]",
  snug: "text-sm leading-snug text-brand-ink sm:text-[0.9375rem]",
} as const;

export const stepListSpacingClassName = {
  default: "space-y-3 sm:space-y-3.5",
  compact: "space-y-2.5 sm:space-y-3",
} as const;

export const stepBodySpacingClassName = {
  default: "mt-6 sm:mt-7",
  sm: "mt-5 sm:mt-6",
  lg: "mt-8 sm:mt-10",
} as const;
