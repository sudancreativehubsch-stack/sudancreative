import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const media = process.env.NEXT_PUBLIC_MEDIA_URL || "";

// Content-Security-Policy. Media and Supabase hosts come from your env vars.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${media} https://res.cloudinary.com https://www.google-analytics.com https://www.googletagmanager.com`,
  `media-src 'self' blob: ${media} https://res.cloudinary.com`,
  "font-src 'self' data:",
  `connect-src 'self' ${supabase} ${media} https://*.r2.cloudflarestorage.com https://challenges.cloudflare.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`,
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Skipped only when testing the production build over plain http://localhost
  ...(process.env.LOCAL_HTTP_TEST ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Put title, description and social tags in the first HTML bytes for every visitor and crawler.
  htmlLimitedBots: /.*/,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
};

export default nextConfig;
