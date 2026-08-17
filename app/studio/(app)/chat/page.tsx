import ChatPane from "@/components/studio/ChatPane";
import { listStudioMessages } from "@/lib/studio/chat";
import { listStudioMembers, requireStudioMember } from "@/lib/studio/member";

export default async function StudioChatPage() {
  const { member } = await requireStudioMember();
  if (!member) return null;

  const [messages, members] = await Promise.all([
    listStudioMessages(),
    listStudioMembers(),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-brand-primary">Team chat</h1>
      <p className="mt-1 text-sm text-brand-gray">
        Shared room for the Studio team. Type @ to mention a teammate.
      </p>
      <div className="mt-6">
        <ChatPane
          initialMessages={messages}
          member={member}
          members={members}
        />
      </div>
    </div>
  );
}
