import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ganpati Colour Lab",
    short_name: "Ganpati Lab",
    description: "Wedding album design and photo printing in Bank More, Dhanbad.",
    start_url: "/",
    display: "standalone",
    background_color: "#101010",
    theme_color: "#101010",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
