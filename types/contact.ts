export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  company: string;
  workEmail: string;
  phone: string;
  country: string;
  message: string;
};

export type ContactSubmitResult =
  | { ok: true }
  | {
      ok: false;
      reason: "network" | "validation" | "unknown";
    };