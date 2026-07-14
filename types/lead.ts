export type LeadSubmitPayload = {
  sessionId: string;
  fullName?: string;
  email?: string;
  selectedPlan?: string | null;
  planName?: string;
  planPrice?: string;
  /** Compressed JPEG data URL from the funnel (booking.selfie). */
  selfieDataUrl?: string | null;
  answers?: Record<string, unknown>;
};

export type LeadSubmitSuccess = {
  ok: true;
  leadId: string;
  /** Public selfie URL once Supabase Storage is wired; null until then. */
  imageUrl: string | null;
};

export type LeadSubmitFailure = {
  ok: false;
  reason: "validation" | "not_configured" | "network" | "unknown";
  message?: string;
};

export type LeadSubmitResult = LeadSubmitSuccess | LeadSubmitFailure;
