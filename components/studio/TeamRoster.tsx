import {
  removeTeamMemberAction,
  updateMemberPermissionsAction,
} from "@/lib/studio/actions";
import { formatStudioDate } from "@/lib/studio/formatDate";
import type { StudioMember } from "@/lib/studio/member";

type TeamRosterProps = {
  members: StudioMember[];
  currentUserId: string;
  isOwner: boolean;
};

function permissionLabel(allowed: boolean) {
  return allowed ? "Yes" : "No";
}

export default function TeamRoster({
  members,
  currentUserId,
  isOwner,
}: TeamRosterProps) {
  return (
    <ul className="divide-y divide-brand-lavender/60 overflow-hidden rounded-2xl border border-brand-lavender/70 bg-white">
      {members.map((member) => (
        <li key={member.userId} className="space-y-3 px-4 py-4">
          <div className="flex items-start justify-between gap-4">
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
          </div>

          {member.role === "owner" ? (
            <p className="text-xs text-brand-gray">
              Owner can verify payments and send reports.
            </p>
          ) : isOwner ? (
            <form
              action={updateMemberPermissionsAction}
              className="space-y-3 rounded-xl bg-brand-cream/40 px-3 py-3"
            >
              <input type="hidden" name="userId" value={member.userId} />
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-brand-accent">
                Permissions
              </p>
              <label className="flex items-start gap-2 text-sm text-brand-ink">
                <input
                  type="checkbox"
                  name="canVerifyPayment"
                  value="1"
                  defaultChecked={member.canVerifyPayment}
                  className="mt-1"
                />
                <span>Can verify payment</span>
              </label>
              <label className="flex items-start gap-2 text-sm text-brand-ink">
                <input
                  type="checkbox"
                  name="canSendReport"
                  value="1"
                  defaultChecked={member.canSendReport}
                  className="mt-1"
                />
                <span>Can send report to customer</span>
              </label>
              <button
                type="submit"
                className="rounded-xl bg-brand-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-white"
              >
                Save permissions
              </button>
            </form>
          ) : (
            <p className="text-xs text-brand-gray">
              Verify payment: {permissionLabel(member.canVerifyPayment)} · Send
              report: {permissionLabel(member.canSendReport)}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
