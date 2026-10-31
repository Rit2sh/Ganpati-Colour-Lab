import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Instagram } from "@/components/icons";
import { PageHero } from "@/components/blocks";
import { MapSection } from "@/components/MapSection";
import { WaButton, WaNumberPicker } from "@/components/WhatsApp";
import { btn } from "@/lib/ui";
import { business } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Ganpati Colour Lab | Photo Lab, Bank More, Dhanbad",
  description:
    "Contact Ganpati Colour Lab at Shanti Bhawan, Madhulika Enclave, Bank More, Dhanbad 826007. Call +91 91131 72226 or +91 76542 83813, or message on WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Talk About Your Album."
        intro="Call, WhatsApp or visit us at Bank More, Dhanbad."
        trail={[{ name: "Contact Us", path: "/contact" }]}
      />
      <section className="bg-charcoal pb-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 md:grid-cols-3 md:px-8">
          <div className="rounded-3xl border border-ivory/10 bg-charcoal-2 p-8">
            <Phone className="text-gold" aria-hidden />
            <h2 className="font-display mt-4 text-3xl">Call</h2>
            <ul className="mt-3 space-y-2">
              {business.phones.map((p) => (
                <li key={p.tel}><a href={`tel:${p.tel}`} className="text-lg text-ivory/85 hover:text-gold">{p.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-ivory/10 bg-charcoal-2 p-8">
            <MapPin className="text-gold" aria-hidden />
            <h2 className="font-display mt-4 text-3xl">Visit</h2>
            <address className="mt-3 not-italic leading-relaxed text-ivory/75">Shanti Bhawan, Madhulika Enclave, Bank More, Dhanbad, Jharkhand 826007.</address>
            <a href={business.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-gold hover:underline">Get directions</a>
          </div>
          <div className="rounded-3xl border border-ivory/10 bg-charcoal-2 p-8">
            <Instagram className="text-gold" aria-hidden />
            <h2 className="font-display mt-4 text-3xl">Instagram</h2>
            <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer me" className="mt-3 inline-block text-lg text-ivory/85 hover:text-gold">{business.instagramHandle}</a>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3 px-5">
          <WaNumberPicker location="contact_page" />
          <WaButton location="contact_page" label="Wholesale Enquiry" topic="wholesale" variant="ghost" />
          <Link href="/request-quote" className={btn.ghost}>Request a Quote</Link>
        </div>
      </section>
      <MapSection />
    </>
  );
}
