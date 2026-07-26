/** Decode a `data:[mime];base64,...` URL for Storage upload. */
export function parseDataUrl(dataUrl: string): {
  contentType: string;
  bytes: Buffer;
} | null {
  const match = /^data:([^;]+);base64,([\s\S]+)$/.exec(dataUrl.trim());
  if (!match) return null;

  try {
    return {
      contentType: match[1] || "image/jpeg",
      bytes: Buffer.from(match[2], "base64"),
    };
  } catch {
    return null;
  }
}
