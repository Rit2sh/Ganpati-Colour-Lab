import { PageHero, CtaBand, SectionHead } from "@/components/blocks";
import { AlbumShowcase } from "@/components/AlbumShowcase";
import { WaNumberPicker } from "@/components/WhatsApp";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { serviceLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wedding Album Collection | Layouts & Finishing Options in Dhanbad",
  description:
    "Explore wedding album layouts and finishing options at Ganpati Colour Lab, Bank More, Dhanbad. Flip through the interactive album and enquire on WhatsApp for sizes and pricing.",
  path: "/album-collection",
});

const styles = [
  { t: "Full Bleed", d: "One photograph per page, edge to edge, for dramatic portraits and landscapes." },
  { t: "Two-Up", d: "Two photographs per page for storytelling sequences and paired moments." },
  { t: "Collage", d: "A lead image supported by smaller frames to capture a whole ritual or event." },
];

export default function AlbumCollectionPage() {
  return (
    <>
      <JsonLd data={serviceLd("Wedding Album Collection", "Wedding album layouts and finishing options in Bank More, Dhanbad.", "/album-collection")} />
      <PageHero
        eyebrow="Album collection"
        title="Album Layouts & Finishing"
        intro="Discover beautiful album presentation and finishing options. Ask us for the sizes, covers and finishes available for your order."
        trail={[{ name: "Album Collection", path: "/album-collection" }]}
      />
      <section className="bg-[#0b0b0b] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead eyebrow="Interactive" title="Your Stories. Beautifully Printed." center />
          <div className="mt-12"><AlbumShowcase /></div>
        </div>
      </section>
      <section className="bg-charcoal py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3 md:px-8">
          {styles.map((s) => (
            <div key={s.t} className="rounded-3xl border border-ivory/10 bg-charcoal-2 p-8">
              <h2 className="font-display text-3xl">{s.t}</h2>
              <p className="mt-3 leading-relaxed text-ivory/70">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center"><WaNumberPicker topic="collection" location="album_collection" /></div>
      </section>
      <CtaBand topic="collection" location="collection_cta" />
    </>
  );
}
