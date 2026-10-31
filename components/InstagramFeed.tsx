"use client";

import { useEffect, useRef, useState } from "react";
import { Instagram } from "./icons";
import { business } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Official Instagram profile embed (instagram.com/<user>/embed). It only loads once the
 * section scrolls into view, so it never slows the first paint. Content is served by
 * Instagram itself, so nothing is copied or re-hosted.
 */
export function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[540px]">
      <div className="overflow-hidden rounded-3xl border border-ivory/10 bg-charcoal-2">
        {show ? (
          <iframe
            src={`${business.instagramUrl}embed`}
            title="Ganpati Colour Lab on Instagram"
            className="h-[560px] w-full bg-white"
            loading="lazy"
            allow="encrypted-media"
          />
        ) : (
          <div className="flex h-[560px] items-center justify-center text-sm text-grey">Loading Instagram…</div>
        )}
      </div>
      <a
        href={business.instagramUrl}
        target="_blank"
        rel="noopener noreferrer me"
        onClick={() => track("instagram_click", { location: "instagram_section" })}
        className="mt-5 flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-charcoal"
      >
        <Instagram size={18} aria-hidden /> Follow {business.instagramHandle}
      </a>
    </div>
  );
}
