# Ganpati Colour Lab: website

Premium 3D wedding album and photo lab website for **Ganpati Colour Lab, Bank More, Dhanbad**.
Next.js (App Router) · React · TypeScript · Tailwind CSS · Three.js / React Three Fiber · Framer Motion · Zod · Prisma/PostgreSQL schema.

## Run it

```bash
npm install
cp .env.example .env.local     # fill in values (see below)
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
```

## Pages (10)

Home · About · Wedding Album Design · Wholesale Album Printing · Digital Photo Printing · Gallery · Album Collection · Contact · Request a Quote · Privacy Policy. Plus `/admin` (protected) and a 404.

## Things you MUST do before going live

1. **Replace sample photos with the studio's own.** All images are free-licence Unsplash *samples* (labelled on the site). Photos on the business Instagram belong to the studio or its clients, so only use them with permission. Put files in `public/gallery/` and update `lib/images.ts` (and `next.config.ts` image hosts if you use another CDN). Never present stock as client work.
2. **Set your domain**: `NEXT_PUBLIC_SITE_URL` in `.env.local`. Canonical URLs, sitemap, robots and structured data all use it. Today it defaults to `https://www.ganpaticolourlab.in`, which is a placeholder.
3. **Exact map pin**: `geo` in `lib/site.ts` holds approximate Dhanbad coordinates. Right-click the shop in Google Maps, copy the coordinates, paste them in.
4. **Video**: set `NEXT_PUBLIC_VIDEO_SRC` (an MP4 in `public/videos/`) or `NEXT_PUBLIC_REEL_URL` (a reel link from the studio's own Instagram). Until then the section links to the Instagram profile.
5. **Analytics**: set `NEXT_PUBLIC_GA_ID`. Every WhatsApp, call, Instagram and quote-form click fires an event (`whatsapp_click`, `call_click`, `instagram_click`, `quote_form_submit`).
6. **Admin**: set `ADMIN_USER` and `ADMIN_PASSWORD`. If either is empty, `/admin` returns 404.

## WhatsApp

`lib/whatsapp.ts` holds the prefilled messages and link builder. Both numbers are in `lib/site.ts`. Buttons open a `wa.me` chat; the customer presses Send. The site never claims a message was delivered. The quote form validates with Zod, builds a formatted message and opens WhatsApp. It stores nothing.

## SEO and local/geo (what is implemented)

- Unique title, description and canonical on every page; Open Graph and Twitter cards
- `LocalBusiness`, `WebSite`, `Service`, `BreadcrumbList` and `FAQPage` JSON-LD (no fake ratings, reviews, prices or hours)
- Geo meta tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`) and `GeoCoordinates` schema
- `sitemap.xml`, `robots.txt`, web manifest, breadcrumbs, internal linking, `en-IN` locale
- Keyword set in `lib/site.ts` (`keywordGroups`): used in meta keywords, page copy and FAQs
- Self-hosted fonts, AVIF/WebP images, lazy loading, code-split Three.js, reduced-motion support

### What actually gets you to #1 in Dhanbad (do these; code alone cannot)

1. **Claim and fully fill the Google Business Profile** (same name, address and phone as the site). This is the biggest local-ranking factor.
2. Verify the site in **Google Search Console** (`NEXT_PUBLIC_GSC_TOKEN`) and submit `/sitemap.xml`.
3. Ask real customers for Google reviews. Do not buy or fake them.
4. Keep name, address and phone identical everywhere (Instagram, Justdial, IndiaMART, etc.).
5. Add the studio's own photos with descriptive file names and alt text, and publish new work regularly.

No one can honestly guarantee a #1 ranking; this setup removes the technical obstacles.

## Database (optional)

`prisma/schema.prisma` defines AdminUser, Service, GalleryImage, AlbumProduct, Enquiry and SiteSettings with indexes. To enable:

```bash
# set DATABASE_URL in .env.local
npx prisma migrate dev --name init
npx prisma generate
```

The public site does not need the database. The `/admin` page is a secured shell (HTTP Basic Auth via `proxy.ts`); the editing screens still need building on top of the schema, and you should move to a full login system (e.g. Auth.js with the AdminUser table) before several people use it. Only store enquiries with the customer's consent.

## Deploy (Vercel, simplest)

1. Push to GitHub and import the repo in Vercel.
2. Add the environment variables from `.env.example`.
3. Add your domain, then update `NEXT_PUBLIC_SITE_URL` and redeploy.
4. Run Lighthouse on the live URL and verify in Search Console.

Self-hosting: `npm run build && npm start` behind Nginx/Caddy with HTTPS.

## Project map

```
app/            routes, sitemap, robots, manifest, admin
components/     Hero, 3D scene (three/), AlbumShowcase, Gallery, ServiceCards, QuoteForm, WhatsApp*, MapSection, ...
lib/            site.ts (business + SEO data), whatsapp.ts, seo.ts, images.ts, schemas.ts, faqs.ts, ui.ts
prisma/         schema.prisma
proxy.ts        admin protection
```

## Known limits

- Business facts are limited to what you supplied. No founding year, awards, counts, prices, hours or ratings were invented.
- Admin editing screens are not built yet (schema and secured shell only).
- Built and type-checked, and all 16 routes prerender. Lighthouse was not run because this workspace has no internet.
