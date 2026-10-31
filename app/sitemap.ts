import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Fixed date: update when you make meaningful content changes.
const LAST_MOD = "2026-10-31";

const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/wedding-album-design", priority: 0.9, freq: "monthly" },
  { path: "/wholesale-album-printing", priority: 0.9, freq: "monthly" },
  { path: "/digital-photo-printing", priority: 0.9, freq: "monthly" },
  { path: "/album-collection", priority: 0.8, freq: "monthly" },
  { path: "/gallery", priority: 0.8, freq: "weekly" },
  { path: "/about", priority: 0.6, freq: "yearly" },
  { path: "/contact", priority: 0.8, freq: "yearly" },
  { path: "/request-quote", priority: 0.7, freq: "yearly" },
  { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: LAST_MOD,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
