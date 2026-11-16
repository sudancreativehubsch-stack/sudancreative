import { NextResponse } from "next/server";
import { canEdit, getStaff } from "@/lib/auth";
import { EXT, FOLDERS, LIMITS, presignPut, r2Configured, type UploadKind } from "@/lib/r2";

type Body = { kind: UploadKind; folder: string; contentType: string; size: number; variants?: boolean };

// Returns short-lived signed URLs so the browser can upload straight to R2.
export async function POST(request: Request) {
  const staff = await getStaff();
  if (!staff || !canEdit(staff)) return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  if (!r2Configured()) {
    return NextResponse.json({ error: "Media storage is not configured yet. See the setup guide (R2 variables)." }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const limit = LIMITS[body.kind];
  if (!limit || !FOLDERS.includes(body.folder)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  if (!limit.types.includes(body.contentType)) {
    return NextResponse.json({ error: `That file type is not allowed. Use: ${limit.types.join(", ")}` }, { status: 400 });
  }
  if (!Number.isFinite(body.size) || body.size <= 0 || body.size > limit.maxBytes) {
    return NextResponse.json({ error: `File is too large. Maximum is ${Math.round(limit.maxBytes / 1048576)} MB.` }, { status: 400 });
  }

  const now = new Date();
  const month = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const id = crypto.randomUUID();
  const ext = EXT[body.contentType];
  const base = `m/${body.folder}/${month}/${id}`;
  const media = (process.env.NEXT_PUBLIC_MEDIA_URL || "").replace(/\/$/, "");

  const files = [{ key: `${base}.${ext}`, contentType: body.contentType }];
  if (body.variants && body.kind === "image" && body.contentType === "image/webp") {
    files.push({ key: `${base}-640.${ext}`, contentType: body.contentType });
  }

  const out = await Promise.all(
    files.map(async (f) => ({
      uploadUrl: await presignPut(f.key, f.contentType),
      publicUrl: `${media}/${f.key}`,
      contentType: f.contentType,
    })),
  );
  return NextResponse.json({ files: out });
}
