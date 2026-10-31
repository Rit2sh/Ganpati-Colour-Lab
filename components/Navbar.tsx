"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { nav, business } from "@/lib/site";
import { track } from "@/lib/analytics";
import { waTopicLink } from "@/lib/whatsapp";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-charcoal/92 shadow-[0_1px_0_rgba(198,164,106,0.25)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8" style={{ height: 72 }}>
        <Link href="/" className="group flex items-center gap-3" aria-label={`${business.name} home`} onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 font-display text-lg text-gold">G</span>
          <span className="font-display text-xl leading-none tracking-wide text-ivory">
            Ganpati <span className="text-gold">Colour Lab</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <Link href={item.href} className="text-sm tracking-wide text-ivory/80 transition hover:text-gold">
                {item.label}
              </Link>
              {"children" in item && (
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-ivory/10 bg-charcoal-2 py-2 shadow-2xl">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block px-5 py-2.5 text-sm text-ivory/80 hover:bg-charcoal-3 hover:text-gold">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waTopicLink("general")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { topic: "general", location: "navbar" })}
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-gold-soft sm:inline-flex"
          >
            <MessageCircle size={16} aria-hidden /> Get a Quote
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-ivory/10 bg-charcoal px-5 pb-28 pt-4 lg:hidden">
          <ul className="space-y-1">
            {[...nav.filter((n) => !("children" in n)), ...nav.filter((n) => "children" in n).flatMap((n) => ("children" in n ? n.children : []))].map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-display text-2xl text-ivory hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/request-quote" onClick={() => setOpen(false)} className="mt-3 block rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-charcoal">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
