const DEFAULT_BUCKET = "assessment-photos";
const PACK_ID_BYTES = 6;
const PACK_ID_PATTERN = /^[A-Za-z0-9_-]{8}$/;
const FILE_PATTERN = /^(\d{2})\.(jpg|png)$/;

function getPhotosBucket() {
  return process.env.SUPABASE_PHOTOS_BUCKET?.trim() || DEFAULT_BUCKET;
}

function toBase64Url(bytes: Uint8Array) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64url");
  }
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

/** Short folder id for a photo upload batch (8 chars). */
export function createPhotoPackId() {
  const bytes = new Uint8Array(PACK_ID_BYTES);
  crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
}

export function isValidPhotoPackId(packId: string) {
  return PACK_ID_PATTERN.test(packId);
}

export function isValidPhotoFileName(file: string) {
  return FILE_PATTERN.test(file);
}

export function getPublicAppUrl(request?: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (request) return new URL(request.url).origin;
  return "";
}

export function storagePathFromShortParts(packId: string, file: string) {
  if (!isValidPhotoPackId(packId) || !isValidPhotoFileName(file)) return null;
  return `leads/${packId}/${file}`;
}

export function buildStoragePublicUrl(storagePath: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return null;
  const bucket = getPhotosBucket();
  return `${base}/storage/v1/object/public/${bucket}/${storagePath}`;
}

/** WhatsApp-friendly short link on our domain. */
export function buildShortPhotoUrl(
  appBase: string,
  packId: string,
  file: string,
) {
  const base = appBase.replace(/\/$/, "");
  return `${base}/p/${packId}/${file}`;
}

export function toShortPhotoUrls(
  appBase: string,
  packId: string,
  photoPaths: string[],
) {
  if (!appBase) {
    return photoPaths
      .map((path) => buildStoragePublicUrl(path))
      .filter((url): url is string => Boolean(url));
  }

  return photoPaths.map((path) => {
    const file = path.split("/").pop();
    if (!file || !isValidPhotoFileName(file)) {
      return buildStoragePublicUrl(path) ?? path;
    }
    return buildShortPhotoUrl(appBase, packId, file);
  });
}
