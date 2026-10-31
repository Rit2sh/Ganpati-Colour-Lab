"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { albumPhotos } from "@/lib/images";
import { photoSrc } from "./Photo";
import { Lightbox } from "./Lightbox";

type Layout = "full" | "duo" | "collage";
const LAYOUTS: { id: Layout; label: string }[] = [
  { id: "full", label: "Full Bleed" },
  { id: "duo", label: "Two-Up" },
  { id: "collage", label: "Collage" },
];
const LEAVES = 4;
const N = albumPhotos.length;

function facePhotos(face: number, layout: Layout): number[] {
  if (layout === "full") return [face % N];
  if (layout === "duo") return [face % N, (face + 3) % N];
  return [face % N, (face + 2) % N, (face + 5) % N];
}

function PageFace({ face, layout, side, onOpen }: { face: number; layout: Layout; side: "left" | "right"; onOpen: (i: number) => void }) {
  const idx = facePhotos(face, layout);
  const grid =
    layout === "full" ? "grid-cols-1 grid-rows-1" : layout === "duo" ? "grid-cols-1 grid-rows-2" : "grid-cols-2 grid-rows-2";
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f6f0e2] p-[5%]">
      <div className={`grid h-full w-full gap-[3%] ${grid}`}>
        {idx.map((pi, k) => {
          const p = albumPhotos[pi];
          const span = layout === "collage" && k === 0 ? "col-span-2" : "";
          return (
            <button
              key={`${pi}-${k}`}
              type="button"
              onClick={() => onOpen(pi)}
              aria-label={`Zoom: ${p.alt}`}
              className={`relative overflow-hidden ${span} cursor-zoom-in`}
            >
              <Image src={photoSrc(p.id)} alt={p.alt} fill sizes="(min-width:768px) 300px, 40vw" quality={75} className="object-cover transition-transform duration-700 hover:scale-105" />
            </button>
          );
        })}
      </div>
      <div
        className={`pointer-events-none absolute inset-y-0 w-[16%] ${
          side === "right" ? "left-0 bg-gradient-to-r from-black/30 to-transparent" : "right-0 bg-gradient-to-l from-black/30 to-transparent"
        }`}
      />
    </div>
  );
}

export function AlbumShowcase() {
  const [flipped, setFlipped] = useState(0);
  const [layout, setLayout] = useState<Layout>("full");
  const [rot, setRot] = useState({ x: 8, y: 0 });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const drag = useRef<{ x: number; y: number; rx: number; ry: number; moved: boolean } | null>(null);

  const onDown = (e: React.PointerEvent) => {
    // No pointer capture: it would redirect click events away from the photo buttons.
    drag.current = { x: e.clientX, y: e.clientY, rx: rot.x, ry: rot.y, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) d.moved = true;
    setRot({
      y: Math.max(-35, Math.min(35, d.ry + dx * 0.2)),
      x: Math.max(-15, Math.min(30, d.rx - dy * 0.15)),
    });
  };
  const onUp = () => { setTimeout(() => (drag.current = null), 0); };
  const guardedOpen = (i: number) => { if (!drag.current?.moved) setLightbox(i); };

  return (
    <div>
      <div
        className="album-stage select-none touch-pan-y"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ ["--pw" as string]: "clamp(130px, 38vw, 300px)" }}
      >
        <div
          className="album-book relative mx-auto"
          style={{
            width: "calc(var(--pw) * 2)",
            height: "calc(var(--pw) * 1.3)",
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            filter: "drop-shadow(0 40px 40px rgba(0,0,0,0.6))",
          }}
        >
          {/* inside front cover (left base) */}
          <div className="absolute left-0 top-0 h-full w-1/2 rounded-l-md bg-[#17120e] shadow-[inset_0_0_0_2px_rgba(198,164,106,0.35)]" />
          {/* back cover (right base) */}
          <div className="absolute right-0 top-0 h-full w-1/2 rounded-r-md bg-[#17120e] shadow-[inset_0_0_0_2px_rgba(198,164,106,0.35)]" />

          {Array.from({ length: LEAVES }).map((_, i) => {
            const isFlipped = i < flipped;
            return (
              <div
                key={i}
                className="album-leaf absolute right-0 top-0 h-full w-1/2"
                style={{ transform: `rotateY(${isFlipped ? -180 : 0}deg)`, zIndex: isFlipped ? i + 1 : LEAVES - i }}
              >
                <div className="album-face absolute inset-0 overflow-hidden rounded-r-sm">
                  <PageFace face={i * 2} layout={layout} side="right" onOpen={guardedOpen} />
                </div>
                <div className="album-face absolute inset-0 overflow-hidden rounded-l-sm" style={{ transform: "rotateY(180deg)" }}>
                  <PageFace face={i * 2 + 1} layout={layout} side="left" onOpen={guardedOpen} />
                </div>
              </div>
            );
          })}
          {/* gold spine line */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/70 to-transparent" style={{ zIndex: 20 }} />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFlipped((f) => Math.max(0, f - 1))}
            disabled={flipped === 0}
            aria-label="Previous page"
            className="rounded-full border border-ivory/25 p-3 text-ivory transition hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="min-w-28 text-center text-sm text-ivory/70">Spread {flipped + 1} of {LEAVES + 1}</span>
          <button
            onClick={() => setFlipped((f) => Math.min(LEAVES, f + 1))}
            disabled={flipped === LEAVES}
            aria-label="Next page"
            className="rounded-full border border-ivory/25 p-3 text-ivory transition hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => setRot({ x: 8, y: 0 })}
            aria-label="Reset view"
            className="ml-2 rounded-full border border-ivory/25 p-3 text-ivory transition hover:border-gold hover:text-gold"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div role="group" aria-label="Album layout" className="flex flex-wrap justify-center gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLayout(l.id)}
              aria-pressed={layout === l.id}
              className={`rounded-full px-5 py-2 text-sm transition ${
                layout === l.id ? "bg-gold text-charcoal" : "border border-ivory/25 text-ivory/80 hover:border-gold hover:text-gold"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-grey">Drag to rotate · tap arrows to flip pages · tap a photo to zoom · sample photos, not client work</p>
      </div>

      <Lightbox items={albumPhotos} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </div>
  );
}
