export type LeadSubmitPayload = {
  sessionId: string;
  fullName?: string;
  email?: string;
  selectedPlan?: string | null;
  planName?: string;
  planPrice?: string;
  /** @deprecated Prefer photoDataUrls — kept for older callers. */
  selfieDataUrl?: string | null;
  /** All assessment photos as compressed JPEG/PNG data URLs. */
  photoDataUrls?: string[];
  answers?: Record<string, unknown>;
};

export type LeadSubmitSuccess = {
  ok: true;
  leadId: string;
  /** First photo public URL (compat). */
  imageUrl: string | null;
  /** All uploaded photo public URLs for WhatsApp. */
  imageUrls: string[];
};

export type LeadSubmitFailure = {
  ok: false;
  reason: "validation" | "not_configured" | "network" | "unknown";
  message?: string;
};

export type LeadSubmitResult = LeadSubmitSuccess | LeadSubmitFailure;
