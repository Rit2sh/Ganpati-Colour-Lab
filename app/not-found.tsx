import Link from "next/link";
import { btn } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-gold">404</p>
      <h1 className="font-display mt-4 text-5xl md:text-7xl">This page could not be found.</h1>
      <p className="mt-4 text-ivory/70">Let us take you back to something beautiful.</p>
      <Link href="/" className={`${btn.gold} mt-8`}>Back to Home</Link>
    </section>
  );
}
