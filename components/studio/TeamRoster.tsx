import { removeTeamMemberAction } from "@/lib/studio/actions";
import { formatStudioDate } from "@/lib/studio/formatDate";
import type { StudioMember } from "@/lib/studio/member";

type TeamRosterProps = {
  members: StudioMember[];
  currentUserId: string;
  isOwner: boolean;
};

export default function TeamRoster({
  members,
  currentUserId,
  isOwner,
}: TeamRosterProps) {
  return (
    <ul className="divide-y divide-brand-lavender/60 overflow-hidden rounded-2xl border border-brand-lavender/70 bg-white">
      {members.map((member) => (
        <li
          key={member.userId}
          className="flex items-center justify-between gap-4 px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium text-brand-ink">
              {member.displayName}
              {member.userId === currentUserId ? (
                <span className="ml-2 text-xs font-normal text-brand-gray">
                  (you)
                </span>
              ) : null}
            </p>
            <p className="text-xs capitalize text-brand-gray">
              {member.role} · joined {formatStudioDate(member.createdAt)}
            </p>
          </div>
          {isOwner && member.role === "staff" ? (
            <form action={removeTeamMemberAction}>
              <input type="hidden" name="userId" value={member.userId} />
              <button
                type="submit"
                className="text-xs font-medium uppercase tracking-[0.08em] text-brand-error-strong hover:underline"
              >
                Remove
              </button>
            </form>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
