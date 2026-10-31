"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ScrollUpDown() {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setCanScrollUp(scrollY > 100);
      setCanScrollDown(scrollY + windowHeight < documentHeight - 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      aria-label="Page navigation arrows"
      className="fixed bottom-24 left-4 z-40 flex flex-col items-center gap-1.5 rounded-full border border-gold/40 bg-charcoal/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-opacity duration-300 md:bottom-8 md:left-8"
    >
      <button
        type="button"
        onClick={scrollToTop}
        disabled={!canScrollUp}
        aria-label="Scroll to top"
        title="Scroll to top"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10 text-ivory/90 transition-all duration-200 hover:border-gold hover:bg-gold hover:text-charcoal disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronUp size={18} aria-hidden />
      </button>

      <span className="h-px w-4 bg-gold/30" aria-hidden />

      <button
        type="button"
        onClick={scrollToBottom}
        disabled={!canScrollDown}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10 text-ivory/90 transition-all duration-200 hover:border-gold hover:bg-gold hover:text-charcoal disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronDown size={18} aria-hidden />
      </button>
    </div>
  );
}
