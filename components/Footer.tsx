import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Instagram } from "@/components/icons";
import { business, fullAddress, serviceLinks, nearbyAreas } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-[#0b0b0b] pb-28 pt-16 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-display text-3xl text-ivory">
            Ganpati <span className="text-gold">Colour Lab</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-grey">
            Wedding album design, wedding album printing, wholesale album printing and digital photo printing in Bank More, Dhanbad, Jharkhand.
          </p>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer me"
            className="mt-6 inline-flex items-center gap-2 text-sm text-ivory/80 hover:text-gold"
          >
            <Instagram size={18} aria-hidden /> {business.instagramHandle}
          </a>
        </div>

        <nav aria-label="Services">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/75">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Visit &amp; Contact</p>
          <address className="mt-4 space-y-3 text-sm not-italic text-ivory/75">
            <p className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden /> {fullAddress}</p>
            {business.phones.map((p) => (
              <p key={p.tel} className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                <a href={`tel:${p.tel}`} className="hover:text-gold">{p.label}</a>
              </p>
            ))}
            <a href={business.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-gold underline-offset-4 hover:underline">
              Open in Google Maps
            </a>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <div className="gold-rule" />
        <p className="mt-6 text-xs leading-relaxed text-grey/80">
          Wedding album design, album printing and photo lab services for customers, photographers and studios in {nearbyAreas.join(", ")} and across Jharkhand.
        </p>
        <div className="mt-4 flex flex-col justify-between gap-2 text-xs text-grey/70 sm:flex-row">
          <p>© {business.copyrightYear} {business.name}, Dhanbad. All rights reserved.</p>
          <p>
            <Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            {" · "}Sample photos: <a className="hover:text-gold" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
