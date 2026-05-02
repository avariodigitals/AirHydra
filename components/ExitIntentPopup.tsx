"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function ExitIntentPopup({ whatsappNumber }: { whatsappNumber?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exit_popup_seen")) return;

    const show = () => {
      if (sessionStorage.getItem("exit_popup_seen")) return;
      setVisible(true);
    };

    // Desktop: exit-intent (mouse leaves top of viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    // Mobile / fallback: show after 10s
    const timer = setTimeout(show, 10000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("exit_popup_seen", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={dismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-[fadeUp_0.35s_ease-out_both]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-14 h-14 bg-[#2E6EBB]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#2E6EBB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8 7 5 11.5 5 14.5a7 7 0 0014 0C19 11.5 16 7 12 2z" />
          </svg>
        </div>

        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2E6EBB] mb-3">YOUR TRAVEL ESSENTIAL AWAITS</p>
        <h2 className="text-2xl lg:text-3xl font-serif text-[#0c1e3c] mb-3 leading-tight">
          Never Arrive Looking <p></p>Jet-Lagged Again
        </h2>
        <p className="text-[#2E6EBB]/70 text-sm leading-relaxed mb-7">
          AirHydra keeps your skin hydrated, luminous, and refreshed from takeoff to touchdown.
        </p>

        <WhatsAppButton
          text="Order on WhatsApp Now"
          prefillMessage="Hi AirHydra, I want to order before the launch pricing ends"
          className="w-full py-4 text-base font-semibold"
          trackingId="exit_intent"
          whatsappNumber={whatsappNumber}
        />

        <button
          onClick={dismiss}
          className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          No thanks, I'll buy later
        </button>
      </div>
    </div>
  );
}
