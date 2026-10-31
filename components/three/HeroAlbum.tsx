"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { hero } from "@/lib/images";
import { photoSrc } from "@/components/Photo";

// Three.js is code-split and only loaded on larger screens, after first paint.
const AlbumScene = dynamic(() => import("./AlbumScene"), { ssr: false });

/** Lightweight CSS album used on phones, reduced-motion, and while 3D loads. */
function StaticAlbum() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-[62%] max-w-[300px] [transform:perspective(900px)_rotateY(-22deg)_rotateX(4deg)]">
      <div className="absolute inset-0 rounded-[10px] bg-[#17120e] shadow-[0_40px_70px_-20px_rgba(0,0,0,0.9),inset_0_0_0_2px_rgba(198,164,106,0.35)]" />
      <div className="absolute inset-[9%] overflow-hidden rounded-[4px] ring-1 ring-gold/70">
        <Image src={photoSrc(hero.id)} alt="Sample wedding photograph on an album cover" fill sizes="240px" quality={60} className="object-cover" priority />
      </div>
      <div className="absolute inset-y-0 left-0 w-[5%] rounded-l-[10px] bg-gradient-to-r from-black/60 to-transparent" />
    </div>
  );
}

/** If WebGL or the 3D chunk fails for any reason, fall back to the static album. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function HeroAlbum() {
  const wrap = useRef<HTMLDivElement>(null);
  const [use3d, setUse3d] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUse3d(wide.matches && !reduce.matches);
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative h-[340px] w-full md:h-[560px]">
      {use3d ? (
        <SceneBoundary fallback={<div className="flex h-full items-center"><StaticAlbum /></div>}>
          <Suspense fallback={<div className="flex h-full items-center"><StaticAlbum /></div>}>
            <AlbumScene photoId={hero.id} active={inView} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <div className="flex h-full items-center"><StaticAlbum /></div>
      )}
    </div>
  );
}
