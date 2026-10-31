import { business } from "./site";

export type WaTopic = "album" | "wholesale" | "digital" | "general" | "collection";

export const waMessages: Record<WaTopic, string> = {
  album:
    "Hello Ganpati Colour Lab, I am interested in wedding album design. Please share your available options and pricing.",
  wholesale:
    "Hello Ganpati Colour Lab, I need wholesale wedding album printing. Please share your pricing and requirements.",
  digital: "Hello, I would like to enquire about digital photo printing services.",
  collection:
    "Hello Ganpati Colour Lab, I would like to see your album collection and finishing options.",
  general:
    "Hello Ganpati Colour Lab, I found your website and would like to know more about your services.",
};

/** Builds a wa.me click-to-chat link. It only opens WhatsApp; the customer sends the message. */
export function waLink(message: string, number: string = business.phones[0].wa): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function waTopicLink(topic: WaTopic, number?: string): string {
  return waLink(waMessages[topic], number);
}

export interface QuoteDetails {
  customerName: string;
  phone: string;
  serviceType: string;
  albumSize?: string;
  quantity?: string;
  eventDate?: string;
  message?: string;
  hasReferenceImage?: boolean;
}

export function formatQuoteMessage(d: QuoteDetails): string {
  const lines = [
    "Hello Ganpati Colour Lab, I would like a quote.",
    "",
    `*Name:* ${d.customerName}`,
    `*Phone:* ${d.phone}`,
    `*Service:* ${d.serviceType}`,
  ];
  if (d.albumSize) lines.push(`*Album size:* ${d.albumSize}`);
  if (d.quantity) lines.push(`*Quantity:* ${d.quantity}`);
  if (d.eventDate) lines.push(`*Wedding/Event date:* ${d.eventDate}`);
  if (d.message) lines.push("", `*Message:* ${d.message}`);
  if (d.hasReferenceImage) lines.push("", "I will attach my reference image in this chat.");
  return lines.join("\n");
}
