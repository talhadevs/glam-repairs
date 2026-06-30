import type {
  FollowUpStatus,
  LeadStatus,
  PaymentStatus,
  PlanId,
  PlanStatus,
  ReportStatus,
} from "@/types/admin";

export const PLAN_LABELS: Record<PlanId, string> = {
  starter: "Skin Starter (Free)",
  clarity: "Clarity Plan",
  transform: "Transform Plan",
};

export const PLAN_PRICES: Record<PlanId, number> = {
  starter: 0,
  clarity: 1500,
  transform: 3000,
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  refunded: "Refunded",
  free: "Free",
};

export const FOLLOW_UP_STATUS_LABELS: Record<FollowUpStatus, string> = {
  upcoming: "Upcoming",
  due: "Due",
  done: "Done",
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New lead",
  contacted: "Contacted",
  converted: "Converted",
};

export function formatCurrency(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export const PLAN_STATUS_LABELS: Record<PlanStatus, string> = {
  pending: "Pending",
  active: "Active",
  disabled: "Disabled",
};

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  awaiting_review: "Awaiting review",
  in_review: "In review",
  sent: "Sent",
};

export function formatJoinedDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
