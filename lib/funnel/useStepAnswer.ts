"use client";

import { useCallback, useEffect } from "react";
import { useFunnelStore } from "@/lib/funnel/useFunnelStore";

/**
 * Read and write a single step's answer in the funnel store.
 * The answer can be any serializable value (string, array, object, ...).
 */
export function useStepAnswer<T>(key: string, defaultValue: T) {
  const raw = useFunnelStore((state) => state.answers[key]);
  const setAnswer = useFunnelStore((state) => state.setAnswer);

  const value = (raw === undefined ? defaultValue : raw) as T;

  const setValue = useCallback(
    (next: T) => setAnswer(key, next),
    [key, setAnswer],
  );

  return [value, setValue] as const;
}

/**
 * Gate the funnel's Next/Continue button on the current step.
 * Pass whether this step's answer is currently valid. Because every step is
 * required, the navigation stays disabled until `isValid` is true.
 * On unmount we reset to true so the next (possibly informational) step is open.
 */
export function useStepGate(isValid: boolean) {
  const setCurrentStepValid = useFunnelStore(
    (state) => state.setCurrentStepValid,
  );

  useEffect(() => {
    setCurrentStepValid(isValid);
    return () => setCurrentStepValid(true);
  }, [isValid, setCurrentStepValid]);
}

/**
 * Convenience hook: bind an answer and gate the step in one call.
 * `validate` decides whether the current value satisfies the required rule.
 */
export function useRequiredStep<T>(
  key: string,
  defaultValue: T,
  validate: (value: T) => boolean,
) {
  const [value, setValue] = useStepAnswer<T>(key, defaultValue);
  useStepGate(validate(value));
  return [value, setValue] as const;
}
