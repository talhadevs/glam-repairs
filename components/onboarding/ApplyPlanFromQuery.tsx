"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isFunnelPlanId } from "@/lib/funnel/plans";
import { useFunnelStore } from "@/lib/funnel/useFunnelStore";

/**
 * Applies `?plan=free|clarity|transform` from pricing CTAs into the funnel store
 * so photo limits and lead data use the chosen plan, and the plan step can be skipped.
 */
export default function ApplyPlanFromQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const setSelectedPlan = useFunnelStore((state) => state.setSelectedPlan);
  const setPlanPreselected = useFunnelStore(
    (state) => state.setPlanPreselected,
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const finish = () => setHydrated(true);
    if (useFunnelStore.persist.hasHydrated()) {
      finish();
      return;
    }
    return useFunnelStore.persist.onFinishHydration(finish);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const planParam = searchParams.get("plan");
    if (!isFunnelPlanId(planParam)) return;

    setSelectedPlan(planParam);
    setPlanPreselected(true);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("plan");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [
    hydrated,
    searchParams,
    pathname,
    router,
    setSelectedPlan,
    setPlanPreselected,
  ]);

  return null;
}
