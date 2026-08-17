import { redirect } from "next/navigation";

import StudioShell from "@/components/studio/StudioShell";
import { requireStudioMember } from "@/lib/studio/member";

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

  return <StudioShell member={member}>{children}</StudioShell>;
}
