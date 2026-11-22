"use client";

import { GalleryStack } from "./template/GalleryStack";

export function ModelGallery({ whatsapp }: { whatsapp?: string }) {
  return <GalleryStack whatsapp={whatsapp} />;
}

export default ModelGallery;
