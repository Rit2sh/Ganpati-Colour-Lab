"use client";

import { MessageCircle, Phone } from "lucide-react";
import { business } from "@/lib/site";
import { track } from "@/lib/analytics";
import { waTopicLink } from "@/lib/whatsapp";

/** Floating WhatsApp button (all screens) + fixed bottom CTA bar (mobile). */
export function WhatsAppFloat() {
  return (
    <>
      <a
        href={waTopicLink("general")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ganpati Colour Lab on WhatsApp"
        onClick={() => track("whatsapp_click", { topic: "general", location: "floating" })}
        className="fixed bottom-24 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition hover:scale-110 md:bottom-8 md:right-8 md:flex"
      >
        <MessageCircle size={26} aria-hidden />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ivory/10 bg-charcoal/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <a
          href={`tel:${business.phones[0].tel}`}
          onClick={() => track("call_click", { location: "mobile_bar" })}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 py-3 text-sm font-semibold text-ivory"
        >
          <Phone size={16} aria-hidden /> Call
        </a>
        <a
          href={waTopicLink("general")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { topic: "general", location: "mobile_bar" })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
        >
          <MessageCircle size={16} aria-hidden /> WhatsApp
        </a>
      </div>
    </>
  );
}
