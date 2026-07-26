import { getPhotosBucket } from "@/lib/leads/uploadAssessmentPhotos";

type ExpiredLead = {
  id: string;
  photo_paths: string[] | null;
};

/**
 * Delete Storage photos for leads past photos_expire_at.
 * Lead rows stay; only image_urls / photo_paths are cleared.
 */
export async function cleanupExpiredPhotos(): Promise<{
  leadsProcessed: number;
  filesDeleted: number;
}> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) {
    return { leadsProcessed: 0, filesDeleted: 0 };
  }

  const bucket = getPhotosBucket();
  const query =
    `${base}/rest/v1/leads` +
    `?select=id,photo_paths` +
    `&photos_deleted_at=is.null` +
    `&photos_expire_at=lt.${encodeURIComponent(new Date().toISOString())}` +
    `&photo_paths=neq.{}` +
    `&limit=50`;

  const listResponse = await fetch(query, {
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
    },
    cache: "no-store",
  });

  if (!listResponse.ok) {
    const detail = await listResponse.text().catch(() => "");
    console.error("[cleanupExpiredPhotos] List failed:", listResponse.status, detail);
    return { leadsProcessed: 0, filesDeleted: 0 };
  }

  const leads = (await listResponse.json()) as ExpiredLead[];
  let filesDeleted = 0;

  for (const lead of leads) {
    const paths = (lead.photo_paths ?? []).filter(Boolean);

    if (paths.length > 0) {
      const deleteResponse = await fetch(
        `${base}/storage/v1/object/${bucket}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${key}`,
            apikey: key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paths),
        },
      );

      if (!deleteResponse.ok) {
        const detail = await deleteResponse.text().catch(() => "");
        console.error(
          `[cleanupExpiredPhotos] Storage delete failed for ${lead.id}:`,
          deleteResponse.status,
          detail,
        );
        continue;
      }

      filesDeleted += paths.length;
    }

    const patchResponse = await fetch(
      `${base}/rest/v1/leads?id=eq.${encodeURIComponent(lead.id)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${key}`,
          apikey: key,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          image_urls: [],
          photo_paths: [],
          photos_deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      },
    );

    if (!patchResponse.ok) {
      const detail = await patchResponse.text().catch(() => "");
      console.error(
        `[cleanupExpiredPhotos] Lead patch failed for ${lead.id}:`,
        patchResponse.status,
        detail,
      );
    }
  }

  return { leadsProcessed: leads.length, filesDeleted };
}
