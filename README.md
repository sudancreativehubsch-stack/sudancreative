# Sudan Creative Hub website

Website, admin dashboard and content system for Sudan Creative Hub. Built with Next.js (App Router, TypeScript), Supabase, Cloudflare (Workers + R2 + Turnstile) and Resend. It follows the Website Development Brief and the Brand Guidelines you supplied.

**Running cost: ₹0 within free tiers.** The only unavoidable cost is the domain, about ₹900 a year. One catch: Cloudflare asks for a card or PayPal on file to switch on R2 media storage. It is not charged while you stay inside the free allowance (10 GB of storage).

---

## 1. Check before launch

| # | Item | Why |
|---|------|-----|
| 1 | **WhatsApp number.** Set to `+249963565781` (9 digits, confirmed brand number). | Every Choose This Model and WhatsApp button uses this number across the site (`src/lib/site.ts`). |
| 2 | **Legal pages** (Privacy, Terms, Cookies) are sensible templates, not legal advice. | Have a lawyer review them for the markets you serve. |
| 3 | **Branch addresses** for Egypt and India show "Address to be announced". | Edit in Admin > Site text. |
| 4 | **Logo.** Only the icon was supplied, so the header pairs it with a typed wordmark. | Send the primary and secondary logo files if you want them used. |
| 5 | **Domain.** The Brand Guidelines mention `sudancreativehub.com`. | Check it is available, buy it, set `NEXT_PUBLIC_SITE_URL`. |
| 6 | **Content.** No models, videos, branding projects or client logos were supplied. | Preview mode shows clearly marked sample content. Add the real material in the admin. |

---

## 2. Try it on your computer (2 minutes)

```bash
npm install
npm run dev        # http://localhost:3000
```

With no environment variables set, the site runs in **preview mode** with sample content and an orange banner. Nothing is saved anywhere.

---

## 3. Go live (about 45 minutes)

You need free accounts at **GitHub (optional), Cloudflare, Supabase and Resend**.

### 3.1 Supabase (database and admin login)
1. Create a project. Choose the region closest to your visitors (Mumbai is a good middle for India, the Gulf and Egypt).
2. SQL Editor > New query > paste `supabase/schema.sql` > Run.
3. Authentication > Users > **Add user** > tick *Auto Confirm*. **This first user becomes the admin automatically.** Use a long, unique password.
4. Authentication > Sign In / Providers > switch **off** "Allow new users to sign up".
5. Project Settings > API: copy the Project URL, the `anon` key and the `service_role` key.

### 3.2 Cloudflare R2 (images, videos, PDFs)
1. Cloudflare dashboard > R2 > create a bucket named `sudan-creative-hub-media` (add your card or PayPal if asked).
2. Bucket > Settings > **Public access**: enable the `r2.dev` URL for now. When you have a domain on Cloudflare, connect `media.yourdomain.com` instead (the `r2.dev` URL is rate-limited and meant for testing). Copy the public URL into `NEXT_PUBLIC_MEDIA_URL`.
3. Bucket > Settings > **CORS policy**: paste the contents of `r2-cors.json` (edit the origins to match your real site address).
4. R2 > Manage API tokens > create a token with **Object Read & Write** on this bucket. Copy the Access Key ID, Secret and your Account ID.

### 3.3 Resend (inquiry emails)
Sign up at resend.com **using sudancreativehubsch@gmail.com**, create an API key. Until you verify your own domain, the test sender `onboarding@resend.dev` can only deliver to the email you signed up with, which is exactly the inbox you want.

### 3.4 Cloudflare Turnstile (spam protection)
Cloudflare dashboard > Turnstile > Add widget > add your site hostnames (and `localhost` if you test locally). Copy the site key and secret key.

### 3.5 Deploy
```bash
cp .env.example .env.local     # fill in every value
npx wrangler login
npm run deploy                 # builds and publishes to Cloudflare Workers
bash scripts/set-secrets.sh    # uploads the private values as encrypted secrets
```
Your site is now live at `https://sudan-creative-hub.<your-subdomain>.workers.dev`. Add that address to the CORS list and to Turnstile if you have not already.

**Custom domain:** Workers & Pages > your project > Settings > Domains & Routes > Add custom domain. Then update `NEXT_PUBLIC_SITE_URL` in `.env.local`, run `npm run deploy` again, and update the CORS and Turnstile hostnames.

### 3.6 Analytics and Search Console (optional)
- Create a GA4 property, put the `G-...` ID in `NEXT_PUBLIC_GA_ID`. The script loads **only after a visitor accepts the cookie banner**.
- In Google Search Console, add the site using the HTML tag method and put the `content` value in `NEXT_PUBLIC_GSC_VERIFICATION`. Then submit `https://yourdomain/sitemap.xml`.
- Redeploy after changing any `NEXT_PUBLIC_` value.

---

## 4. Using the admin (`/admin`)

Sign in with the user you created. Everything below works without a developer.

| Section | What you can do |
|---|---|
| **Site text** | Headlines, about text, vision, mission, contact details, WhatsApp number, branch addresses, social links, SEO description. |
| **Models & talent** | Add, edit, delete profiles. Upload photos (reorder with arrows), write the bio, add skills and specialties, upload a showreel and cover. Each profile gets a Choose This Model button that opens WhatsApp with the model's name filled in. |
| **Video portfolio** | Upload a video, choose a category, set title and description, mark as featured. A thumbnail is made from the video automatically if you do not upload one. Only the title is shown on the site, never a client name. |
| **Branding projects** | One page per project: cover, logo presentation, colour palette with HEX codes, fonts, a gallery (ordered, with enlargement) and an optional Brand Guidelines PDF to view or download. |
| **Design, photo & campaign work** | Images for Graphic Design, Photography and Advertising Campaigns. |
| **Client logos** | Upload logos. They appear in one uniform grid. |
| **Services** | Edit the nine services. |
| **Inquiries** | Every form message, with one-click reply by email or WhatsApp, and a handled / new status. |
| **Team** (admin) | Give someone a role. **Admin** can do everything. **Editor** can add and edit but cannot delete or manage the team. |
| **Activity log** (admin) | Who changed what, and when. |

**To add a team member:** Supabase > Authentication > Users > Add user (Auto Confirm), then set their role on the Team page. New people start with "No access yet".

Changes appear on the site within about 30 seconds.

**Image tips:** the admin shrinks images to 1920 px WebP plus a 640 px version for phones before uploading, so any normal JPG or PNG works. SVG is accepted for logos.

**Video tips:** MP4 (H.264), 1080p or smaller, ideally under 100 MB. To compress a large file: `bash scripts/compress-video.sh input.mov`. The `faststart` flag it sets lets the video begin playing before it has fully downloaded. Videos are not loaded until a visitor presses play.

---

## 5. How it meets the brief

- **Pages:** Home, About Us, Our Services, Our Portfolio, Models & Talent, Our Clients, Contact Us. English only.
- **Models:** profile pages with gallery, bio, skills, specialties, showreel and the WhatsApp Choose This Model button.
- **Video portfolio:** direct uploads, a large cinematic player (not a thumbnail grid), project titles only, categories, in-page playback.
- **Branding:** individual case study pages with palette, typography, applications, gallery lightbox and guidelines PDF.
- **Other portfolio categories:** Graphic Design, Photography, Advertising Campaigns as galleries.
- **Clients:** uniform logo grid managed in the admin.
- **Contact:** validated form (name, email or WhatsApp, service, details) that saves the inquiry, emails the company inbox and offers a pre-filled WhatsApp message.
- **Brand:** only your colours (blue `#0a13eb`, orange `#f57210`, yellow `#fbc701`, black). The logo icon is used white on dark, with clear space, no effects, as your guidelines require.

---

## 6. Security, privacy and standards

- HTTPS and HSTS, plus security headers: Content-Security-Policy, X-Frame-Options, Referrer-Policy, Permissions-Policy, nosniff (`next.config.ts`).
- Admin: Supabase login, roles enforced both in the app **and** in database row-level security, public sign-ups off, admin pages marked `noindex`, every change written to an activity log.
- Forms: server-side validation, escaped output, hidden honeypot field, minimum-fill-time check, Cloudflare Turnstile, and a per-visitor rate limit stored as a one-way hash (IP addresses are never stored).
- Uploads: only signed-in staff can request an upload link; file type and size are checked server-side; links expire after 15 minutes.
- Cookie banner with Google Consent Mode v2 defaults. Analytics is off until accepted.
- Privacy Policy, Terms and Cookie pages written around GDPR, India's DPDP Act 2023 and general Gulf data-protection practice. **Have these reviewed locally.**
- Accessibility: skip link, keyboard-operable menu, gallery and video player, visible focus, reduced-motion support, text contrast chosen per colour (white on blue, black on orange and yellow), alt text on every image. Aim: WCAG 2.2 AA. Test with real content before launch.
- SEO: unique titles and descriptions, canonical URLs, Open Graph and Twitter cards, JSON-LD (ProfessionalService), `sitemap.xml`, `robots.txt`, clean URLs.

## 7. Performance

**Measured** with Lighthouse (mobile settings, simulated slow 4G) on the home page of the production build, three runs: Performance 93 to 94, Accessibility 100, Best Practices 100, SEO 100. Largest Contentful Paint about 1.9 to 2.3 s on that simulated connection, layout shift near zero. This was run on a local machine, so run Lighthouse again after you deploy; real-world speed on Cloudflare's network is usually better. Your own videos and photos will affect scores on the pages that show them.

- Almost no client JavaScript on public pages (the header menu, gallery, video player and contact form only). About 103 kB shared JS.
- LyonArabic is primary (Arabic) and Archivo is the Latin fallback; self-hosted, no third-party fonts, no animation libraries, plain CSS.
- The home page text loads first and is the largest element, so there is no hero image to wait for.
- Images: WebP, 640 px and 1920 px versions, lazy-loaded, with dimensions set.
- Video: not requested until play, served from R2 with no egress fees, range requests supported.
- Database reads are cached for 30 seconds on the edge.
- The Worker bundle is about 1.3 MB compressed, well inside Cloudflare's free-plan limit.

---

## 8. Backups and recovery

- **Database:** `.github/workflows/keepalive-and-backup.yml` takes a weekly dump and keeps it 60 days, and pings the database every 3 days so the free plan does not pause it. Put the code in a **private** GitHub repo and add the three secrets listed at the top of that file. To restore: create a new Supabase project, run `supabase/schema.sql`, then run the backup `.sql` file in the SQL Editor.
- **Media:** R2 has no automatic backup on the free plan. Keep the original photos and videos on your own drive or Google Drive, or copy the bucket monthly with `rclone`.
- **Code:** it lives in your repo. Redeploy any time with `npm run deploy`.

## 9. Known limits and next steps

- **R2 has no spending cap.** The free allowance is 10 GB. Past that it is about $0.015 per GB per month. Keep an eye on usage in the Cloudflare dashboard.
- **Supabase free tier** has 500 MB of database and no point-in-time recovery. This is plenty for text content. All images and videos live in R2, not Supabase.
- **No adaptive streaming.** Videos play as compressed MP4 files. If you later want smoother playback on slow connections, Bunny Stream (about $1 a month minimum) can be added without changing the rest of the site.
- Files in R2 are not deleted automatically when you delete a record in the admin. Clear old files from the Cloudflare dashboard if you need to reclaim space.
- Admin login is email and password. Use a strong password. Supabase's multi-factor sign-in can be added later.
- The admin could not be tested against a live Supabase project while building. Run through each admin section once after setup, and report anything odd.

## 10. Project map

```
src/app/(site)/      public pages
src/app/admin/       admin dashboard
src/app/api/         contact form and upload endpoints
src/components/      header, footer, gallery, video player, forms
src/lib/             data, settings, admin rules (resources.ts), upload helpers
supabase/schema.sql  database tables, security rules, starting services
public/              logo files, placeholder images, share image
scripts/             video compression, secret upload
```

To add a field to the admin (for example a new model attribute), add it to `src/lib/resources.ts` and the matching column to `supabase/schema.sql`.
#   s u d a n c r e a t i v e  
 #   s u d a n c r e a t i v e  
 