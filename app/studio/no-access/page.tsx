import Link from "next/link";

import StudioAuthCard from "@/components/studio/StudioAuthCard";
import StudioSignOutButton from "@/components/studio/StudioSignOutButton";

export default function StudioNoAccessPage() {
  return (
    <StudioAuthCard
      title="No access"
      description="This account is signed in but is not on the Studio team yet. If you are the owner, sign out and create the owner account again. Otherwise ask the owner to send an invite."
    >
      <div className="flex flex-col items-center gap-4">
        <StudioSignOutButton />
        <Link href="/" className="text-sm text-brand-primary hover:underline">
          Back to site
        </Link>
      </div>
    </StudioAuthCard>
  );
}
