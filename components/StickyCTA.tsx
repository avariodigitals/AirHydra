"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function StickyCTA() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Full sticky bar — mobile only, visible before scrolling */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 md:hidden ${
          scrolled ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-[#2E6EBB]/10 shadow-2xl px-4 pt-3 pb-4">
          <p className="text-center text-xs text-[#2E6EBB]/75 mb-2.5 font-medium tracking-[0.18em] uppercase">
            Free delivery on orders over ₦10,000
          </p>
          <WhatsAppButton
            text="Order on WhatsApp"
            prefillMessage="Hi AirHydra, I want to order the In-Flight Hydrating Gel"
            className="w-full py-4 text-sm font-semibold tracking-wide"
            trackingId="sticky_mobile"
          />
        </div>
      </div>

      {/* Scroll to top button — all screens, visible after scrolling */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#2E6EBB] text-white flex items-center justify-center shadow-lg hover:bg-[#417BC1] active:scale-95 transition-all duration-300 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
