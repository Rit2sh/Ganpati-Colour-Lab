import Image from "next/image";
import type { Photo as PhotoT } from "@/lib/images";

export function photoSrc(id: string) {
  return `https://images.unsplash.com/${id}`;
}

interface Props {
  photo: PhotoT;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: 60 | 75 | 80 | 90;
}

/** Fills its (relatively positioned) parent. Parent must set size/aspect. */
export function Photo({ photo, sizes, priority, className = "", quality = 75 }: Props) {
  return (
    <Image
      src={photoSrc(photo.id)}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={`object-cover ${className}`}
    />
  );
}
