import { redirect } from "next/navigation";

import SetPasswordForm from "@/components/studio/SetPasswordForm";
import StudioAuthCard from "@/components/studio/StudioAuthCard";
import { getStudioUser } from "@/lib/studio/member";

type SetPasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SetPasswordPage({
  searchParams,
}: SetPasswordPageProps) {
  const user = await getStudioUser();
  if (!user) {
    redirect("/studio/login");
  }

  const params = await searchParams;

  return (
    <StudioAuthCard
      title="Set password"
      description="Choose a password for your Studio account."
    >
      <SetPasswordForm errorCode={params.error} />
    </StudioAuthCard>
  );
}
