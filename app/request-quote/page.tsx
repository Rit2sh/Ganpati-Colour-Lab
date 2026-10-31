import { PageHero } from "@/components/blocks";
import { QuoteForm } from "@/components/QuoteForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote | Wedding Album & Photo Printing, Dhanbad",
  description:
    "Request a quote for wedding album design, album printing, wholesale printing or digital photo printing from Ganpati Colour Lab, Bank More, Dhanbad. Your details open in WhatsApp.",
  path: "/request-quote",
});

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell Us What You Need."
        intro="Fill in the form and your details open in a WhatsApp chat with Ganpati Colour Lab, ready to send."
        trail={[{ name: "Request a Quote", path: "/request-quote" }]}
      />
      <section className="bg-charcoal pb-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8"><QuoteForm /></div>
      </section>
    </>
  );
}
