"use client";

// Browser-side helpers for the admin dashboard: shrink images, then upload straight to R2.

type Signed = { uploadUrl: string; publicUrl: string; contentType: string }[];

async function sign(kind: "image" | "video" | "pdf", folder: string, contentType: string, size: number, variants = false): Promise<Signed> {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, folder, contentType, size, variants }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "Upload was refused.");
  return json.files as Signed;
}

function put(url: string, blob: Blob, contentType: string, onProgress?: (p: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(e.loaded / e.total);
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Storage rejected the upload (${xhr.status}). Check the R2 CORS settings.`)));
    xhr.onerror = () => reject(new Error("Upload failed. Check your connection and the R2 CORS settings."));
    xhr.send(blob);
  });
}

async function toWebp(bitmap: ImageBitmap, maxWidth: number, quality: number): Promise<Blob> {
  const scale = Math.min(1, maxWidth / bitmap.width);
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser cannot process images.");
  ctx.drawImage(bitmap, 0, 0, w, h);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not convert the image."))), "image/webp", quality),
  );
}

/** Uploads an image as WebP (max 1920px) plus a 640px version for phones. Returns the main URL. */
export async function uploadImage(file: Blob, folder: string, onProgress?: (p: number) => void): Promise<string> {
  if (file.type === "image/svg+xml") {
    const [f] = await sign("image", folder, "image/svg+xml", file.size);
    await put(f.uploadUrl, file, f.contentType, onProgress);
    return f.publicUrl;
  }
  const bitmap = await createImageBitmap(file);
  const main = await toWebp(bitmap, 1920, 0.84);
  const small = await toWebp(bitmap, 640, 0.8);
  bitmap.close();
  const [a, b] = await sign("image", folder, "image/webp", main.size, true);
  await put(a.uploadUrl, main, a.contentType, (p) => onProgress?.(p * 0.85));
  await put(b.uploadUrl, small, b.contentType, (p) => onProgress?.(0.85 + p * 0.15));
  return a.publicUrl;
}

const guessType = (f: File, fallback: string) => {
  if (f.type) return f.type;
  const ext = f.name.split(".").pop()?.toLowerCase();
  return ({ mp4: "video/mp4", webm: "video/webm", mov: "video/quicktime", pdf: "application/pdf" } as Record<string, string>)[ext ?? ""] ?? fallback;
};

export async function uploadRaw(kind: "video" | "pdf", file: File, folder: string, onProgress?: (p: number) => void): Promise<string> {
  const type = guessType(file, kind === "pdf" ? "application/pdf" : "video/mp4");
  const [f] = await sign(kind, folder, type, file.size);
  await put(f.uploadUrl, file, type, onProgress);
  return f.publicUrl;
}

/** Grabs a frame from a video file to use as its thumbnail. */
export async function posterFromVideo(file: File): Promise<Blob | null> {
  const url = URL.createObjectURL(file);
  try {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = url;
    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error("unreadable"));
    });
    video.currentTime = Math.min(1.5, (video.duration || 2) / 2);
    await new Promise<void>((resolve) => { video.onseeked = () => resolve(); });
    const bitmap = await createImageBitmap(video);
    const blob = await toWebp(bitmap, 1920, 0.84);
    bitmap.close();
    return blob;
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}
