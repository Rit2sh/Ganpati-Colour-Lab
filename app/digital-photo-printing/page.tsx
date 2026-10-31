import { ServicePage } from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";
import { photos } from "@/lib/images";
import { digitalFaqs } from "@/lib/faqs";

export const metadata = pageMetadata({
  title: "Digital Photo Printing in Dhanbad | Photo Lab in Bank More",
  description:
    "Professional digital photo printing in Dhanbad. Ganpati Colour Lab, a photo lab at Bank More, handles wedding and event photo printing with attention to colour quality. WhatsApp to enquire.",
  path: "/digital-photo-printing",
  keywords: [
    "digital photo printing in Dhanbad", "photo lab in Bank More", "photo lab Dhanbad", "colour lab in Dhanbad", "color lab Dhanbad",
    "digital photo lab Dhanbad", "photo printing shop Dhanbad", "photo printing near me Dhanbad", "professional photo printing Dhanbad",
    "wedding photo printing Jharkhand", "photo printing Madhulika Enclave", "Ganpati Colour Lab",
  ],
});

export default function Page() {
  return (
    <ServicePage
      path="/digital-photo-printing"
      name="Digital Photo Printing"
      eyebrow="Digital photo lab"
      h1="Digital Photo Printing in Dhanbad"
      intro="Professional digital photo printing with attention to detail and colour quality, at our photo lab in Bank More, Dhanbad."
      schemaDescription="Professional digital photo printing and photo lab services in Bank More, Dhanbad, Jharkhand."
      topic="digital"
      photos={[photos[13], photos[15]]}
      blocks={[
        { title: "Prints that do your photographs justice", body: "We care about how your photographs look on paper, from colour reproduction to finishing. Tell us what you need printed and we will guide you." },
        { title: "For weddings, events and everyday memories", body: "Whether it is a set of wedding portraits, event photographs or family pictures, our digital photo lab can help you bring them into print." },
        { title: "Easy to start", body: "Send your photo sizes and quantity on WhatsApp, or visit our lab at Madhulika Enclave, Bank More." },
      ]}
      checklistTitle="What to share when you enquire"
      checklist={["Photo size you need", "Quantity", "How you will share the files", "Any colour or finishing requirements", "Your required timeline", "Whether it is a one-off or a regular order"]}
      faqs={digitalFaqs}
      keywordParagraph="Looking for digital photo printing in Dhanbad, a photo lab in Bank More, or a colour lab near Madhulika Enclave? Ganpati Colour Lab is at Shanti Bhawan, Madhulika Enclave, Bank More, Dhanbad 826007. Call or WhatsApp to enquire."
      related={[
        { href: "/wholesale-album-printing", label: "Wholesale album printing" },
        { href: "/wedding-album-design", label: "Wedding album design" },
        { href: "/contact", label: "Contact us" },
      ]}
    />
  );
}
