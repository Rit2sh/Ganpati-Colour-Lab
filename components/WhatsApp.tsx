"use client";

import { useState } from "react";
import { MessageCircle, Phone, ChevronDown } from "lucide-react";
import { business } from "@/lib/site";
import { track } from "@/lib/analytics";
import { waLink, waMessages, type WaTopic } from "@/lib/whatsapp";
import { btn } from "@/lib/ui";

interface WaProps {
  topic?: WaTopic;
  label?: string;
  location: string; // analytics location tag
  variant?: keyof typeof btn;
  className?: string;
  numberIndex?: 0 | 1;
}

/** A single WhatsApp click-to-chat button. Opens WhatsApp; the customer presses send. */
export function WaButton({ topic = "general", label = "Chat on WhatsApp", location, variant = "gold", className = "", numberIndex = 0 }: WaProps) {
  const number = business.phones[numberIndex].wa;
  return (
    <a
      href={waLink(waMessages[topic], number)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { topic, location, number })}
      className={`${btn[variant]} ${className}`}
    >
      <MessageCircle size={18} aria-hidden /> {label}
    </a>
  );
}

export function CallButton({ label = "Call Us", location, variant = "ghost", className = "", numberIndex = 0 }: { label?: string; location: string; variant?: keyof typeof btn; className?: string; numberIndex?: 0 | 1 }) {
  const p = business.phones[numberIndex];
  return (
    <a
      href={`tel:${p.tel}`}
      onClick={() => track("call_click", { location, number: p.tel })}
      className={`${btn[variant]} ${className}`}
    >
      <Phone size={18} aria-hidden /> {label}
    </a>
  );
}

/** Lets visitors choose which of the two numbers to message. */
export function WaNumberPicker({ topic = "general", location }: { topic?: WaTopic; location: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={btn.gold}
      >
        <MessageCircle size={18} aria-hidden /> WhatsApp Now <ChevronDown size={16} aria-hidden className={open ? "rotate-180 transition" : "transition"} />
      </button>
      {open && (
        <div className="absolute left-0 z-30 mt-2 w-64 overflow-hidden rounded-2xl border border-ivory/15 bg-charcoal-2 shadow-2xl">
          {business.phones.map((p, i) => (
            <a
              key={p.wa}
              href={waLink(waMessages[topic], p.wa)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { track("whatsapp_click", { topic, location, number: p.wa }); setOpen(false); }}
              className="flex items-center justify-between px-5 py-3 text-sm text-ivory hover:bg-charcoal-3"
            >
              <span>Number {i + 1}</span>
              <span className="text-gold">{p.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
