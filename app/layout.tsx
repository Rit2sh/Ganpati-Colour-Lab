import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScrollUpDown } from "@/components/ScrollUpDown";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, allKeywords, business, geo } from "@/lib/site";
import { localBusinessLd, websiteLd, ogImage } from "@/lib/seo";

// Self-hosted fonts (no third-party request, better privacy and speed).
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "./fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
});

const title = "Wedding Album Design & Printing in Dhanbad | Ganpati Colour Lab";
const description =
  "Ganpati Colour Lab in Bank More, Dhanbad: premium wedding album design, wedding album printing, wholesale album printing for photographers and studios, and professional digital photo printing in Jharkhand. WhatsApp +91 91131 72226.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Ganpati Colour Lab, Dhanbad" },
  description,
  keywords: allKeywords,
  applicationName: business.name,
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  category: "Photography & Printing",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: business.name,
    title,
    description,
    locale: "en_IN",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Ganpati Colour Lab, wedding album design and photo printing in Dhanbad" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  formatDetection: { telephone: true, address: true, email: false },
  // Geo targeting meta tags
  other: {
    "geo.region": business.regionCode,
    "geo.placename": geo.placename,
    "geo.position": `${geo.latitude};${geo.longitude}`,
    ICBM: `${geo.latitude}, ${geo.longitude}`,
    "business:contact_data:street_address": business.streetAddress,
    "business:contact_data:locality": business.locality,
    "business:contact_data:region": business.region,
    "business:contact_data:postal_code": business.postalCode,
    "business:contact_data:country_name": business.country,
    "business:contact_data:phone_number": business.phones[0].tel,
  },
  // Paste the token from Google Search Console here (or set via env)
  verification: process.env.NEXT_PUBLIC_GSC_TOKEN ? { google: process.env.NEXT_PUBLIC_GSC_TOKEN } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#101010",
  width: "device-width",
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-charcoal text-ivory">
        <JsonLd data={[localBusinessLd, websiteLd]} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollUpDown />
        <WhatsAppFloat />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
