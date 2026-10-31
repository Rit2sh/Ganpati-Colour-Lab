// Single source of truth for business details, SEO and geo data.
// Everything here comes from the business brief. Do not add ratings, years,
// opening hours or prices unless the owner confirms them.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ganpaticolourlab.in").replace(/\/$/, "");

export const business = {
  name: "Ganpati Colour Lab",
  tagline: "Premium Wedding Album Design & Professional Photo Printing in Dhanbad",
  streetAddress: "Shanti Bhawan, Madhulika Enclave, Bank More",
  locality: "Dhanbad",
  region: "Jharkhand",
  regionCode: "IN-JH",
  postalCode: "826007",
  country: "India",
  countryCode: "IN",
  phones: [
    { label: "+91 91131 72226", tel: "+919113172226", wa: "919113172226" },
    { label: "+91 76542 83813", tel: "+917654283813", wa: "917654283813" },
  ],
  instagramUrl: "https://www.instagram.com/ganpati_colour__lab/",
  instagramHandle: "@ganpati_colour__lab",
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Ganpati+Colour+Lab%2C+Shanti+Bhawan%2C+Madhulika+Enclave%2C+Bank+More%2C+Dhanbad%2C+Jharkhand+826007",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Ganpati+Colour+Lab%2C+Shanti+Bhawan%2C+Madhulika+Enclave%2C+Bank+More%2C+Dhanbad%2C+Jharkhand+826007",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Ganpati+Colour+Lab%2C+Shanti+Bhawan%2C+Madhulika+Enclave%2C+Bank+More%2C+Dhanbad%2C+Jharkhand+826007&output=embed",
  copyrightYear: 2026,
} as const;

export const fullAddress = `${business.streetAddress}, ${business.locality}, ${business.region} ${business.postalCode}, ${business.country}`;

// Approximate city-level coordinates for Dhanbad. Replace with the exact pin
// from Google Maps (right-click the shop -> copy coordinates) for best local SEO.
export const geo = {
  latitude: 23.7957,
  longitude: 86.4304,
  placename: "Bank More, Dhanbad",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/wedding-album-design", label: "Services", children: [
    { href: "/wedding-album-design", label: "Wedding Album Design" },
    { href: "/wholesale-album-printing", label: "Wholesale Album Printing" },
    { href: "/digital-photo-printing", label: "Digital Photo Printing" },
    { href: "/album-collection", label: "Album Collection" },
  ] },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceLinks = [
  { href: "/wedding-album-design", label: "Wedding Album Design" },
  { href: "/wholesale-album-printing", label: "Wholesale Album Printing" },
  { href: "/digital-photo-printing", label: "Digital Photo Printing" },
  { href: "/album-collection", label: "Album Collection" },
  { href: "/gallery", label: "Gallery" },
  { href: "/request-quote", label: "Request a Quote" },
] as const;

// Towns near Dhanbad where studios and photographers may enquire from.
// Confirm with the owner before presenting as an official service area.
export const nearbyAreas = [
  "Bank More", "Hirapur", "Saraidhela", "Jharia", "Sindri", "Govindpur", "Katras",
  "Bartand", "Chas", "Bokaro", "Giridih", "Ranchi", "Jamshedpur", "Asansol",
] as const;

// Keyword groups used in meta keywords, FAQ copy, and on-page content.
export const keywordGroups = {
  core: [
    "wedding album design in Dhanbad",
    "wedding album printing in Dhanbad",
    "wholesale photo album printing in Jharkhand",
    "digital photo printing in Dhanbad",
    "photo lab in Bank More",
    "wedding album printer in Jharkhand",
  ],
  extended: [
    "Ganpati Colour Lab",
    "Ganpati Colour Lab Dhanbad",
    "colour lab in Dhanbad",
    "color lab Dhanbad",
    "photo lab Dhanbad",
    "photo studio lab Bank More Dhanbad",
    "best photo lab in Dhanbad",
    "best wedding album printing in Dhanbad",
    "album designing Dhanbad",
    "album design service Jharkhand",
    "wedding album maker Dhanbad",
    "wedding album maker Jharkhand",
    "photo album printing near me",
    "wedding photo album printing near me",
    "photo printing near me Dhanbad",
    "photo printing shop Dhanbad",
    "digital photo lab Dhanbad",
    "digital colour lab Jharkhand",
    "bulk album printing Dhanbad",
    "bulk wedding album printing Jharkhand",
    "album printing for photographers Dhanbad",
    "album printing for photo studios Jharkhand",
    "photographer album printing Dhanbad",
    "wholesale wedding album printing India",
    "premium wedding album",
    "luxury wedding album design",
    "photo book printing Dhanbad",
    "canvas album Dhanbad",
    "photo editing and album layout Dhanbad",
    "wedding album layout design",
    "photo lab Bank More Dhanbad",
    "photo printing Madhulika Enclave",
    "wedding photo printing Jharkhand",
    "professional photo printing Dhanbad",
    "album printing 826007",
  ],
} as const;

export const allKeywords: string[] = [...keywordGroups.core, ...keywordGroups.extended];
