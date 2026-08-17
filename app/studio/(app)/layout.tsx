import { redirect } from "next/navigation";

import StudioShell from "@/components/studio/StudioShell";
import { requireStudioMember } from "@/lib/studio/member";
import { listStudioNotifications } from "@/lib/studio/notifications";

export const dynamic = "force-dynamic";

export default async function StudioAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, member } = await requireStudioMember();

  if (!user) {
    redirect("/studio/login");
  }

  if (!member) {
    redirect("/studio/no-access");
  }

  const initialNotifications = await listStudioNotifications();

  return (
    <StudioShell member={member} initialNotifications={initialNotifications}>
      {children}
    </StudioShell>
  );
}
