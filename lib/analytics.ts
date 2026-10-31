"use client";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire an analytics event for CTA clicks. Works with GA4 (gtag) or GTM (dataLayer). */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    } else {
      (window.dataLayer ??= []).push({ event, ...params });
    }
  } catch {
    /* analytics must never break the UI */
  }
}
