import NotificationList from "@/components/studio/NotificationList";
import { requireStudioMember } from "@/lib/studio/member";

export default async function StudioNotificationsPage() {
  const { member } = await requireStudioMember();
  if (!member) return null;

  return (
    <div>
      <h1 className="font-serif text-3xl text-brand-primary">Notifications</h1>
      <p className="mt-1 text-sm text-brand-gray">
        Live updates for chat, reviews, payments, and assigned customers.
      </p>
      <div className="mt-6">
        <NotificationList />
      </div>
    </div>
  );
}
