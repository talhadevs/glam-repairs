export type ContactFormPayload = {
  firstName: string;
  workEmail: string;
  message: string;
};

export type ContactSubmitResult =
  | { ok: true }
  | {
      ok: false;
      reason: "network" | "validation" | "unknown";
    };
