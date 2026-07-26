import { parseDataUrl } from "@/lib/leads/parseDataUrl";

const DEFAULT_BUCKET = "assessment-photos";

export function getPhotosBucket() {
  return process.env.SUPABASE_PHOTOS_BUCKET?.trim() || DEFAULT_BUCKET;
}

export type UploadedAssessmentPhotos = {
  imageUrls: string[];
  photoPaths: string[];
};

/**
 * Upload assessment photo data-URLs to Supabase Storage (public bucket).
 */
export async function uploadAssessmentPhotos(
  sessionId: string,
  photoDataUrls: string[],
): Promise<UploadedAssessmentPhotos> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = getPhotosBucket();

  if (!base || !key || photoDataUrls.length === 0) {
    return { imageUrls: [], photoPaths: [] };
  }

  const imageUrls: string[] = [];
  const photoPaths: string[] = [];

  for (let index = 0; index < photoDataUrls.length; index += 1) {
    const parsed = parseDataUrl(photoDataUrls[index]);
    if (!parsed) continue;

    const ext = parsed.contentType.includes("png") ? "png" : "jpg";
    const path = `${sessionId}/photo-${index + 1}.${ext}`;
    const endpoint = `${base}/storage/v1/object/${bucket}/${path}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          apikey: key,
          "Content-Type": parsed.contentType,
          "x-upsert": "true",
        },
        body: new Uint8Array(parsed.bytes),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        console.error(
          `[uploadAssessmentPhotos] Failed photo ${index + 1}:`,
          response.status,
          detail,
        );
        continue;
      }

      photoPaths.push(path);
      imageUrls.push(`${base}/storage/v1/object/public/${bucket}/${path}`);
    } catch (error) {
      console.error(`[uploadAssessmentPhotos] Error photo ${index + 1}:`, error);
    }
  }

  return { imageUrls, photoPaths };
}
