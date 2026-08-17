"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import type { StudioNotificationType } from "@/lib/supabase/database.types";
import {
  markAllStudioNotificationsRead,
  markStudioNotificationsRead,
} from "@/lib/studio/notificationActions";
import {
  mapStudioNotification,
  type StudioNotification,
} from "@/lib/studio/notificationTypes";

type StudioNotificationsContextValue = {
  notifications: StudioNotification[];
  unreadCount: number;
  markRead: (ids: string[]) => void;
  markAllRead: (type?: StudioNotificationType) => void;
};

const StudioNotificationsContext =
  createContext<StudioNotificationsContextValue | null>(null);

type StudioNotificationsProviderProps = {
  userId: string;
  initialNotifications: StudioNotification[];
  children: React.ReactNode;
};

export function StudioNotificationsProvider({
  userId,
  initialNotifications,
  children,
}: StudioNotificationsProviderProps) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  useEffect(() => {
    const channel = supabase
      .channel(`studio-notifications-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "studio_notifications",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          const next = mapStudioNotification(
            payload.new as Parameters<typeof mapStudioNotification>[0],
          );
          setNotifications((current) =>
            current.some((item) => item.id === next.id)
              ? current
              : [next, ...current].slice(0, 80),
          );
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "studio_notifications",
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          const next = mapStudioNotification(
            payload.new as Parameters<typeof mapStudioNotification>[0],
          );
          setNotifications((current) =>
            current.map((item) => (item.id === next.id ? next : item)),
          );
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  const markRead = useCallback((ids: string[]) => {
    if (ids.length === 0) return;
    const readAt = new Date().toISOString();
    setNotifications((current) =>
      current.map((item) =>
        ids.includes(item.id) && !item.readAt ? { ...item, readAt } : item,
      ),
    );
    void markStudioNotificationsRead(ids);
  }, []);

  const markAllRead = useCallback((type?: StudioNotificationType) => {
    const readAt = new Date().toISOString();
    setNotifications((current) =>
      current.map((item) =>
        !item.readAt && (!type || item.type === type)
          ? { ...item, readAt }
          : item,
      ),
    );
    void markAllStudioNotificationsRead(type);
  }, []);

  const unreadCount = notifications.filter((item) => !item.readAt).length;

  const value = useMemo(
    () => ({ notifications, unreadCount, markRead, markAllRead }),
    [notifications, unreadCount, markRead, markAllRead],
  );

  return (
    <StudioNotificationsContext.Provider value={value}>
      {children}
    </StudioNotificationsContext.Provider>
  );
}

export function useStudioNotifications() {
  const value = useContext(StudioNotificationsContext);
  if (!value) {
    throw new Error(
      "useStudioNotifications must be used within StudioNotificationsProvider",
    );
  }
  return value;
}
