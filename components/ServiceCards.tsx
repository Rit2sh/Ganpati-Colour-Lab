"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/lib/images";
import { photoSrc } from "./Photo";
import { track } from "@/lib/analytics";
import { waTopicLink, type WaTopic } from "@/lib/whatsapp";

interface Card {
  title: string;
  href: string;
  desc: string;
  cta: string;
  topic?: WaTopic;
  photo: (typeof photos)[number];
}

const cards: Card[] = [
  {
    title: "Wedding Album Design",
    href: "/wedding-album-design",
    desc: "Beautifully designed wedding albums that preserve your special moments.",
    cta: "Enquire Now",
    topic: "album",
    photo: photos[2],
  },
  {
    title: "Wholesale Album Printing",
    href: "/wholesale-album-printing",
    desc: "Album printing solutions for photographers, studios and businesses.",
    cta: "Get Wholesale Quote",
    topic: "wholesale",
    photo: photos[14],
  },
  {
    title: "Digital Photo Lab Printing",
    href: "/digital-photo-printing",
    desc: "Professional digital photo printing with attention to detail and colour quality.",
    cta: "Contact Us",
    topic: "digital",
    photo: photos[13],
  },
  {
    title: "Album Collection",
    href: "/album-collection",
    desc: "Discover beautiful album presentation and finishing options.",
    cta: "Explore Collection",
    photo: photos[7],
  },
];

function TiltCard({ c, i }: { c: Card; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateZ(0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        className="group relative h-full overflow-hidden rounded-3xl border border-ivory/10 bg-charcoal-2 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-300 ease-out hover:border-gold/40 hover:shadow-[0_35px_70px_-25px_rgba(198,164,106,0.35)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={photoSrc(c.photo.id)}
            alt={c.photo.alt}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            quality={75}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[10px] uppercase tracking-widest text-ivory/70 backdrop-blur">
            Sample image
          </span>
        </div>
        <div className="relative -mt-24 p-6">
          <h3 className="font-display text-2xl leading-tight text-ivory">
            <Link href={c.href} className="hover:text-gold">{c.title}</Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ivory/70">{c.desc}</p>
          {c.topic ? (
            <a
              href={waTopicLink(c.topic)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { topic: c.topic!, location: `service_card_${c.href}` })}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-soft"
            >
              {c.cta} <ArrowUpRight size={16} aria-hidden />
            </a>
          ) : (
            <Link href={c.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-soft">
              {c.cta} <ArrowUpRight size={16} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ServiceCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => (
        <TiltCard key={c.title} c={c} i={i} />
      ))}
    </div>
  );
}
