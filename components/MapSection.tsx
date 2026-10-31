import { MapPin, Navigation } from "lucide-react";
import { business, fullAddress } from "@/lib/site";
import { CallButton, WaButton } from "./WhatsApp";
import { btn } from "@/lib/ui";

export function MapSection() {
  return (
    <section aria-labelledby="visit-heading" className="bg-charcoal-2 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Find us</p>
          <h2 id="visit-heading" className="font-display mt-3 text-4xl leading-tight md:text-5xl">Visit Ganpati Colour Lab</h2>
          <address className="mt-6 flex gap-3 text-base not-italic leading-relaxed text-ivory/75">
            <MapPin className="mt-1 shrink-0 text-gold" size={20} aria-hidden />
            <span>Shanti Bhawan, Madhulika Enclave,<br />Bank More, Dhanbad,<br />Jharkhand 826007.</span>
          </address>
          <ul className="mt-5 space-y-1 text-ivory/75">
            {business.phones.map((p) => (
              <li key={p.tel}><a href={`tel:${p.tel}`} className="hover:text-gold">{p.label}</a></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={business.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className={btn.gold}>
              <Navigation size={18} aria-hidden /> Get Directions
            </a>
            <CallButton location="map_section" label="Call" />
            <WaButton location="map_section" label="WhatsApp" variant="ghost" />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-ivory/10 md:aspect-[16/10]">
            <iframe
              title={`Map showing Ganpati Colour Lab, ${fullAddress}`}
              src={business.mapsEmbedUrl}
              className="h-full w-full grayscale-[0.4] invert-[0.92] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
