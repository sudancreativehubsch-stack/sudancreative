import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Pages are rendered at the edge on every request, with a short in-memory
// cache for database reads (see src/lib/data.ts). No extra bindings needed.
export default defineCloudflareConfig();
