import InviteForm from "@/components/studio/InviteForm";
import TeamRoster from "@/components/studio/TeamRoster";
import { listStudioMembers, requireStudioMember } from "@/lib/studio/member";

type TeamPageProps = {
  searchParams: Promise<{
    error?: string;
    invited?: string;
    removed?: string;
    permissions?: string;
  }>;
};

export default async function StudioTeamPage({ searchParams }: TeamPageProps) {
  const { member } = await requireStudioMember();
  if (!member) return null;

  const params = await searchParams;
  const members = await listStudioMembers();
  const isOwner = member.role === "owner";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-brand-primary">Team</h1>
        <p className="mt-1 text-sm text-brand-gray">
          {isOwner
            ? "Invite staff, then set who can verify payments or send reports."
            : "Studio teammates. Only the owner can invite, remove, or change permissions."}
        </p>
      </div>

      {params.invited ? (
        <p className="rounded-xl bg-brand-success/15 px-4 py-3 text-sm text-brand-success-strong">
          Invite sent.
        </p>
      ) : null}
      {params.removed ? (
        <p className="rounded-xl bg-brand-success/15 px-4 py-3 text-sm text-brand-success-strong">
          Teammate removed.
        </p>
      ) : null}
      {params.permissions ? (
        <p className="rounded-xl bg-brand-success/15 px-4 py-3 text-sm text-brand-success-strong">
          Team permissions saved.
        </p>
      ) : null}
      {params.error === "permissions" ? (
        <p className="rounded-xl bg-brand-error/10 px-4 py-3 text-sm text-brand-error-strong">
          Could not save permissions.
        </p>
      ) : null}

      <TeamRoster
        members={members}
        currentUserId={member.userId}
        isOwner={isOwner}
      />

      {isOwner ? (
        <div>
          <h2 className="mb-4 font-serif text-xl text-brand-primary">
            Invite teammate
          </h2>
          <InviteForm errorCode={params.error} />
        </div>
      ) : params.error === "forbidden" ? (
        <p className="text-sm text-brand-error-strong">
          Only the owner can invite teammates.
        </p>
      ) : null}
    </div>
  );
}
