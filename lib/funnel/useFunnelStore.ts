"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type FunnelFlow = "onboarding" | "booking";

type FunnelState = {
  /** Anonymous identifier that links every step answer to a single user. */
  sessionId: string;
  /** All collected answers keyed by a stable step key (e.g. "onboarding.skinZones"). */
  answers: Record<string, unknown>;
  /** Captured contact details (filled in near the end of the funnel). */
  email: string;
  fullName: string;
  /** Plan the user selected (free | clarity | transform), saved on pick. */
  selectedPlan: string | null;
  /** Public selfie URL after upload (Supabase Storage); used in WhatsApp message. */
  selfieUrl: string | null;
  /**
   * Farthest booking step the user may open (1–59 form, 60 = report).
   * Advanced only when they successfully continue from an earlier card.
   */
  bookingUnlockedStep: number;
  /**
   * Farthest onboarding step the user may open (1–10 form, 11 = complete).
   */
  onboardingUnlockedStep: number;
  /**
   * Whether the currently mounted step has a valid answer. Ephemeral UI state,
   * not persisted. Defaults to true so informational steps are never blocked.
   */
  currentStepValid: boolean;
  /**
   * Set when the user tries to continue on an invalid gated step.
   * Ephemeral UI state used to reveal field-level errors.
   */
  stepValidationAttempted: boolean;

  ensureSessionId: () => void;
  setAnswer: (key: string, value: unknown) => void;
  setContact: (contact: { email?: string; fullName?: string }) => void;
  setSelectedPlan: (plan: string | null) => void;
  setSelfieUrl: (url: string | null) => void;
  unlockFlowStep: (flow: FunnelFlow, step: number) => void;
  setCurrentStepValid: (valid: boolean) => void;
  requestStepValidation: () => void;
  clearStepValidationAttempt: () => void;
  reset: () => void;
};

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export const useFunnelStore = create<FunnelState>()(
  persist(
    (set, get) => ({
      sessionId: "",
      answers: {},
      email: "",
      fullName: "",
      selectedPlan: null,
      selfieUrl: null,
      bookingUnlockedStep: 1,
      onboardingUnlockedStep: 1,
      currentStepValid: true,
      stepValidationAttempted: false,

      ensureSessionId: () => {
        if (!get().sessionId) {
          set({ sessionId: createSessionId() });
        }
      },
      setAnswer: (key, value) =>
        set((state) => ({ answers: { ...state.answers, [key]: value } })),
      setContact: (contact) =>
        set((state) => ({
          email: contact.email ?? state.email,
          fullName: contact.fullName ?? state.fullName,
        })),
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      setSelfieUrl: (url) => set({ selfieUrl: url }),
      unlockFlowStep: (flow, step) =>
        set((state) => {
          if (flow === "booking") {
            return {
              bookingUnlockedStep: Math.max(state.bookingUnlockedStep, step),
            };
          }
          return {
            onboardingUnlockedStep: Math.max(
              state.onboardingUnlockedStep,
              step,
            ),
          };
        }),
      setCurrentStepValid: (valid) => set({ currentStepValid: valid }),
      requestStepValidation: () => set({ stepValidationAttempted: true }),
      clearStepValidationAttempt: () => set({ stepValidationAttempted: false }),
      reset: () =>
        set({
          answers: {},
          email: "",
          fullName: "",
          selectedPlan: null,
          selfieUrl: null,
          bookingUnlockedStep: 1,
          onboardingUnlockedStep: 1,
          stepValidationAttempted: false,
        }),
    }),
    {
      name: "glam-funnel",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessionId: state.sessionId,
        answers: state.answers,
        email: state.email,
        fullName: state.fullName,
        selectedPlan: state.selectedPlan,
        selfieUrl: state.selfieUrl,
        bookingUnlockedStep: state.bookingUnlockedStep,
        onboardingUnlockedStep: state.onboardingUnlockedStep,
      }),
      migrate: (persisted, version) => {
        const state = (persisted ?? {}) as Partial<FunnelState>;
        let bookingUnlocked = state.bookingUnlockedStep ?? 1;

        // v2: booking URLs renumbered after removing PDRN (old 17+ → −3).
        if (version < 2 && bookingUnlocked > 16) {
          bookingUnlocked = Math.max(1, bookingUnlocked - 3);
        }

        return {
          ...state,
          bookingUnlockedStep: bookingUnlocked,
          onboardingUnlockedStep: state.onboardingUnlockedStep ?? 1,
        };
      },
    },
  ),
);
