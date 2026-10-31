import Image from "next/image";
import { Play } from "lucide-react";
import { Instagram } from "./icons";
import { business } from "@/lib/site";
import { photos } from "@/lib/images";
import { photoSrc } from "./Photo";

// Provide ONE of these (see README):
//  NEXT_PUBLIC_VIDEO_SRC  -> self-hosted MP4, e.g. /videos/studio-reel.mp4 (put the file in /public/videos)
//  NEXT_PUBLIC_REEL_URL   -> an Instagram reel/post permalink from the studio's own account
const VIDEO_SRC = process.env.NEXT_PUBLIC_VIDEO_SRC;
const REEL_URL = process.env.NEXT_PUBLIC_REEL_URL;
const poster = photos[5];

export function VideoReel() {
  return (
    <div className="relative mx-auto aspect-[9/10] w-full max-w-[520px] overflow-hidden rounded-3xl border border-ivory/10 bg-charcoal-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:aspect-[4/3] md:max-w-none">
      {VIDEO_SRC ? (
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="none"
          poster={photoSrc(poster.id) + "?auto=format&fit=crop&w=1200&q=70"}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : REEL_URL ? (
        <iframe
          src={`${REEL_URL.replace(/\/?$/, "/")}embed`}
          title="Ganpati Colour Lab reel on Instagram"
          className="h-full w-full bg-white"
          loading="lazy"
          allow="encrypted-media; autoplay"
        />
      ) : (
        <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer me" className="group absolute inset-0 block" aria-label="Watch Ganpati Colour Lab reels on Instagram">
          <Image src={photoSrc(poster.id)} alt={poster.alt} fill sizes="(min-width:768px) 50vw, 100vw" quality={75} className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-charcoal shadow-2xl transition group-hover:scale-110">
            <Play size={30} fill="currentColor" aria-hidden />
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 p-6 text-sm text-ivory">
            <Instagram size={16} aria-hidden /> Watch our latest reels on Instagram
          </span>
        </a>
      )}
    </div>
  );
}
