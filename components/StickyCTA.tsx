"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="h-8 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
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
  );
}

