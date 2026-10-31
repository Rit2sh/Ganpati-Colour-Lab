import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { AlbumShowcase } from "@/components/AlbumShowcase";
import { Gallery } from "@/components/Gallery";
import { InstagramFeed } from "@/components/InstagramFeed";
import { VideoReel } from "@/components/VideoReel";
import { MapSection } from "@/components/MapSection";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { CtaBand, Faq, Process, SectionHead, TrustStrip } from "@/components/blocks";
import { CallButton, WaButton } from "@/components/WhatsApp";
import { btn } from "@/lib/ui";
import { photos } from "@/lib/images";
import { homeFaqs } from "@/lib/faqs";
import { business, keywordGroups, nearbyAreas } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Check } from "lucide-react";

export const metadata = pageMetadata({
  title: "Wedding Album Design & Printing in Dhanbad | Photo Lab, Bank More",
  description:
    "Ganpati Colour Lab, Bank More, Dhanbad: premium wedding album design, wedding album printing, wholesale album printing in Jharkhand and professional digital photo printing. Call or WhatsApp +91 91131 72226.",
  path: "/",
});

const why = [
  "Professional album design",
  "Wholesale printing solutions",
  "Dedicated photo printing services",
  "Convenient local contact",
  "Personalised enquiries",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="explore">
        <TrustStrip />
      </div>

      {/* About */}
      <section aria-labelledby="about-heading" className="bg-ivory py-20 text-charcoal md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[2rem] border border-gold" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl">
                <Photo photo={photos[1]} sizes="(min-width:1024px) 40vw, 90vw" />
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] uppercase tracking-widest text-ivory/80">Sample image</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8b6d34]">About Ganpati Colour Lab</p>
            <h2 id="about-heading" className="font-display mt-4 text-4xl leading-[1.08] md:text-6xl">Turning Beautiful Memories Into Timeless Keepsakes.</h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/75">
              At Ganpati Colour Lab, we bring photographs to life through thoughtful album design and professional printing services. From wedding memories to bulk album printing, our focus is on creating beautiful printed experiences.
            </p>
            <Link href="/about" className={`${btn.dark} mt-8`}>Learn More</Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-heading" className="bg-charcoal py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead eyebrow="Our services" title="Album Design & Photo Printing in Dhanbad" intro="Wedding album design, album printing, wholesale printing and a digital photo lab, all in one place at Bank More." center />
          <h2 id="services-heading" className="sr-only">Services</h2>
          <div className="mt-14"><ServiceCards /></div>
        </div>
      </section>

      {/* 3D album showcase */}
      <section aria-labelledby="showcase-heading" className="relative overflow-hidden bg-[#0b0b0b] py-20 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead eyebrow="Album showcase" title="Your Stories. Beautifully Printed." intro="Open the album, flip the pages, try different layouts and zoom into the photographs." center />
          <h2 id="showcase-heading" className="sr-only">Interactive 3D album showcase</h2>
          <div className="mt-14"><AlbumShowcase /></div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading" className="bg-charcoal py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead eyebrow="Portfolio" title="Moments Worth Printing." center />
          <h2 id="gallery-heading" className="sr-only">Portfolio gallery</h2>
          <div className="mt-12"><Gallery limit={12} /></div>
          <div className="mt-10 text-center"><Link href="/gallery" className={btn.ghost}>View Full Gallery</Link></div>
        </div>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-heading" className="bg-charcoal-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Why choose us</p>
            <h2 id="why-heading" className="font-display mt-4 text-4xl leading-[1.08] md:text-6xl">Quality That Makes Memories Last.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {why.map((w) => (
                <li key={w} className="flex items-center gap-4 rounded-2xl border border-ivory/10 bg-charcoal px-6 py-5 text-lg">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Check size={18} aria-hidden /></span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Process />

      {/* Video + Instagram */}
      <section aria-labelledby="social-heading" className="bg-charcoal py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead eyebrow="Watch & follow" title="See Our Work on Instagram." intro={`Follow ${business.instagramHandle} for albums, reels and printing updates.`} center />
          <h2 id="social-heading" className="sr-only">Video and Instagram</h2>
          <div className="mt-14 grid items-start gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <VideoReel />
              <div className="mt-6 rounded-2xl border border-ivory/10 bg-charcoal-2 p-6">
                <p className="font-display text-2xl">Talk to us directly</p>
                <ul className="mt-3 space-y-1 text-ivory/80">
                  {business.phones.map((p) => (
                    <li key={p.tel}><a href={`tel:${p.tel}`} className="text-lg hover:text-gold">{p.label}</a></li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <WaButton location="video_section" label="WhatsApp Now" />
                  <CallButton location="video_section" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2"><InstagramFeed /></div>
          </div>
        </div>
      </section>

      <CtaBand location="home_cta" />
      <MapSection />

      {/* FAQ + local keywords */}
      <section aria-labelledby="faq-heading" className="bg-charcoal py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <SectionHead eyebrow="Questions" title="Wedding Album & Photo Lab FAQs" center />
          <h2 id="faq-heading" className="sr-only">Frequently asked questions</h2>
          <div className="mt-12"><Faq faqs={homeFaqs} /></div>

          <div className="mt-16 rounded-3xl border border-ivory/10 p-8 text-sm leading-relaxed text-ivory/60">
            <p className="font-display text-2xl text-ivory">Photo lab &amp; album services in Dhanbad, Jharkhand</p>
            <p className="mt-3">
              People search for {keywordGroups.core.slice(0, 5).join(", ")} and {keywordGroups.core[5]}. Ganpati Colour Lab at Bank More, Dhanbad helps with all of these. Enquiries welcome from {nearbyAreas.join(", ")}.
            </p>
            <p className="mt-3">
              Explore <Link className="text-gold hover:underline" href="/wedding-album-design">wedding album design</Link>, <Link className="text-gold hover:underline" href="/wholesale-album-printing">wholesale album printing</Link>, <Link className="text-gold hover:underline" href="/digital-photo-printing">digital photo printing</Link> and the <Link className="text-gold hover:underline" href="/album-collection">album collection</Link>, or <Link className="text-gold hover:underline" href="/request-quote">request a quote</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
