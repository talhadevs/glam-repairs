export type PlanId = "starter" | "clarity" | "transform";

export type PlanStatus = "pending" | "active" | "disabled";

export type ReportStatus = "awaiting_review" | "in_review" | "sent";

export type NoticedItem = {
  title: string;
  description: string;
};

export type RoutineItem = {
  week: string;
  text: string;
};

export type ReportDraft = {
  noticed: NoticedItem[];
  morningRoutine: RoutineItem[];
  nightRoutine: RoutineItem[];
  avoid: string[];
};

export type AdminUserDemographics = {
  gender: string;
  age: string;
  concern: string;
  location: string;
};

export type PaymentStatus = "paid" | "pending" | "refunded" | "free";

export type FollowUpStatus = "upcoming" | "due" | "done";

export type LeadStatus = "new" | "contacted" | "converted";

export type FollowUp = {
  id: string;
  label: string;
  dueDate: string;
  status: FollowUpStatus;
};

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  plan: PlanId;
  planStatus: PlanStatus;
  reportStatus: ReportStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  joinedAt: string;
  sessionRef?: string;
  demographics: AdminUserDemographics;
  report: ReportDraft;
  followUps: FollowUp[];
  leadStatus?: LeadStatus;
};

export type AdminTab =
  | "dashboard"
  | "users"
  | "leads"
  | "revenue"
  | "pending"
  | "completed"
  | "followups";
