import type {
  CustomerSource,
  CustomerStatus,
  PaymentStatus,
} from "@/lib/supabase/database.types";

export type StudioCustomer = {
  id: string;
  sessionId: string;
  fullName: string | null;
  email: string | null;
  selectedPlan: string | null;
  planName: string | null;
  planPrice: string | null;
  answers: Record<string, unknown>;
  imageUrls: string[];
  photoPaths: string[];
  photosExpireAt: string | null;
  photosDeletedAt: string | null;
  status: CustomerStatus;
  notes: string | null;
  source: CustomerSource;
  paymentStatus: PaymentStatus;
  assignedTo: string | null;
  assignedToName: string | null;
  reportSenderId: string | null;
  reportSenderName: string | null;
  createdAt: string;
  updatedAt: string;
};

export function photosAreExpired(
  customer: Pick<StudioCustomer, "photosDeletedAt">,
) {
  return Boolean(customer.photosDeletedAt);
}

export function canSendCustomerReport(
  member: { userId: string; role: string },
  customer: Pick<StudioCustomer, "reportSenderId">,
) {
  return member.role === "owner" || customer.reportSenderId === member.userId;
}
