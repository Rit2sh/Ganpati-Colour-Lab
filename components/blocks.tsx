import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd, faqLd } from "@/lib/seo";
import { CallButton, WaNumberPicker } from "./WhatsApp";
import type { WaTopic } from "@/lib/whatsapp";

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...trail];
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="Breadcrumb" className="text-xs text-ivory/60">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((b, i) => (
            <li key={b.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-gold">{b.name}</span>
              ) : (
                <Link href={b.path} className="hover:text-gold">{b.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({ eyebrow, title, intro, trail }: { eyebrow: string; title: string; intro: string; trail: { name: string; path: string }[] }) {
  return (
    <header className="relative overflow-hidden bg-charcoal pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Breadcrumbs trail={trail} />
        <p className="mt-8 text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        <h1 className="font-display mt-4 text-5xl leading-[1.05] text-ivory md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/70">{intro}</p>
      </div>
    </header>
  );
}

export function SectionHead({ eyebrow, title, intro, center = false }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>}
      <h2 className="font-display mt-3 text-4xl leading-[1.08] md:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-ivory/70 md:text-lg">{intro}</p>}
    </div>
  );
}

export function TrustStrip() {
  const items = ["Wedding Album Design", "Wholesale Printing", "Digital Photo Lab", "Premium Finishing"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-gold/25 bg-charcoal-2 py-5" aria-label="What we do">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl text-ivory/85 md:text-2xl">
            {t}
            <span aria-hidden className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const steps = [
  "Share Your Requirements",
  "Select Your Album or Printing Service",
  "Discuss Design and Pricing",
  "Approve the Work",
  "Receive Your Finished Product",
];

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="bg-ivory py-20 text-charcoal md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="How it works" title="From Your Idea to Your Album." center />
        <ol className="mt-14 grid gap-8 md:grid-cols-5 md:gap-4">
          {steps.map((s, i) => (
            <li key={s} className="relative md:pr-4">
              {i < steps.length - 1 && <span aria-hidden className="absolute left-12 top-6 hidden h-px w-[calc(100%-1.5rem)] bg-gold/50 md:block" />}
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ivory font-display text-xl text-[#8b6d34]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 font-display text-2xl leading-snug">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center text-sm text-charcoal/60">Actual timelines depend on the size and nature of each order. Ask us when you enquire.</p>
      </div>
      <span id="process-heading" className="sr-only">How it works</span>
    </section>
  );
}

export function CtaBand({ topic = "general", location, title = "Let's Create Something Beautiful Together.", text = "Have a wedding album or bulk printing requirement? Connect with Ganpati Colour Lab directly." }: { topic?: WaTopic; location: string; title?: string; text?: string }) {
  return (
    <section aria-label="Contact us" className="relative overflow-hidden bg-charcoal py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <div className="gold-rule mx-auto mb-10 w-40" />
        <h2 className="font-display text-4xl leading-tight md:text-6xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ivory/70">{text}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <WaNumberPicker topic={topic} location={location} />
          <CallButton location={location} label="Call Us" />
        </div>
      </div>
    </section>
  );
}

export function Faq({ faqs, withSchema = true }: { faqs: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <div>
      {withSchema && <JsonLd data={faqLd(faqs)} />}
      <div className="divide-y divide-ivory/10 rounded-3xl border border-ivory/10 bg-charcoal-2/50">
        {faqs.map((f) => (
          <details key={f.q} className="group p-6 open:bg-charcoal-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-ivory md:text-2xl">
              {f.q}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-transform duration-300 group-open:-rotate-180">
                <ChevronDown size={16} aria-hidden />
              </span>
            </summary>
            <p className="mt-3 max-w-3xl leading-relaxed text-ivory/70">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
