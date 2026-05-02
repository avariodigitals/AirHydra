"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [past60, setPast60] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPast60(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll to top button — all screens, visible after scrolling */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#2E6EBB] text-white flex items-center justify-center shadow-lg hover:bg-[#417BC1] active:scale-95 transition-all duration-300 ${
          past60 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
