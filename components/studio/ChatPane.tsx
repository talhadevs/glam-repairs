"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { formInputClassName } from "@/components/ui/fieldStyles";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import type { StudioChatMessage } from "@/lib/studio/chat";
import { formatStudioDateTime } from "@/lib/studio/formatDate";
import type { StudioMember } from "@/lib/studio/member";
import {
  filterMentionMembers,
  getActiveMention,
  insertMention,
  splitMentionParts,
} from "@/lib/studio/mentions";

type ChatPaneProps = {
  initialMessages: StudioChatMessage[];
  member: StudioMember;
  members: StudioMember[];
};

function mapRow(row: {
  id: string;
  user_id: string;
  author_name: string;
  body: string;
  created_at: string;
}): StudioChatMessage {
  return {
    id: row.id,
    userId: row.user_id,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
  };
}

function MessageBody({
  text,
  members,
  mine,
  currentName,
}: {
  text: string;
  members: StudioMember[];
  mine: boolean;
  currentName: string;
}) {
  const parts = splitMentionParts(text, members);

  return (
    <p
      className={`mt-1 inline-block max-w-full whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm ${
        mine
          ? "bg-brand-primary text-white"
          : "bg-brand-purple-soft text-brand-ink"
      }`}
    >
      {parts.map((part, index) => {
        if (!part.mention) return <span key={index}>{part.text}</span>;
        const isMe = part.text === `@${currentName}`;
        return (
          <span
            key={index}
            className={
              mine
                ? "font-semibold text-brand-cream"
                : isMe
                  ? "rounded-md bg-brand-primary/15 px-0.5 font-semibold text-brand-primary"
                  : "font-semibold text-brand-primary"
            }
          >
            {part.text}
          </span>
        );
      })}
    </p>
  );
}

export default function ChatPane({
  initialMessages,
  member,
  members,
}: ChatPaneProps) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [messages, setMessages] = useState(initialMessages);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [mentionIndex, setMentionIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mention = getActiveMention(body, cursor);
  const mentionMatches = mention
    ? filterMentionMembers(members, mention.query)
    : [];
  const showMentions = Boolean(mention) && mentionMatches.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    setMentionIndex(0);
  }, [mention?.query, mention?.start]);

  useEffect(() => {
    const channel = supabase
      .channel("studio-team-chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "studio_messages" },
        (payload) => {
          const next = mapRow(
            payload.new as {
              id: string;
              user_id: string;
              author_name: string;
              body: string;
              created_at: string;
            },
          );
          setMessages((current) =>
            current.some((item) => item.id === next.id)
              ? current
              : [...current, next],
          );
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  function applyMention(name: string) {
    if (!mention) return;
    const next = insertMention(body, cursor, mention.start, name);
    setBody(next.text);
    setCursor(next.cursor);
    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) return;
      input.focus();
      input.setSelectionRange(next.cursor, next.cursor);
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = body.trim();
    if (!text || sending) return;

    setSending(true);
    setBody("");
    setCursor(0);
    const { data, error } = await supabase
      .from("studio_messages")
      .insert({
        user_id: member.userId,
        author_name: member.displayName,
        body: text,
      })
      .select("id, user_id, author_name, body, created_at")
      .single();

    if (error) {
      setBody(text);
      setCursor(text.length);
      console.error("[ChatPane]", error.message);
    } else if (data) {
      const next = mapRow(data);
      setMessages((current) =>
        current.some((item) => item.id === next.id) ? current : [...current, next],
      );
    }
    setSending(false);
  }

  return (
    <div className="flex h-[min(70vh,40rem)] flex-col overflow-hidden rounded-2xl border border-brand-lavender/70 bg-white">
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <p className="text-sm text-brand-gray">
            No messages yet. Say hello to the team. Type @ to mention someone.
          </p>
        ) : (
          messages.map((message) => {
            const mine = message.userId === member.userId;
            return (
              <div
                key={message.id}
                className={mine ? "ml-8 text-right" : "mr-8"}
              >
                <p className="text-xs text-brand-gray">
                  {message.authorName} · {formatStudioDateTime(message.createdAt)}
                </p>
                <MessageBody
                  text={message.body}
                  members={members}
                  mine={mine}
                  currentName={member.displayName}
                />
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={onSubmit}
        className="relative border-t border-brand-lavender/60 p-3"
      >
        {showMentions ? (
          <ul className="absolute inset-x-3 bottom-full mb-1 max-h-44 overflow-y-auto rounded-2xl border border-brand-lavender/70 bg-white py-1 shadow-lg">
            {mentionMatches.map((item, index) => (
              <li key={item.userId}>
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    applyMention(item.displayName);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                    index === mentionIndex
                      ? "bg-brand-purple-soft text-brand-primary"
                      : "text-brand-ink hover:bg-brand-purple-tint"
                  }`}
                >
                  <span className="font-medium">{item.displayName}</span>
                  <span className="text-xs capitalize text-brand-gray">
                    {item.role}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              setCursor(event.target.selectionStart ?? event.target.value.length);
            }}
            onClick={(event) => {
              setCursor(event.currentTarget.selectionStart ?? 0);
            }}
            onKeyUp={(event) => {
              setCursor(event.currentTarget.selectionStart ?? 0);
            }}
            onKeyDown={(event) => {
              if (!showMentions) return;
              if (event.key === "Enter") {
                event.preventDefault();
                const selected = mentionMatches[mentionIndex];
                if (selected) applyMention(selected.displayName);
              } else if (event.key === "ArrowDown") {
                event.preventDefault();
                setMentionIndex((index) =>
                  index + 1 >= mentionMatches.length ? 0 : index + 1,
                );
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setMentionIndex((index) =>
                  index - 1 < 0 ? mentionMatches.length - 1 : index - 1,
                );
              } else if (event.key === "Escape") {
                event.preventDefault();
                setCursor(body.length);
                setBody(`${body} `);
              }
            }}
            placeholder="Message the team. Type @ to mention"
            className={formInputClassName}
          />
          <button
            type="submit"
            disabled={sending || !body.trim()}
            className="rounded-xl bg-brand-primary px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
