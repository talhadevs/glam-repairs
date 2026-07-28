import { NextResponse } from "next/server";

import {
  buildStoragePublicUrl,
  storagePathFromShortParts,
} from "@/lib/leads/photoShortLink";

type RouteContext = {
  params: Promise<{ packId: string; file: string }>;
};

/**
 * Short public photo link → Supabase Storage redirect.
 * Example: /p/Vk7mQp2x/01.jpg
 */
export async function GET(_request: Request, context: RouteContext) {
  const { packId, file } = await context.params;
  const storagePath = storagePathFromShortParts(packId, file);

  if (!storagePath) {
    return NextResponse.json({ error: "Invalid photo link." }, { status: 400 });
  }

  const target = buildStoragePublicUrl(storagePath);
  if (!target) {
    return NextResponse.json(
      { error: "Storage is not configured." },
      { status: 503 },
    );
  }

  return NextResponse.redirect(target, 302);
}
