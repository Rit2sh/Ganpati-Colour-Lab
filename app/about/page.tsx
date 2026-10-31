import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/blocks";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { MapSection } from "@/components/MapSection";
import { photos } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { btn } from "@/lib/ui";

export const metadata = pageMetadata({
  title: "About Ganpati Colour Lab | Photo Lab & Album Studio, Bank More Dhanbad",
  description:
    "About Ganpati Colour Lab, a wedding album design and photo printing lab at Bank More, Dhanbad, Jharkhand. Album design, wholesale album printing and digital photo printing.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Turning Beautiful Memories Into Timeless Keepsakes."
        intro="Ganpati Colour Lab is a wedding album design and photo printing lab in Bank More, Dhanbad, Jharkhand."
        trail={[{ name: "About Us", path: "/about" }]}
      />
      <section className="bg-charcoal py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Photo photo={photos[4]} sizes="(min-width:1024px) 45vw, 90vw" />
            </div>
            <p className="mt-3 text-center text-xs text-grey">Sample image for illustration.</p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-ivory/75">
            <p>
              At Ganpati Colour Lab, we bring photographs to life through thoughtful album design and professional printing services. From wedding memories to bulk album printing, our focus is on creating beautiful printed experiences.
            </p>
            <p>
              We work with families planning wedding albums, and with photographers, studios and businesses that need dependable printing in quantity. As a local lab at Madhulika Enclave, Bank More, we are easy to reach by phone, WhatsApp or a visit.
            </p>
            <div>
              <SectionHead title="What we do" />
              <ul className="mt-5 space-y-2 text-base">
                <li><Link href="/wedding-album-design" className="text-gold hover:underline">Wedding album design</Link></li>
                <li><Link href="/wholesale-album-printing" className="text-gold hover:underline">Wholesale album printing</Link></li>
                <li><Link href="/digital-photo-printing" className="text-gold hover:underline">Digital photo printing</Link></li>
                <li><Link href="/album-collection" className="text-gold hover:underline">Album collection</Link></li>
              </ul>
            </div>
            <Link href="/request-quote" className={btn.gold}>Request a Quote</Link>
          </Reveal>
        </div>
      </section>
      <CtaBand location="about_cta" />
      <MapSection />
    </>
  );
}
