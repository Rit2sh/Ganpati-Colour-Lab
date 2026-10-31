import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero, SectionHead, Faq, CtaBand } from "./blocks";
import { JsonLd } from "./JsonLd";
import { Photo } from "./Photo";
import { MapSection } from "./MapSection";
import { Reveal } from "./Reveal";
import { WaNumberPicker, CallButton } from "./WhatsApp";
import { btn } from "@/lib/ui";
import { serviceLd } from "@/lib/seo";
import type { Photo as PhotoT } from "@/lib/images";
import type { WaTopic } from "@/lib/whatsapp";

export interface ServicePageProps {
  path: string;
  name: string;
  eyebrow: string;
  h1: string;
  intro: string;
  schemaDescription: string;
  topic: WaTopic;
  photos: [PhotoT, PhotoT];
  blocks: { title: string; body: string }[];
  checklistTitle: string;
  checklist: string[];
  faqs: { q: string; a: string }[];
  keywordParagraph: string;
  related: { href: string; label: string }[];
}

export function ServicePage(p: ServicePageProps) {
  return (
    <>
      <JsonLd data={serviceLd(p.name, p.schemaDescription, p.path)} />
      <PageHero eyebrow={p.eyebrow} title={p.h1} intro={p.intro} trail={[{ name: p.name, path: p.path }]} />

      <div className="mx-auto -mt-4 flex max-w-5xl flex-wrap gap-3 px-5 md:px-8">
        <WaNumberPicker topic={p.topic} location={`page_${p.path}`} />
        <CallButton location={`page_${p.path}`} />
        <Link href="/request-quote" className={btn.ghost}>Request a Quote</Link>
      </div>

      <section className="bg-charcoal py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
          <Reveal className="grid grid-cols-2 gap-4">
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-3xl">
              <Photo photo={p.photos[0]} sizes="(min-width:1024px) 22vw, 45vw" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Photo photo={p.photos[1]} sizes="(min-width:1024px) 22vw, 45vw" />
            </div>
            <p className="col-span-2 text-center text-xs text-grey">Sample images for illustration. Not client work.</p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-8">
            {p.blocks.map((b) => (
              <div key={b.title}>
                <h2 className="font-display text-3xl text-ivory md:text-4xl">{b.title}</h2>
                <p className="mt-3 leading-relaxed text-ivory/70">{b.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal-2 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <SectionHead title={p.checklistTitle} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {p.checklist.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-2xl border border-ivory/10 bg-charcoal px-5 py-4">
                <Check size={18} className="shrink-0 text-gold" aria-hidden /> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-charcoal py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <SectionHead eyebrow="FAQ" title="Common Questions" />
          <div className="mt-10"><Faq faqs={p.faqs} /></div>
          <p className="mt-10 text-sm leading-relaxed text-ivory/55">{p.keywordParagraph}</p>
          <p className="mt-4 text-sm text-ivory/55">
            Also see: {p.related.map((r, i) => (
              <span key={r.href}>{i > 0 && " · "}<Link href={r.href} className="text-gold hover:underline">{r.label}</Link></span>
            ))}
          </p>
        </div>
      </section>

      <CtaBand topic={p.topic} location={`cta_${p.path}`} />
      <MapSection />
    </>
  );
}
