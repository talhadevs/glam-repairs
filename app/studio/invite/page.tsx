import { acceptStudioInviteAction } from "@/lib/studio/actions";
import StudioAuthCard from "@/components/studio/StudioAuthCard";

type InvitePageProps = {
  searchParams: Promise<{ token_hash?: string; type?: string }>;
};

export default async function StudioInvitePage({
  searchParams,
}: InvitePageProps) {
  const params = await searchParams;
  const tokenHash = params.token_hash?.trim() ?? "";
  const type = params.type?.trim() || "invite";

  if (!tokenHash) {
    return (
      <StudioAuthCard
        title="Invite expired"
        description="This invite link is missing or invalid. Ask the owner to send a new one."
      >
        <a
          href="/studio/login"
          className="block text-center text-sm text-brand-primary hover:underline"
        >
          Go to sign in
        </a>
      </StudioAuthCard>
    );
  }

  return (
    <StudioAuthCard
      title="Join Studio"
      description="Click accept to confirm your invite, then set a password. This extra click keeps inbox scanners from expiring the link."
    >
      <form action={acceptStudioInviteAction} className="space-y-4">
        <input type="hidden" name="token_hash" value={tokenHash} />
        <input type="hidden" name="type" value={type} />
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-medium tracking-[0.08em] text-white"
        >
          Accept invite
        </button>
      </form>
    </StudioAuthCard>
  );
}
