"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, photos, type GalleryCategory } from "@/lib/images";
import { photoSrc } from "./Photo";
import { Lightbox } from "./Lightbox";
import { ZoomIn } from "lucide-react";

export function Gallery({ limit }: { limit?: number }) {
  const [cat, setCat] = useState<GalleryCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => {
    const list = cat === "All" ? photos : photos.filter((p) => p.category === cat);
    return limit ? list.slice(0, limit) : list;
  }, [cat, limit]);

  return (
    <div>
      <div role="tablist" aria-label="Gallery categories" className="flex flex-wrap justify-center gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full px-5 py-2 text-sm transition ${
              cat === c ? "bg-gold text-charcoal" : "border border-ivory/20 text-ivory/80 hover:border-gold hover:text-gold"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
        {items.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open: ${p.alt}`}
            className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-charcoal-2 md:mb-5"
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
          >
            <Image
              src={photoSrc(p.id)}
              alt={p.alt}
              fill
              sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
              quality={75}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-4 text-left text-xs text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span>{p.category}</span>
              <ZoomIn size={16} className="text-gold" aria-hidden />
            </span>
          </button>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-grey">
        Sample photography from Unsplash for layout preview. Replace with Ganpati Colour Lab&apos;s own work (see README).
      </p>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
