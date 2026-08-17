"use client";

import { useEffect } from "react";

import { useStudioNotifications } from "@/components/studio/StudioNotificationsProvider";

export default function MarkChatNotificationsRead() {
  const { notifications, markRead } = useStudioNotifications();

  useEffect(() => {
    const ids = notifications
      .filter((item) => item.type === "chat_message" && !item.readAt)
      .map((item) => item.id);
    if (ids.length === 0) return;
    markRead(ids);
  }, [notifications, markRead]);

  return null;
}
