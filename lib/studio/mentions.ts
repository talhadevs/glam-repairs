import type { StudioMember } from "@/lib/studio/member";

export function mentionHandle(name: string) {
  return `@${name.trim()}`;
}

export function getActiveMention(
  text: string,
  cursor: number,
): { start: number; query: string } | null {
  const before = text.slice(0, cursor);
  const match = before.match(/@([^\s@]*)$/);
  if (!match) return null;
  return {
    start: before.length - match[0].length,
    query: match[1] ?? "",
  };
}

export function filterMentionMembers(
  members: StudioMember[],
  query: string,
) {
  const needle = query.trim().toLowerCase();
  return members.filter((member) => {
    if (!needle) return true;
    return member.displayName.toLowerCase().includes(needle);
  });
}

export function insertMention(
  text: string,
  cursor: number,
  start: number,
  name: string,
) {
  const mention = `${mentionHandle(name)} `;
  const next = `${text.slice(0, start)}${mention}${text.slice(cursor)}`;
  return {
    text: next,
    cursor: start + mention.length,
  };
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function splitMentionParts(text: string, members: StudioMember[]) {
  const names = [...new Set(members.map((member) => member.displayName.trim()))]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (names.length === 0) {
    return [{ text, mention: false }];
  }

  const pattern = new RegExp(
    `(@(?:${names.map(escapeRegExp).join("|")}))`,
    "g",
  );

  return text.split(pattern).flatMap((part) => {
    if (!part) return [];
    const mentioned = names.some((name) => part === mentionHandle(name));
    return [{ text: part, mention: mentioned }];
  });
}
