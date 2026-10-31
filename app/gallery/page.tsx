import { PageHero, CtaBand } from "@/components/blocks";
import { Gallery } from "@/components/Gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery | Wedding Albums, Couple Photography & Printed Memories",
  description:
    "Browse the Ganpati Colour Lab gallery: wedding albums, couple photography, traditional weddings, album designs and printed memories. Photo lab and album studio in Bank More, Dhanbad.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments Worth Printing."
        intro="Browse wedding albums, couple photography, traditional weddings, album designs and printed memories."
        trail={[{ name: "Gallery", path: "/gallery" }]}
      />
      <section className="bg-charcoal pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8"><Gallery /></div>
      </section>
      <CtaBand location="gallery_cta" />
    </>
  );
}
