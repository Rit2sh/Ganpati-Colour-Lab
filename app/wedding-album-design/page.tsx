import { ServicePage } from "@/components/ServicePage";
import { pageMetadata } from "@/lib/seo";
import { photos } from "@/lib/images";
import { weddingFaqs } from "@/lib/faqs";

export const metadata = pageMetadata({
  title: "Wedding Album Design in Dhanbad | Album Layout & Designing",
  description:
    "Premium wedding album design in Dhanbad, Jharkhand. Ganpati Colour Lab, Bank More, designs beautiful wedding album layouts. Share your photos and get options on WhatsApp.",
  path: "/wedding-album-design",
  keywords: [
    "wedding album design in Dhanbad", "album designing Dhanbad", "wedding album layout design", "wedding album maker Dhanbad",
    "wedding album maker Jharkhand", "luxury wedding album design", "album design service Jharkhand", "photo editing and album layout Dhanbad",
    "Ganpati Colour Lab",
  ],
});

export default function Page() {
  return (
    <ServicePage
      path="/wedding-album-design"
      name="Wedding Album Design"
      eyebrow="Wedding album design"
      h1="Wedding Album Design in Dhanbad"
      intro="Beautifully designed wedding albums that preserve your special moments. Share your photographs and we will help shape them into an album story."
      schemaDescription="Wedding album design and album layout service in Bank More, Dhanbad, Jharkhand."
      topic="album"
      photos={[photos[2], photos[7]]}
      blocks={[
        { title: "Designed around your story", body: "A wedding album is more than a stack of photographs. We help arrange your pictures into a flow that follows the day, from rituals and portraits to the quiet moments in between." },
        { title: "Layouts for every style", body: "From full-bleed single photographs to two-up spreads and collages, you can discuss the layout style that suits your wedding and your photographer's work." },
        { title: "Printing under one roof", body: "Because we are also a photo lab, your album design can move straight into printing and finishing, which keeps the whole process simple." },
      ]}
      checklistTitle="What you can discuss with us"
      checklist={["Album size and orientation", "Layout style and number of pages", "Cover and finishing options", "Photo selection and sequence", "Pricing and approval process", "Timing for your specific order"]}
      faqs={weddingFaqs}
      keywordParagraph="Looking for wedding album design in Dhanbad, an album designing service in Jharkhand, or a wedding album maker near Bank More? Ganpati Colour Lab is at Madhulika Enclave, Bank More, Dhanbad 826007. Message us on WhatsApp to discuss your wedding album."
      related={[
        { href: "/album-collection", label: "Album collection" },
        { href: "/wholesale-album-printing", label: "Wholesale album printing" },
        { href: "/gallery", label: "Gallery" },
      ]}
    />
  );
}
