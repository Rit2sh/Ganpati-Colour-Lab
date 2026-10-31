import { PageHero } from "@/components/blocks";
import { business } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy | Ganpati Colour Lab",
  description: "How the Ganpati Colour Lab website handles your information, WhatsApp enquiries, analytics and third-party embeds.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" intro="Last updated: 31 October 2026." trail={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
      <section className="bg-charcoal pb-24">
        <div className="mx-auto max-w-3xl space-y-8 px-5 leading-relaxed text-ivory/75 md:px-8">
          <div>
            <h2 className="font-display text-3xl text-ivory">Enquiries and the quote form</h2>
            <p className="mt-2">The Request a Quote form does not send your details to our servers. It prepares a WhatsApp message on your device and opens WhatsApp. Nothing is delivered until you press Send in WhatsApp. If you choose a reference image, it stays on your device; you attach it in the WhatsApp chat yourself.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ivory">WhatsApp</h2>
            <p className="mt-2">Messages you send on WhatsApp are handled by WhatsApp under its own terms and privacy policy. We use your phone number and message only to respond to your enquiry.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ivory">Analytics</h2>
            <p className="mt-2">If analytics is enabled on this site, we record anonymous events such as clicks on call and WhatsApp buttons to understand which pages help visitors contact us. We do not use analytics to identify individuals.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ivory">Third-party content</h2>
            <p className="mt-2">This site can show Google Maps and Instagram content. Those services may set their own cookies or collect data when their content loads. Please see their privacy policies. Sample photographs on this site are provided by photographers on Unsplash.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-ivory">Contact</h2>
            <p className="mt-2">Questions about this policy: call {business.phones[0].label} or visit us at {business.streetAddress}, {business.locality}, {business.region} {business.postalCode}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
