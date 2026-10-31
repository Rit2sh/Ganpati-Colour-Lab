import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Photo } from "./Photo";
import { hero } from "@/lib/images";
import { HeroAlbum } from "./three/HeroAlbum";
import { WaButton } from "./WhatsApp";
import { btn } from "@/lib/ui";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Photo photo={hero} sizes="100vw" priority quality={75} className="scale-105 [animation:kenburns_22s_ease-out_forwards]" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/60" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 pb-20 pt-32 md:grid-cols-2 md:px-8 md:pb-16">
        <div className="[animation:fadeup_1s_0.1s_both]">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-10 bg-gold" /> Bank More, Dhanbad
          </p>
          <h1 id="hero-heading" className="font-display text-[3.1rem] leading-[1.02] text-ivory sm:text-6xl lg:text-[5.2rem]">
            Every Moment Deserves <em className="text-gold">To Be Remembered.</em>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ivory/75">
            Premium Wedding Album Design &amp; Professional Photo Printing in Dhanbad.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/gallery" className={btn.gold}>Explore Our Work</Link>
            <WaButton location="hero" label="Chat on WhatsApp" variant="ghost" />
          </div>
        </div>
        <div className="[animation:fadeup_1.2s_0.35s_both]">
          <HeroAlbum />
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 [animation:fadeup_1.4s_0.5s_both]">
        <a
          href="#explore"
          aria-label="Scroll down to explore"
          className="group flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest text-ivory/50 transition hover:text-gold"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-charcoal/60 backdrop-blur-sm transition duration-300 group-hover:border-gold group-hover:bg-charcoal group-hover:translate-y-1">
            <ChevronDown size={18} className="text-gold" />
          </span>
        </a>
      </div>
    </section>
  );
}
