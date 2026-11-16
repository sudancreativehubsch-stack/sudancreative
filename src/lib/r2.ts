import { AwsClient } from "aws4fetch";

export type UploadKind = "image" | "video" | "pdf";

export const LIMITS: Record<UploadKind, { types: string[]; maxBytes: number }> = {
  image: { types: ["image/webp", "image/png", "image/jpeg", "image/svg+xml"], maxBytes: 12 * 1024 * 1024 },
  video: { types: ["video/mp4", "video/webm", "video/quicktime"], maxBytes: 500 * 1024 * 1024 },
  pdf: { types: ["application/pdf"], maxBytes: 50 * 1024 * 1024 },
};

export const FOLDERS = ["models", "videos", "branding", "portfolio", "clients", "misc"];

export const EXT: Record<string, string> = {
  "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg", "image/svg+xml": "svg",
  "video/mp4": "mp4", "video/webm": "webm", "video/quicktime": "mov", "application/pdf": "pdf",
};

export function r2Configured() {
  const e = process.env;
  return Boolean(e.R2_ACCOUNT_ID && e.R2_ACCESS_KEY_ID && e.R2_SECRET_ACCESS_KEY && e.R2_BUCKET && e.NEXT_PUBLIC_MEDIA_URL);
}

/** Time-limited URL the browser uses to upload straight to R2. */
export async function presignPut(key: string, contentType: string, expires = 900): Promise<string> {
  const e = process.env;
  const aws = new AwsClient({
    accessKeyId: e.R2_ACCESS_KEY_ID!,
    secretAccessKey: e.R2_SECRET_ACCESS_KEY!,
    service: "s3",
    region: "auto",
  });
  const url = new URL(`https://${e.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${e.R2_BUCKET}/${key}`);
  url.searchParams.set("X-Amz-Expires", String(expires));
  const signed = await aws.sign(new Request(url, { method: "PUT", headers: { "Content-Type": contentType } }), {
    aws: { signQuery: true },
  });
  return signed.url;
}
