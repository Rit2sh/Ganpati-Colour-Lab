import { ServicePage } from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";
import { photos } from "@/lib/images";
import { wholesaleFaqs } from "@/lib/faqs";

export const metadata = pageMetadata({
  title: "Wholesale Album Printing in Jharkhand | Wedding Album Printer Dhanbad",
  description:
    "Wholesale wedding album printing for photographers and studios in Dhanbad and across Jharkhand. Ganpati Colour Lab, Bank More. Get a wholesale quote on WhatsApp.",
  path: "/wholesale-album-printing",
  keywords: [
    "wholesale photo album printing in Jharkhand", "wedding album printer in Jharkhand", "wedding album printing in Dhanbad",
    "bulk album printing Dhanbad", "bulk wedding album printing Jharkhand", "album printing for photographers Dhanbad",
    "album printing for photo studios Jharkhand", "photographer album printing Dhanbad", "wholesale wedding album printing India",
    "Ganpati Colour Lab",
  ],
});

export default function Page() {
  return (
    <ServicePage
      path="/wholesale-album-printing"
      name="Wholesale Album Printing"
      eyebrow="Wholesale album printing"
      h1="Wholesale Wedding Album Printing in Jharkhand"
      intro="Album printing solutions for photographers, studios and businesses. Share your quantity and size and we will send you a quote."
      schemaDescription="Wholesale wedding album printing for photographers, studios and businesses in Dhanbad and Jharkhand."
      topic="wholesale"
      photos={[photos[14], photos[12]]}
      blocks={[
        { title: "Built for photographers and studios", body: "If you deliver wedding albums to your own clients, a reliable printing partner matters. We work with photographers and studios who need albums printed in quantity." },
        { title: "Straightforward quotes", body: "Pricing depends on album size, pages, finishing and quantity, so we quote per order. Send your requirements on WhatsApp and we will respond with a quote." },
        { title: "Local, reachable support", body: "Our studio is at Bank More, Dhanbad. You can call, message or visit to discuss your order in person." },
      ]}
      checklistTitle="Tell us for a wholesale quote"
      checklist={["Album size", "Number of pages or spreads", "Quantity", "Cover and finishing preference", "File format and how you will share it", "Your required timeline"]}
      faqs={wholesaleFaqs}
      keywordParagraph="Searching for wholesale photo album printing in Jharkhand, a wedding album printer in Dhanbad, or bulk album printing for your photo studio? Ganpati Colour Lab at Bank More, Dhanbad welcomes enquiries from photographers and studios across Jharkhand. Message us on WhatsApp with your requirement."
      related={[
        { href: "/wedding-album-design", label: "Wedding album design" },
        { href: "/digital-photo-printing", label: "Digital photo printing" },
        { href: "/request-quote", label: "Request a quote" },
      ]}
    />
  );
}
