export const CUSTOMER_STATUSES = [
  "new",
  "reviewing",
  "contacted",
  "done",
] as const;

export const CUSTOMER_STATUS_LABELS: Record<
  (typeof CUSTOMER_STATUSES)[number],
  string
> = {
  new: "New",
  reviewing: "Reviewing",
  contacted: "Contacted",
  done: "Done",
};

export const PAYMENT_STATUS_LABELS: Record<
  "pending" | "verified",
  string
> = {
  pending: "Payment pending",
  verified: "Payment verified",
};

export const REVIEW_DECISIONS = [
  "ready_for_report",
  "need_more_photos",
  "not_suitable",
] as const;

export const REVIEW_DECISION_LABELS: Record<
  (typeof REVIEW_DECISIONS)[number],
  string
> = {
  ready_for_report: "Ready for report",
  need_more_photos: "Need more photos",
  not_suitable: "Not suitable for a remote plan",
};

export const PLAN_OPTIONS = [
  { id: "free", name: "Skin Starter", price: "Rs. 0" },
  { id: "clarity", name: "Clarity", price: "Rs. 1,500" },
  { id: "transform", name: "Transform", price: "Rs. 3,000" },
] as const;
