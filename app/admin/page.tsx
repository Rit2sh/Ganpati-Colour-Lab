import type { Metadata } from "next";
import { business, allKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const modules = [
  { t: "Services", d: "Edit service titles, slugs, descriptions and images.", model: "Service" },
  { t: "Gallery images", d: "Upload, reorder and publish gallery photos with alt text.", model: "GalleryImage" },
  { t: "Album showcase", d: "Add or edit album products for the showcase.", model: "AlbumProduct" },
  { t: "Enquiries", d: "Review enquiries saved with customer consent.", model: "Enquiry" },
  { t: "Business info & contact", d: "Phone numbers, address and Instagram link.", model: "SiteSettings" },
  { t: "SEO metadata", d: "Per-page titles and descriptions.", model: "SiteSettings" },
];

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Protected area</p>
      <h1 className="font-display mt-3 text-5xl">Admin Dashboard</h1>
      <p className="mt-4 max-w-2xl text-ivory/70">
        You are signed in with HTTP Basic Auth. This is the secured admin shell. The database models for every module below are defined in
        <code className="mx-1 rounded bg-charcoal-3 px-1.5 py-0.5 text-sm">prisma/schema.prisma</code>; the editing screens are the next step once PostgreSQL is connected (see README).
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {modules.map((m) => (
          <div key={m.t} className="rounded-2xl border border-ivory/10 bg-charcoal-2 p-6">
            <h2 className="font-display text-2xl">{m.t}</h2>
            <p className="mt-2 text-sm text-ivory/65">{m.d}</p>
            <p className="mt-3 text-xs text-grey">Model: {m.model}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-ivory/10 bg-charcoal-2 p-6 text-sm text-ivory/75">
        <p className="font-display text-2xl text-ivory">Current business data</p>
        <p className="mt-2">{business.name} · {business.phones.map((p) => p.label).join(" / ")}</p>
        <p className="mt-1">{allKeywords.length} target keywords configured in <code>lib/site.ts</code>.</p>
      </div>
    </section>
  );
}
