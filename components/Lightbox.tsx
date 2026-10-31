"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { photoSrc } from "./Photo";
import type { Photo } from "@/lib/images";

interface Props {
  items: Photo[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const open = index !== null;

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setZoom(null);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  if (index === null) return null;
  const p = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.alt}
      className="fixed inset-0 z-[80] flex flex-col bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-sm text-ivory/70" onClick={(e) => e.stopPropagation()}>
        <span>{index + 1} / {items.length} · Sample photo by {p.credit} on Unsplash</span>
        <button onClick={onClose} aria-label="Close" className="rounded-full border border-ivory/25 p-2 hover:border-gold hover:text-gold">
          <X size={18} />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label={zoom ? "Zoom out" : "Zoom in"}
          onClick={(e) => {
            if (zoom) return setZoom(null);
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          className={`absolute inset-0 ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        >
          <div
            className="relative h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: zoom ? "scale(2.4)" : "scale(1)", transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center" }}
          >
            <Image src={photoSrc(p.id)} alt={p.alt} fill sizes="100vw" quality={90} className="object-contain" priority />
          </div>
        </button>
        <span className="pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs text-ivory/80">
          <ZoomIn size={14} /> Click photo to zoom
        </span>
        {items.length > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-ivory hover:text-gold">
              <ChevronLeft />
            </button>
            <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-ivory hover:text-gold">
              <ChevronRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
