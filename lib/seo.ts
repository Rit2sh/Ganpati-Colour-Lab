import type { Metadata } from "next";
import { SITE_URL, allKeywords, business, fullAddress, geo } from "./site";
import { photoUrl, hero } from "./images";

export const ogImage = photoUrl(hero.id, 1200, 80);

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords ?? allKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: business.name,
      title: opts.title,
      description: opts.description,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${business.name}, Dhanbad` }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
  };
}

// ---------- JSON-LD builders (all data comes from lib/site.ts) ----------

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  "@id": `${SITE_URL}/#business`,
  name: business.name,
  description:
    "Wedding album design, wedding album printing, wholesale album printing and digital photo printing in Bank More, Dhanbad, Jharkhand.",
  url: SITE_URL,
  image: ogImage,
  telephone: business.phones[0].tel,
  contactPoint: business.phones.map((p) => ({
    "@type": "ContactPoint",
    telephone: p.tel,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  })),
  address: {
    "@type": "PostalAddress",
    streetAddress: business.streetAddress,
    addressLocality: business.locality,
    addressRegion: business.region,
    postalCode: business.postalCode,
    addressCountry: business.countryCode,
  },
  geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude },
  hasMap: business.mapsSearchUrl,
  sameAs: [business.instagramUrl],
  areaServed: [
    { "@type": "City", name: "Dhanbad" },
    { "@type": "AdministrativeArea", name: "Jharkhand" },
  ],
  knowsAbout: ["Wedding album design", "Wedding album printing", "Wholesale album printing", "Digital photo printing"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      "Wedding Album Design",
      "Wedding Album Printing",
      "Wholesale Album Printing",
      "Digital Photo Printing",
    ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
  },
  // Intentionally NO aggregateRating, review, priceRange or openingHours:
  // add them only when the owner confirms real data.
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: business.name,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#business` },
};

export function serviceLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    serviceType: name,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "City", name: "Dhanbad" },
      { "@type": "AdministrativeArea", name: "Jharkhand" },
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const addressLine = fullAddress;
