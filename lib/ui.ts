// Shared class strings. Lives outside any "use client" file so that server
// components can import it as a plain object.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export const btn = {
  gold: `${base} bg-gold text-charcoal hover:bg-gold-soft hover:shadow-[0_8px_30px_-8px_rgba(198,164,106,0.7)]`,
  ghost: `${base} border border-ivory/30 text-ivory hover:border-gold hover:text-gold`,
  dark: `${base} bg-charcoal text-ivory hover:bg-charcoal-3`,
};
