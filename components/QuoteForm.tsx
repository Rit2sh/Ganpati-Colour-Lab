"use client";

import { useState } from "react";
import { MessageCircle, ImageIcon } from "lucide-react";
import { quoteSchema, serviceTypes } from "@/lib/schemas";
import { business } from "@/lib/site";
import { formatQuoteMessage, waLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

const field =
  "w-full rounded-xl border border-ivory/15 bg-charcoal-2 px-4 py-3 text-sm text-ivory placeholder:text-grey/70 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const label = "mb-1.5 block text-xs uppercase tracking-[0.18em] text-ivory/60";

export function QuoteForm({ defaultService }: { defaultService?: (typeof serviceTypes)[number] }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(
      ["customerName", "phone", "serviceType", "albumSize", "quantity", "eventDate", "message", "contactNumber"].map((k) => [k, String(fd.get(k) ?? "")]),
    );
    const parsed = quoteSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const d = parsed.data;
    const text = formatQuoteMessage({
      customerName: d.customerName,
      phone: d.phone,
      serviceType: d.serviceType,
      albumSize: d.albumSize || undefined,
      quantity: d.quantity || undefined,
      eventDate: d.eventDate || undefined,
      message: d.message || undefined,
      hasReferenceImage: Boolean(fileName),
    });
    track("quote_form_submit", { service: d.serviceType, location: "quote_form" });
    // Opens WhatsApp with the message prefilled. The customer still has to press Send.
    window.open(waLink(text, business.phones[Number(d.contactNumber)].wa), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const err = (k: string) => (errors[k] ? <p role="alert" className="mt-1 text-xs text-red-400">{errors[k]}</p> : null);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-ivory/10 bg-charcoal-2/60 p-6 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="customerName" className={label}>Your name *</label>
          <input id="customerName" name="customerName" autoComplete="name" className={field} placeholder="Full name" />
          {err("customerName")}
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone number *</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="98XXXXXXXX" />
          {err("phone")}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="serviceType" className={label}>Service type *</label>
          <select id="serviceType" name="serviceType" defaultValue={defaultService ?? ""} className={field}>
            <option value="" disabled>Select a service</option>
            {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {err("serviceType")}
        </div>
        <div>
          <label htmlFor="albumSize" className={label}>Album size (optional)</label>
          <input id="albumSize" name="albumSize" className={field} placeholder="e.g. 12x36, 15x24" />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="quantity" className={label}>Quantity (optional)</label>
          <input id="quantity" name="quantity" inputMode="numeric" className={field} placeholder="Number of albums or prints" />
        </div>
        <div>
          <label htmlFor="eventDate" className={label}>Wedding / event date (optional)</label>
          <input id="eventDate" name="eventDate" type="date" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" rows={4} className={field} placeholder="Tell us about your album or printing requirement" />
        {err("message")}
      </div>

      <div>
        <label htmlFor="ref" className={label}>Reference image (optional)</label>
        <label htmlFor="ref" className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ivory/25 px-4 py-4 text-sm text-ivory/70 hover:border-gold">
          <ImageIcon size={18} className="text-gold" aria-hidden />
          {fileName || "Choose an image (you will attach it in the WhatsApp chat)"}
        </label>
        <input id="ref" type="file" accept="image/*" className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
        <p className="mt-1.5 text-xs text-grey">Your image stays on your device. WhatsApp links cannot attach files, so add it once the chat opens.</p>
      </div>

      <fieldset>
        <legend className={label}>Message which number?</legend>
        <div className="flex flex-wrap gap-3">
          {business.phones.map((p, i) => (
            <label key={p.wa} className="flex cursor-pointer items-center gap-2 rounded-full border border-ivory/15 px-4 py-2 text-sm text-ivory/85 has-[:checked]:border-gold has-[:checked]:text-gold">
              <input type="radio" name="contactNumber" value={String(i)} defaultChecked={i === 0} className="accent-[#c6a46a]" />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-charcoal transition hover:bg-gold-soft md:w-auto">
        <MessageCircle size={18} aria-hidden /> Send Quote Request on WhatsApp
      </button>
      <p className="text-xs leading-relaxed text-grey">
        This opens WhatsApp with your details already typed in. Nothing is sent or stored until you press Send in WhatsApp, and this website does not save your information.
      </p>
      {sent && (
        <p role="status" className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
          WhatsApp should have opened in a new tab. Press Send there to deliver your request. If nothing opened, tap the WhatsApp button at the bottom of the screen.
        </p>
      )}
    </form>
  );
}
